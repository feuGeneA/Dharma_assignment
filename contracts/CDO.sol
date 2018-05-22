pragma solidity 0.4.18;

// Internal dependencies
import "./DebtRegistry.sol";
import "./TermsContract.sol";

// External dependencies
import "zeppelin-solidity/contracts/token/ERC721/ERC721BasicToken.sol";
import "zeppelin-solidity/contracts/token/ERC721/ERC721Receiver.sol";
import "zeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";


contract TrancheToken is ERC721Token {
    /// mapping from tokenId's to CDO contract instances
    mapping(uint256=>address) internal cdos;

    uint256 internal _tokenIdCounter;

    function TrancheToken()
        public
        ERC721Token("CDO Tranche Token", "CTT")
    {
    }

    function create(address cdo)
        public
        returns (uint256) // tokenId
    {
        super._mint(msg.sender, _tokenIdCounter);
        cdos[_tokenIdCounter] = cdo;
        _tokenIdCounter++;
    }
}


/**
 * @title A generator of Collateralized Debt Obligation agreements
 * @author F. Eugene Aumson (feuGeneA@github)
 * @notice Deploys a unique CDO contract, with caller having been granted sole
 *     permission call that contract's `finalize()` method.
 */
contract CDOFactory {
    function create(DebtRegistry debtRegistry)
        public
        returns (address)
    {
        return new CDO(debtRegistry);
    }
}


/**
 * @title A Collateralized Debt Obligation agreement
 * @author F. Eugene Aumson (feuGeneA@github)
 * @notice A Collateralized Debt Obligation agreement with 6 senior tranche
 *     shares and 4 mezzanine tranche shares, where the senior tranche is paid
 *     out first until it's been made whole for 60% of the total principal +
 *     interest, and the mezzanine tranche is paid out second with the
 *     remainder of the principal + interest.  Deployed via CDOFactory
 *     contract.  Caller of CDOFactory.create() has sole permission to add
 *     underlying `DebtToken`s and to finalize the contract, and sole
 *     permission to call CDO.finalize().
 */
contract CDO is ERC721Receiver {
    address public admin; /// Only the admin can collateralize and finalize

    uint256[] public underlyingDebts; /// references to `DebtToken` `tokenId`s

    /**
     * total expected repayment from underlying debts, determined at the time
     * of collateralization.
     */
    uint public expectedRepayment;

    uint internal withdrawn;

    /**
     * Whether the agreement has been finalized; that is, whether the admin is
     * finished transferring underlying `DebtToken`s to this contract.
     */
    bool public finalized;

    TrancheToken internal trancheToken;

    // mapping of tranche token ID to repayment entitlements
    mapping(uint256 => uint) internal entitlements;

    uint256[6] internal seniors; // tranche token identifiers
    uint256[4] internal mezzanine; // tranche token identifiers

    DebtRegistry internal debtRegistry; /// to get `DebtToken` repayment info

    function CDO(address _debtRegistry)
        public
    {
        admin = msg.sender;

        debtRegistry = DebtRegistry(_debtRegistry);

        for (uint i=0; i < seniors.length; i++) {
            seniors[i] = trancheToken.create(this);
            entitlements[seniors[i]] = 0;
        }

        for (uint j=0; j < mezzanine.length; j++) {
            mezzanine[j] = trancheToken.create(this);
            entitlements[mezzanine[j]] = 0;
        }
    }

    /**
     * Receive debt repayment
     */
    function () public payable {}

    function totalExpectedSeniorPayout()
        public
        view
        returns (uint)
    {
        return expectedRepayment*6/10;
    }

    function remainingExpectedSeniorPayout()
        public
        view
        returns (uint)
    {
        totalExpectedSeniorPayout() - withdrawn - seniorEntitlements();
    }

    function seniorEntitlements()
        public
        view
        returns (uint)
    {
        uint _seniorEntitlements;
        for (uint i=0; i < seniors.length; i++) {
            _seniorEntitlements += entitlements[seniors[i]];
        }
        return _seniorEntitlements;
    }

    function mezzanineEntitlements()
        public
        view
        returns (uint)
    {
        uint _mezzanineEntitlements;
        for (uint i=0; i < mezzanine.length; i++) {
            _mezzanineEntitlements += entitlements[mezzanine[i]];
        }
        return _mezzanineEntitlements;
    }

    function totalEntitlements()
        public
        view
        returns (uint)
    {
        return seniorEntitlements() + mezzanineEntitlements();
    }

    function withdraw(uint256 trancheTokenId, address _to)
        public
    {
        require(trancheToken.ownerOf(trancheTokenId) == msg.sender);

        // first update `entitlements` with any repayments that have come in
        // since the last call to this function.

        uint unallocatedEntitlements = this.balance - totalEntitlements();

        if (unallocatedEntitlements > 0) {

            if (remainingExpectedSeniorPayout() > 0) {
                uint unallocatedSeniorEntitlements =
                    (remainingExpectedSeniorPayout() < unallocatedEntitlements)
                    ? remainingExpectedSeniorPayout() : unallocatedEntitlements;

                for (uint i=0; i < seniors.length; i++) {
                    // TODO: determine if division truncation is an issue here
                    entitlements[seniors[i]] +=
                        unallocatedSeniorEntitlements/seniors.length;
                }

                unallocatedEntitlements -= unallocatedSeniorEntitlements;
            }

            if (unallocatedEntitlements > 0) {
                for (uint j=0; j < mezzanine.length; j++) {
                    // TODO: determine if division truncation is an issue here
                    entitlements[mezzanine[i]] +=
                        unallocatedEntitlements/mezzanine.length;
                }
            }
        }

        // done updating `entitlements`

        uint entitlement = entitlements[trancheTokenId];

        require(entitlement > 0);

        entitlements[trancheTokenId] = 0;

        withdrawn += entitlement;

        _to.transfer(entitlement);
    }

    /**
     * Receive `DebtToken`s, the underlying debts of this CDO.
     */
    function onERC721Received(
        address _from,
        uint256 _tokenId,
        bytes
    )
        public
        returns(bytes4)
    {
        require(!finalized);
        require(_from == admin);
        // TODO: consider requiring token to be a DebtToken. (but how?)

        TermsContract termsContract =
            TermsContract(debtRegistry.getTermsContract(bytes32(_tokenId)));

        // TODO: determine whether getExpectedRepaymentValue is really
        // appropriate here, given that it's not a constant function.
        expectedRepayment +=
            termsContract.getExpectedRepaymentValue(
                bytes32(_tokenId),
                termsContract.getTermEndTimestamp(bytes32(_tokenId)));

        underlyingDebts.push(_tokenId);

        return ERC721Receiver.ERC721_RECEIVED;
    }

    /**
     * @author F. Eugene Aumson (feuGeneA@github)
     * @notice Precondition: transfer to this contract the `DebtToken`s which
     *     will serve as the underlying debts for this CDO.  This method will
     *     create the tranche tokens, transfer them to the caller, and return
     *     their `tokenId`s in `senior` and `mezzanine`.
     */
    function finalize()
        public
        returns (
            uint256[6] _senior,
            uint256[4] _mezzanine)
    {
        require(msg.sender == admin);
        require(underlyingDebts.length >= 3);
        // TODO: consider anything else that might need to be done here.
        finalized = true;
        return (seniors, mezzanine);
    }
}
