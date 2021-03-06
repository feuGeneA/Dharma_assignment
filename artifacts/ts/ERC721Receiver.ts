export const ERC721Receiver = 
{
  "contractName": "ERC721Receiver",
  "abi": [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        },
        {
          "name": "_data",
          "type": "bytes"
        }
      ],
      "name": "onERC721Received",
      "outputs": [
        {
          "name": "",
          "type": "bytes4"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "pragma solidity ^0.4.18;\n\n/**\n * @title ERC721 token receiver interface\n * @dev Interface for any contract that wants to support safeTransfers\n *  from ERC721 asset contracts.\n */\ncontract ERC721Receiver {\n  /**\n   * @dev Magic value to be returned upon successful reception of an NFT\n   *  Equals to `bytes4(keccak256(\"onERC721Received(address,uint256,bytes)\"))`,\n   *  which can be also obtained as `ERC721Receiver(0).onERC721Received.selector`\n   */\n  bytes4 constant ERC721_RECEIVED = 0xf0b9e5ba; \n\n  /**\n   * @notice Handle the receipt of an NFT\n   * @dev The ERC721 smart contract calls this function on the recipient\n   *  after a `safetransfer`. This function MAY throw to revert and reject the\n   *  transfer. This function MUST use 50,000 gas or less. Return of other\n   *  than the magic value MUST result in the transaction being reverted.\n   *  Note: the contract address is always the message sender.\n   * @param _from The sending address \n   * @param _tokenId The NFT identifier which is being transfered\n   * @param _data Additional data with no specified format\n   * @return `bytes4(keccak256(\"onERC721Received(address,uint256,bytes)\"))`\n   */\n  function onERC721Received(address _from, uint256 _tokenId, bytes _data) public returns(bytes4);\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC721/ERC721Receiver.sol",
  "ast": {
    "attributes": {
      "absolutePath": "zeppelin-solidity/contracts/token/ERC721/ERC721Receiver.sol",
      "exportedSymbols": {
        "ERC721Receiver": [
          9691
        ]
      }
    },
    "children": [
      {
        "attributes": {
          "literals": [
            "solidity",
            "^",
            "0.4",
            ".18"
          ]
        },
        "id": 9676,
        "name": "PragmaDirective",
        "src": "0:24:41"
      },
      {
        "attributes": {
          "baseContracts": [
            null
          ],
          "contractDependencies": [
            null
          ],
          "contractKind": "contract",
          "documentation": "@title ERC721 token receiver interface\n@dev Interface for any contract that wants to support safeTransfers\n from ERC721 asset contracts.",
          "fullyImplemented": false,
          "linearizedBaseContracts": [
            9691
          ],
          "name": "ERC721Receiver",
          "scope": 9692
        },
        "children": [
          {
            "attributes": {
              "constant": true,
              "name": "ERC721_RECEIVED",
              "scope": 9691,
              "stateVariable": true,
              "storageLocation": "default",
              "type": "bytes4",
              "visibility": "internal"
            },
            "children": [
              {
                "attributes": {
                  "name": "bytes4",
                  "type": "bytes4"
                },
                "id": 9677,
                "name": "ElementaryTypeName",
                "src": "455:6:41"
              },
              {
                "attributes": {
                  "argumentTypes": null,
                  "hexvalue": "30786630623965356261",
                  "isConstant": false,
                  "isLValue": false,
                  "isPure": true,
                  "lValueRequested": false,
                  "subdenomination": null,
                  "token": "number",
                  "type": "int_const 4038714810",
                  "value": "0xf0b9e5ba"
                },
                "id": 9678,
                "name": "Literal",
                "src": "489:10:41"
              }
            ],
            "id": 9679,
            "name": "VariableDeclaration",
            "src": "455:44:41"
          },
          {
            "attributes": {
              "body": null,
              "constant": false,
              "implemented": false,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "onERC721Received",
              "payable": false,
              "scope": 9691,
              "stateMutability": "nonpayable",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_from",
                      "scope": 9690,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "address",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "address",
                          "type": "address"
                        },
                        "id": 9680,
                        "name": "ElementaryTypeName",
                        "src": "1189:7:41"
                      }
                    ],
                    "id": 9681,
                    "name": "VariableDeclaration",
                    "src": "1189:13:41"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 9690,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint256",
                          "type": "uint256"
                        },
                        "id": 9682,
                        "name": "ElementaryTypeName",
                        "src": "1204:7:41"
                      }
                    ],
                    "id": 9683,
                    "name": "VariableDeclaration",
                    "src": "1204:16:41"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_data",
                      "scope": 9690,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes memory",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes",
                          "type": "bytes storage pointer"
                        },
                        "id": 9684,
                        "name": "ElementaryTypeName",
                        "src": "1222:5:41"
                      }
                    ],
                    "id": 9685,
                    "name": "VariableDeclaration",
                    "src": "1222:11:41"
                  }
                ],
                "id": 9686,
                "name": "ParameterList",
                "src": "1188:46:41"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 9690,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes4",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes4",
                          "type": "bytes4"
                        },
                        "id": 9687,
                        "name": "ElementaryTypeName",
                        "src": "1250:6:41"
                      }
                    ],
                    "id": 9688,
                    "name": "VariableDeclaration",
                    "src": "1250:6:41"
                  }
                ],
                "id": 9689,
                "name": "ParameterList",
                "src": "1249:8:41"
              }
            ],
            "id": 9690,
            "name": "FunctionDefinition",
            "src": "1163:95:41"
          }
        ],
        "id": 9691,
        "name": "ContractDefinition",
        "src": "180:1080:41"
      }
    ],
    "id": 9692,
    "name": "SourceUnit",
    "src": "0:1261:41"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.18+commit.9cf6e910.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "1.0.1",
  "updatedAt": "2018-05-01T21:37:41.259Z"
}