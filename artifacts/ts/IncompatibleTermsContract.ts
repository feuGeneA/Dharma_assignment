export const IncompatibleTermsContract = 
{
  "contractName": "IncompatibleTermsContract",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "agreementId",
          "type": "bytes32"
        }
      ],
      "name": "getValueRepaidToDate",
      "outputs": [
        {
          "name": "_valueRepaid",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "agreementId",
          "type": "bytes32"
        }
      ],
      "name": "registerTermStart",
      "outputs": [
        {
          "name": "_success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "agreementId",
          "type": "bytes32"
        },
        {
          "name": "payer",
          "type": "address"
        },
        {
          "name": "beneficiary",
          "type": "address"
        },
        {
          "name": "unitsOfRepayment",
          "type": "uint256"
        },
        {
          "name": "tokenAddress",
          "type": "address"
        }
      ],
      "name": "registerRepayment",
      "outputs": [
        {
          "name": "_success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "agreementId",
          "type": "bytes32"
        },
        {
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "name": "getExpectedRepaymentValue",
      "outputs": [
        {
          "name": "_expectedRepaymentValue",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ],
  "bytecode": "0x6060604052341561000f57600080fd5b6102238061001e6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806303a896a114610067578063282b3405146100a25780635f0280ba146100e157806399114d8414610186575b600080fd5b341561007257600080fd5b61008c6004808035600019169060200190919050506101ca565b6040518082815260200191505060405180910390f35b34156100ad57600080fd5b6100c76004808035600019169060200190919050506101d4565b604051808215151515815260200191505060405180910390f35b34156100ec57600080fd5b61016c60048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101de565b604051808215151515815260200191505060405180910390f35b341561019157600080fd5b6101b46004808035600019169060200190919080359060200190919050506101ec565b6040518082815260200191505060405180910390f35b6000809050919050565b6000809050919050565b600080905095945050505050565b6000809050929150505600a165627a7a72305820dbbce7b3b0adffbf724162747c048ae617714641dde3ab19776666757993e1100029",
  "deployedBytecode": "0x606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806303a896a114610067578063282b3405146100a25780635f0280ba146100e157806399114d8414610186575b600080fd5b341561007257600080fd5b61008c6004808035600019169060200190919050506101ca565b6040518082815260200191505060405180910390f35b34156100ad57600080fd5b6100c76004808035600019169060200190919050506101d4565b604051808215151515815260200191505060405180910390f35b34156100ec57600080fd5b61016c60048080356000191690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506101de565b604051808215151515815260200191505060405180910390f35b341561019157600080fd5b6101b46004808035600019169060200190919080359060200190919050506101ec565b6040518082815260200191505060405180910390f35b6000809050919050565b6000809050919050565b600080905095945050505050565b6000809050929150505600a165627a7a72305820dbbce7b3b0adffbf724162747c048ae617714641dde3ab19776666757993e1100029",
  "sourceMap": "867:2981:26:-;;;;;;;;;;;;;;;;;",
  "deployedSourceMap": "867:2981:26:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3702:144;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;1500:142;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;2353:258;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3220:201;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;3702:144;3798:17;3838:1;3831:8;;3702:144;;;:::o;1500:142::-;1594:13;1630:5;1623:12;;1500:142;;;:::o;2353:258::-;2563:13;2599:5;2592:12;;2353:258;;;;;;;:::o;3220:201::-;3362:28;3413:1;3406:8;;3220:201;;;;:::o",
  "source": "/*\n\n  Copyright 2017 Dharma Labs Inc.\n\n  Licensed under the Apache License, Version 2.0 (the \"License\");\n  you may not use this file except in compliance with the License.\n  You may obtain a copy of the License at\n\n    http://www.apache.org/licenses/LICENSE-2.0\n\n  Unless required by applicable law or agreed to in writing, software\n  distributed under the License is distributed on an \"AS IS\" BASIS,\n  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n  See the License for the specific language governing permissions and\n  limitations under the License.\n\n*/\n\npragma solidity 0.4.18;\n\nimport \"../../TermsContract.sol\";\n\n\n/**\n * Contract created for testing purposes that will consistently reject\n * debt order fills that are mapped to it by returning `false` for\n * `registerTermStart`\n *\n * Author: Nadav Hollander Github: nadavhollander\n */\ncontract IncompatibleTermsContract is TermsContract {\n    /// When called, the registerTermStart function registers the fact that\n    ///    the debt agreement has begun.  Given that the SimpleInterestTermsContract\n    ///    doesn't rely on taking any sorts of actions when the loan term begins,\n    ///    we simply validate DebtKernel is the transaction sender, and return\n    ///    `true` if the debt agreement is associated with this terms contract.\n    /// @param  agreementId bytes32. The agreement id (issuance hash) of the debt agreement to which this pertains.\n    /// @return _success bool. Acknowledgment of whether\n    function registerTermStart(\n        bytes32 agreementId\n    )\n        public\n        returns (bool _success)\n    {\n        return false;\n    }\n\n     /// When called, the registerRepayment function records the debtor's\n     ///  repayment, as well as any auxiliary metadata needed by the contract\n     ///  to determine ex post facto the value repaid (e.g. current USD\n     ///  exchange rate)\n     /// @param  agreementId bytes32. The agreement id (issuance hash) of the debt agreement to which this pertains.\n     /// @param  payer address. The address of the payer.\n     /// @param  beneficiary address. The address of the payment's beneficiary.\n     /// @param  unitsOfRepayment uint. The units-of-value repaid in the transaction.\n     /// @param  tokenAddress address. The address of the token with which the repayment transaction was executed.\n    function registerRepayment(\n        bytes32 agreementId,\n        address payer,\n        address beneficiary,\n        uint256 unitsOfRepayment,\n        address tokenAddress\n    )\n        public\n        returns (bool _success)\n    {\n        return false;\n    }\n\n     /// Returns the cumulative units-of-value expected to be repaid given a block's timestamp.\n     ///  Note this is not a constant function -- this value can vary on basis of any number of\n     ///  conditions (e.g. interest rates can be renegotiated if repayments are delinquent).\n     /// @param  agreementId bytes32. The agreement id (issuance hash) of the debt agreement to which this pertains.\n     /// @param  timestamp uint. The timestamp for which repayment expectation is being queried.\n     /// @return uint256 The cumulative units-of-value expected to be repaid given a block's timestamp.\n    function getExpectedRepaymentValue(\n        bytes32 agreementId,\n        uint256 timestamp\n    )\n        public\n        view\n        returns (uint _expectedRepaymentValue)\n    {\n        return 0;\n    }\n\n     /// Returns the cumulative units-of-value repaid to date.\n     /// @param agreementId bytes32. The agreement id (issuance hash) of the debt agreement to which this pertains.\n     /// @return uint256 The cumulative units-of-value repaid by the specified block timestamp.\n    function getValueRepaidToDate(bytes32 agreementId)\n        public\n        view\n        returns (uint _valueRepaid)\n    {\n        return 0;\n    }\n}\n",
  "sourcePath": "/Users/nadavhollander/Documents/Dharma/Development/charta/contracts/test/terms_contracts/IncompatibleTermsContract.sol",
  "ast": {
    "attributes": {
      "absolutePath": "/Users/nadavhollander/Documents/Dharma/Development/charta/contracts/test/terms_contracts/IncompatibleTermsContract.sol",
      "exportedSymbols": {
        "IncompatibleTermsContract": [
          6902
        ]
      }
    },
    "children": [
      {
        "attributes": {
          "literals": [
            "solidity",
            "0.4",
            ".18"
          ]
        },
        "id": 6848,
        "name": "PragmaDirective",
        "src": "584:23:26"
      },
      {
        "attributes": {
          "SourceUnit": 2151,
          "absolutePath": "/Users/nadavhollander/Documents/Dharma/Development/charta/contracts/TermsContract.sol",
          "file": "../../TermsContract.sol",
          "scope": 6903,
          "symbolAliases": [
            null
          ],
          "unitAlias": ""
        },
        "id": 6849,
        "name": "ImportDirective",
        "src": "609:33:26"
      },
      {
        "attributes": {
          "contractDependencies": [
            2150
          ],
          "contractKind": "contract",
          "documentation": "Contract created for testing purposes that will consistently reject\ndebt order fills that are mapped to it by returning `false` for\n`registerTermStart`\n * Author: Nadav Hollander Github: nadavhollander",
          "fullyImplemented": true,
          "linearizedBaseContracts": [
            6902,
            2150
          ],
          "name": "IncompatibleTermsContract",
          "scope": 6903
        },
        "children": [
          {
            "attributes": {
              "arguments": [
                null
              ]
            },
            "children": [
              {
                "attributes": {
                  "contractScope": null,
                  "name": "TermsContract",
                  "referencedDeclaration": 2150,
                  "type": "contract TermsContract"
                },
                "id": 6850,
                "name": "UserDefinedTypeName",
                "src": "905:13:26"
              }
            ],
            "id": 6851,
            "name": "InheritanceSpecifier",
            "src": "905:13:26"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "registerTermStart",
              "payable": false,
              "scope": 6902,
              "stateMutability": "nonpayable",
              "superFunction": 2118,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agreementId",
                      "scope": 6861,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 6852,
                        "name": "ElementaryTypeName",
                        "src": "1536:7:26"
                      }
                    ],
                    "id": 6853,
                    "name": "VariableDeclaration",
                    "src": "1536:19:26"
                  }
                ],
                "id": 6854,
                "name": "ParameterList",
                "src": "1526:35:26"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_success",
                      "scope": 6861,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 6855,
                        "name": "ElementaryTypeName",
                        "src": "1594:4:26"
                      }
                    ],
                    "id": 6856,
                    "name": "VariableDeclaration",
                    "src": "1594:13:26"
                  }
                ],
                "id": 6857,
                "name": "ParameterList",
                "src": "1593:15:26"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 6857
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "66616c7365",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "bool",
                          "type": "bool",
                          "value": "false"
                        },
                        "id": 6858,
                        "name": "Literal",
                        "src": "1630:5:26"
                      }
                    ],
                    "id": 6859,
                    "name": "Return",
                    "src": "1623:12:26"
                  }
                ],
                "id": 6860,
                "name": "Block",
                "src": "1613:29:26"
              }
            ],
            "id": 6861,
            "name": "FunctionDefinition",
            "src": "1500:142:26"
          },
          {
            "attributes": {
              "constant": false,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "registerRepayment",
              "payable": false,
              "scope": 6902,
              "stateMutability": "nonpayable",
              "superFunction": 2133,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agreementId",
                      "scope": 6879,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 6862,
                        "name": "ElementaryTypeName",
                        "src": "2389:7:26"
                      }
                    ],
                    "id": 6863,
                    "name": "VariableDeclaration",
                    "src": "2389:19:26"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "payer",
                      "scope": 6879,
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
                        "id": 6864,
                        "name": "ElementaryTypeName",
                        "src": "2418:7:26"
                      }
                    ],
                    "id": 6865,
                    "name": "VariableDeclaration",
                    "src": "2418:13:26"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "beneficiary",
                      "scope": 6879,
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
                        "id": 6866,
                        "name": "ElementaryTypeName",
                        "src": "2441:7:26"
                      }
                    ],
                    "id": 6867,
                    "name": "VariableDeclaration",
                    "src": "2441:19:26"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "unitsOfRepayment",
                      "scope": 6879,
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
                        "id": 6868,
                        "name": "ElementaryTypeName",
                        "src": "2470:7:26"
                      }
                    ],
                    "id": 6869,
                    "name": "VariableDeclaration",
                    "src": "2470:24:26"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "tokenAddress",
                      "scope": 6879,
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
                        "id": 6870,
                        "name": "ElementaryTypeName",
                        "src": "2504:7:26"
                      }
                    ],
                    "id": 6871,
                    "name": "VariableDeclaration",
                    "src": "2504:20:26"
                  }
                ],
                "id": 6872,
                "name": "ParameterList",
                "src": "2379:151:26"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_success",
                      "scope": 6879,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bool",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bool",
                          "type": "bool"
                        },
                        "id": 6873,
                        "name": "ElementaryTypeName",
                        "src": "2563:4:26"
                      }
                    ],
                    "id": 6874,
                    "name": "VariableDeclaration",
                    "src": "2563:13:26"
                  }
                ],
                "id": 6875,
                "name": "ParameterList",
                "src": "2562:15:26"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 6875
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "66616c7365",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "bool",
                          "type": "bool",
                          "value": "false"
                        },
                        "id": 6876,
                        "name": "Literal",
                        "src": "2599:5:26"
                      }
                    ],
                    "id": 6877,
                    "name": "Return",
                    "src": "2592:12:26"
                  }
                ],
                "id": 6878,
                "name": "Block",
                "src": "2582:29:26"
              }
            ],
            "id": 6879,
            "name": "FunctionDefinition",
            "src": "2353:258:26"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getExpectedRepaymentValue",
              "payable": false,
              "scope": 6902,
              "stateMutability": "view",
              "superFunction": 2142,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agreementId",
                      "scope": 6891,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 6880,
                        "name": "ElementaryTypeName",
                        "src": "3264:7:26"
                      }
                    ],
                    "id": 6881,
                    "name": "VariableDeclaration",
                    "src": "3264:19:26"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "timestamp",
                      "scope": 6891,
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
                        "id": 6882,
                        "name": "ElementaryTypeName",
                        "src": "3293:7:26"
                      }
                    ],
                    "id": 6883,
                    "name": "VariableDeclaration",
                    "src": "3293:17:26"
                  }
                ],
                "id": 6884,
                "name": "ParameterList",
                "src": "3254:62:26"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_expectedRepaymentValue",
                      "scope": 6891,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint",
                          "type": "uint256"
                        },
                        "id": 6885,
                        "name": "ElementaryTypeName",
                        "src": "3362:4:26"
                      }
                    ],
                    "id": 6886,
                    "name": "VariableDeclaration",
                    "src": "3362:28:26"
                  }
                ],
                "id": 6887,
                "name": "ParameterList",
                "src": "3361:30:26"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 6887
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "30",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "number",
                          "type": "int_const 0",
                          "value": "0"
                        },
                        "id": 6888,
                        "name": "Literal",
                        "src": "3413:1:26"
                      }
                    ],
                    "id": 6889,
                    "name": "Return",
                    "src": "3406:8:26"
                  }
                ],
                "id": 6890,
                "name": "Block",
                "src": "3396:25:26"
              }
            ],
            "id": 6891,
            "name": "FunctionDefinition",
            "src": "3220:201:26"
          },
          {
            "attributes": {
              "constant": true,
              "implemented": true,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getValueRepaidToDate",
              "payable": false,
              "scope": 6902,
              "stateMutability": "view",
              "superFunction": 2149,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "agreementId",
                      "scope": 6901,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "bytes32",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "bytes32",
                          "type": "bytes32"
                        },
                        "id": 6892,
                        "name": "ElementaryTypeName",
                        "src": "3732:7:26"
                      }
                    ],
                    "id": 6893,
                    "name": "VariableDeclaration",
                    "src": "3732:19:26"
                  }
                ],
                "id": 6894,
                "name": "ParameterList",
                "src": "3731:21:26"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_valueRepaid",
                      "scope": 6901,
                      "stateVariable": false,
                      "storageLocation": "default",
                      "type": "uint256",
                      "value": null,
                      "visibility": "internal"
                    },
                    "children": [
                      {
                        "attributes": {
                          "name": "uint",
                          "type": "uint256"
                        },
                        "id": 6895,
                        "name": "ElementaryTypeName",
                        "src": "3798:4:26"
                      }
                    ],
                    "id": 6896,
                    "name": "VariableDeclaration",
                    "src": "3798:17:26"
                  }
                ],
                "id": 6897,
                "name": "ParameterList",
                "src": "3797:19:26"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "functionReturnParameters": 6897
                    },
                    "children": [
                      {
                        "attributes": {
                          "argumentTypes": null,
                          "hexvalue": "30",
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "lValueRequested": false,
                          "subdenomination": null,
                          "token": "number",
                          "type": "int_const 0",
                          "value": "0"
                        },
                        "id": 6898,
                        "name": "Literal",
                        "src": "3838:1:26"
                      }
                    ],
                    "id": 6899,
                    "name": "Return",
                    "src": "3831:8:26"
                  }
                ],
                "id": 6900,
                "name": "Block",
                "src": "3821:25:26"
              }
            ],
            "id": 6901,
            "name": "FunctionDefinition",
            "src": "3702:144:26"
          }
        ],
        "id": 6902,
        "name": "ContractDefinition",
        "src": "867:2981:26"
      }
    ],
    "id": 6903,
    "name": "SourceUnit",
    "src": "584:3265:26"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.18+commit.9cf6e910.Emscripten.clang"
  },
  "networks": {
    "42": {
      "events": {},
      "links": {},
      "address": "0x301c47a3996864fafb37769650490797caa4b419"
    },
    "70": {
      "events": {},
      "links": {},
      "address": "0x6b2aa16010ce0aa0662edf8c30b78e82037a27ba"
    }
  },
  "schemaVersion": "1.0.1",
  "updatedAt": "2018-03-05T01:01:37.369Z"
}