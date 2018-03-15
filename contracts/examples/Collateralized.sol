/*

  Copyright 2017 Dharma Labs Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.

*/

pragma solidity 0.4.18;

import "zeppelin-solidity/contracts/math/SafeMath.sol";
import "zeppelin-solidity/contracts/token/ERC20/ERC20.sol";

import "../TermsContract.sol";
import "../DebtRegistry.sol";
import "../TokenRegistry.sol";


contract Collateralized is TermsContract {
    using SafeMath for uint;

    address public debtKernelAddress;

    DebtRegistry public debtRegistry;
    TokenRegistry public tokenRegistry;

    mapping(bytes32 => address) public agreementToCollateralizer;

    uint public constant SECONDS_IN_DAY = 24*60*60;

    event CollateralLocked(
        bytes32 indexed agreementID,
        address token,
        uint amount
    );

    event CollateralReturned(
        bytes32 indexed agreementID,
        address indexed collateralizer,
        address token,
        uint amount
    );

    event CollateralSeized(
        bytes32 indexed agreementID,
        address indexed beneficiary,
        address token,
        uint amount
    );

    function Collateralized(address _debtKernel, address _debtRegistry, address _tokenRegistry) public {
        debtKernelAddress = _debtKernel;
        debtRegistry = DebtRegistry(_debtRegistry);
        tokenRegistry = TokenRegistry(_tokenRegistry);
    }

    function registerTermStart(bytes32 agreementId, address collateralizer)
        public
        returns (bool _success)
    {
        require(msg.sender == debtKernelAddress);

        address collateralToken;
        uint collateralAmount;
        uint gracePeriodInDays;

        (collateralToken, collateralAmount, gracePeriodInDays) = retrieveCollateralParameters(agreementId);

        // the amount being put up for collateral must exceed 0.
        require(collateralAmount > 0);

        /*
        Ensure that the agreement has not already been collateralized.

        If the agreement has already been collateralized, this check will fail
        because any valid collateralization must have some sort of valid
        address associated with it as a collateralizer.  Given that it is impossible
        to send transactions from address 0x0, this check will only fail
        when the agreement is already collateralized.
        */
        require(agreementToCollateralizer[agreementId] == address(0));

        ERC20 erc20token = ERC20(collateralToken);
        address custodian = address(this);

        /*
        The collateralizer must have sufficient balance equal to or greater
        than the amount being put up for collateral.
        */
        require(erc20token.balanceOf(collateralizer) >= collateralAmount);

        /*
        The custodian must have an allowance granted by the collateralizer equal
        to or greater than the amount being put up for collateral.
        */
        require(erc20token.allowance(collateralizer, custodian) >= collateralAmount);

        // store collaterallizer in mapping, effectively demarcating that the
        // agreement is now collateralized.
        agreementToCollateralizer[agreementId] = collateralizer;

        // the collateral must be successfully transferred to this contract.
        require(erc20token.transferFrom(
            collateralizer,
            custodian,
            collateralAmount
        ));

        // emit event that collateral has been secured.
        CollateralLocked(agreementId, collateralToken, collateralAmount);

        return true;
    }

    function returnCollateral(
        bytes32 agreementId
    )
        public
    {
        /* // fetch relevant collateral instance.
        Collateral memory collateral = collateralForAgreementID[agreementID];

        // Ensure a valid form of collateral is tied to this agreement id.
        require(collateral.lockupPeriod > 0);

        // Collateral can only be returned after the lockup period.
        require(block.timestamp > collateral.lockupPeriod);

        // Collateral can only be returned if it has yet to be withdrawn.
        require(!collateral.withdrawn);

        // ensure sufficient payment.
        require(
            getExpectedRepaymentValue(agreementID, block.timestamp) <=
            getValueRepaidToDate(agreementID)
        );

        // mark collateral as withdrawn.
        collateralForAgreementID[agreementID].withdrawn = true;

        // transfer the collateral this contract was holding in escrow back to sender.
        require(
            ERC20(collateral.token).transfer(
                collateral.collateralizer,
                collateral.amount
            )
        );

        // log that the collateral has been succesfully returned to collateralizer.
        CollateralReturned(
            agreementID,
            collateral.collateralizer,
            collateral.token,
            collateral.amount
        ); */

        // Mark agreement's collateral as withdrawn by setting the agreement's
        // collateralizer to 0x0.
        delete agreementToCollateralizer[agreementId];
    }

    function seizeCollateral(
        bytes32 agreementId
    )
        public
    {
        // fetch all relevant collateralization parameters
        address collateralToken;
        uint collateralAmount;
        uint gracePeriodInDays;

        (collateralToken, collateralAmount, gracePeriodInDays) = retrieveCollateralParameters(agreementId);

        // Ensure a valid form of collateral is tied to this agreement id
        require(collateralAmount > 0);

        // Seizure can only occur if the collateral has yet to be withdrawn.
        // When we withdraw collateral, we reset the collateral agreement
        // in a gas-efficient manner by resetting the address of the collateralizer to 0
        require(agreementToCollateralizer[agreementId] != address(0));

        // Ensure debt is in a state of default when we account for the
        // specified "grace period".  We do this by checking whether the
        // *current* value repaid to-date exceeds the expected repayment value
        // at the point of time at which the grace period would begin if it ended
        // now.  This crucially relies on the assumption that both expected repayment value
        /// and value repaid to date monotonically increase over time
        require(
            getExpectedRepaymentValue(
                agreementId,
                timestampAdjustedForGracePeriod(gracePeriodInDays)
            ) > getValueRepaidToDate(agreementId)
        );

        // Mark agreement's collateral as withdrawn by setting the agreement's
        // collateralizer to 0x0.
        delete agreementToCollateralizer[agreementId];

        // determine beneficiary of the seized collateral.
        address beneficiary = debtRegistry.getBeneficiary(agreementId);

        // seize collateral and transfer to beneficiary.
        require(
            ERC20(collateralToken).transfer(
                beneficiary,
                collateralAmount
            )
        );

        // log the seizure event.
        CollateralSeized(
            agreementId,
            beneficiary,
            collateralToken,
            collateralAmount
        );
    }

    /**
     * Unpacks collateralization-specific parameters from their tightly-packed
     * representationn in a terms contract parameter string.
     *
     * For collateralized terms contracts, we reserve the lowest order 108 bits
     * of the terms contract parameters for parameters relevant to collateralization.
     *
     * Contracts that inherit from the Collateralized terms contract
     * can encode whichever parameter schema they please in the remaining
     * space of the terms contract parameters.
     * The 108 bits are encoded as follows (from higher order bits to lower order bits):
     *
     * 8 bits - Collateral Token (encoded by its unsigned integer index in the TokenRegistry contract)
     * 92 bits - Collateral Amount (encoded as an unsigned integer)
     * 8 bits - Grace Period* Length (encoded as an unsigned integer)
     *
     * * = The "Grace" Period is the number of days a debtor has between
     *      when they fall behind on an expected payment and when their collateral
     *      can be seized by the creditor.
     */
    function unpackCollateralParametersFromBytes(bytes32 parameters)
        public
        pure
        returns (uint, uint, uint)
    {
        // The first byte of the 108 reserved bits represents the collateral token.
        bytes32 collateralTokenIndexShifted =
            parameters & 0x0000000000000000000000000000000000000ff0000000000000000000000000;
        // The subsequent 92 bits represents the collateral amount, as denominated in the above token.
        bytes32 collateralAmountShifted =
            parameters & 0x000000000000000000000000000000000000000fffffffffffffffffffffff00;

        // We bit-shift these values, respectively, 100 bits and 8 bits right using
        // mathematical operations, so that their 32 byte integer counterparts
        // correspond to the intended values packed in the 32 byte string
        uint collateralTokenIndex = uint(collateralTokenIndexShifted) / 2 ** 100;
        uint collateralAmount = uint(collateralAmountShifted) / 2 ** 8;

        // The last byte of the parameters represents the "grace period" of the loan,
        // as defined in terms of days.
        // Since this value takes the rightmost place in the parameters string,
        // we do not need to bit-shift it.
        bytes32 gracePeriodInDays =
            parameters & 0x00000000000000000000000000000000000000000000000000000000000000ff;

        return (
            collateralTokenIndex,
            collateralAmount,
            uint(gracePeriodInDays)
        );
    }

    function timestampAdjustedForGracePeriod(uint gracePeriodInDays)
        public
        view
        returns (uint)
    {
        return block.timestamp.sub(
            SECONDS_IN_DAY.mul(gracePeriodInDays)
        );
    }

    function retrieveCollateralParameters(bytes32 agreementId)
        internal
        view
        returns (address _collateralToken, uint _collateralAmount, uint _gracePeriodInDays)
    {
        address termsContract;
        bytes32 termsContractParameters;

        // Pull the terms contract and associated parameters for the agreement
        (termsContract, termsContractParameters) = debtRegistry.getTerms(agreementId);

        // Assert agreement specifies this contract as its terms contract
        require(termsContract == address(this));

        uint collateralTokenIndex;
        uint collateralAmount;
        uint gracePeriodInDays;

        // Unpack terms contract parameters in order to get collateralization-specific params
        (collateralTokenIndex, collateralAmount, gracePeriodInDays) =
            unpackCollateralParametersFromBytes(termsContractParameters);

        // Resolve address of token associated with this agreement in token registry
        address collateralToken = tokenRegistry.getTokenAddressByIndex(collateralTokenIndex);

        return (
            collateralToken,
            collateralAmount,
            gracePeriodInDays
        );
    }
}
