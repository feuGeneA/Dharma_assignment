export const ERC721Basic = 
{
  "contractName": "ERC721Basic",
  "abi": [
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "getApproved",
      "outputs": [
        {
          "name": "_operator",
          "type": "address"
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
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "exists",
      "outputs": [
        {
          "name": "_exists",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "_balance",
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
          "name": "_operator",
          "type": "address"
        },
        {
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
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
      "name": "safeTransferFrom",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_operator",
          "type": "address"
        }
      ],
      "name": "isApprovedForAll",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_approved",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_tokenId",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_operator",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_approved",
          "type": "bool"
        }
      ],
      "name": "ApprovalForAll",
      "type": "event"
    }
  ],
  "bytecode": "0x",
  "deployedBytecode": "0x",
  "sourceMap": "",
  "deployedSourceMap": "",
  "source": "pragma solidity ^0.4.18;\n\n/**\n * @title ERC721 Non-Fungible Token Standard basic interface\n * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md\n */\ncontract ERC721Basic {\n  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);\n  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);\n  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);  \n\n  function balanceOf(address _owner) public view returns (uint256 _balance);\n  function ownerOf(uint256 _tokenId) public view returns (address _owner);\n  function exists(uint256 _tokenId) public view returns (bool _exists);\n  \n  function approve(address _to, uint256 _tokenId) public;\n  function getApproved(uint256 _tokenId) public view returns (address _operator);\n  \n  function setApprovalForAll(address _operator, bool _approved) public;\n  function isApprovedForAll(address _owner, address _operator) public view returns (bool);\n\n  function transferFrom(address _from, address _to, uint256 _tokenId) public;\n  function safeTransferFrom(address _from, address _to, uint256 _tokenId) public;  \n  function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes _data) public;\n}\n",
  "sourcePath": "zeppelin-solidity/contracts/token/ERC721/ERC721Basic.sol",
  "ast": {
    "attributes": {
      "absolutePath": "zeppelin-solidity/contracts/token/ERC721/ERC721Basic.sol",
      "exportedSymbols": {
        "ERC721Basic": [
          9091
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
        "id": 8986,
        "name": "PragmaDirective",
        "src": "0:24:39"
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
          "documentation": "@title ERC721 Non-Fungible Token Standard basic interface\n@dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md",
          "fullyImplemented": false,
          "linearizedBaseContracts": [
            9091
          ],
          "name": "ERC721Basic",
          "scope": 9092
        },
        "children": [
          {
            "attributes": {
              "anonymous": false,
              "name": "Transfer"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "_from",
                      "scope": 8994,
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
                        "id": 8987,
                        "name": "ElementaryTypeName",
                        "src": "208:7:39"
                      }
                    ],
                    "id": 8988,
                    "name": "VariableDeclaration",
                    "src": "208:21:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "_to",
                      "scope": 8994,
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
                        "id": 8989,
                        "name": "ElementaryTypeName",
                        "src": "231:7:39"
                      }
                    ],
                    "id": 8990,
                    "name": "VariableDeclaration",
                    "src": "231:19:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "_tokenId",
                      "scope": 8994,
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
                        "id": 8991,
                        "name": "ElementaryTypeName",
                        "src": "252:7:39"
                      }
                    ],
                    "id": 8992,
                    "name": "VariableDeclaration",
                    "src": "252:16:39"
                  }
                ],
                "id": 8993,
                "name": "ParameterList",
                "src": "207:62:39"
              }
            ],
            "id": 8994,
            "name": "EventDefinition",
            "src": "193:77:39"
          },
          {
            "attributes": {
              "anonymous": false,
              "name": "Approval"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "_owner",
                      "scope": 9002,
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
                        "id": 8995,
                        "name": "ElementaryTypeName",
                        "src": "288:7:39"
                      }
                    ],
                    "id": 8996,
                    "name": "VariableDeclaration",
                    "src": "288:22:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "_approved",
                      "scope": 9002,
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
                        "id": 8997,
                        "name": "ElementaryTypeName",
                        "src": "312:7:39"
                      }
                    ],
                    "id": 8998,
                    "name": "VariableDeclaration",
                    "src": "312:25:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "_tokenId",
                      "scope": 9002,
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
                        "id": 8999,
                        "name": "ElementaryTypeName",
                        "src": "339:7:39"
                      }
                    ],
                    "id": 9000,
                    "name": "VariableDeclaration",
                    "src": "339:16:39"
                  }
                ],
                "id": 9001,
                "name": "ParameterList",
                "src": "287:69:39"
              }
            ],
            "id": 9002,
            "name": "EventDefinition",
            "src": "273:84:39"
          },
          {
            "attributes": {
              "anonymous": false,
              "name": "ApprovalForAll"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "_owner",
                      "scope": 9010,
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
                        "id": 9003,
                        "name": "ElementaryTypeName",
                        "src": "381:7:39"
                      }
                    ],
                    "id": 9004,
                    "name": "VariableDeclaration",
                    "src": "381:22:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": true,
                      "name": "_operator",
                      "scope": 9010,
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
                        "id": 9005,
                        "name": "ElementaryTypeName",
                        "src": "405:7:39"
                      }
                    ],
                    "id": 9006,
                    "name": "VariableDeclaration",
                    "src": "405:25:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "indexed": false,
                      "name": "_approved",
                      "scope": 9010,
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
                        "id": 9007,
                        "name": "ElementaryTypeName",
                        "src": "432:4:39"
                      }
                    ],
                    "id": 9008,
                    "name": "VariableDeclaration",
                    "src": "432:14:39"
                  }
                ],
                "id": 9009,
                "name": "ParameterList",
                "src": "380:67:39"
              }
            ],
            "id": 9010,
            "name": "EventDefinition",
            "src": "360:88:39"
          },
          {
            "attributes": {
              "body": null,
              "constant": true,
              "implemented": false,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "balanceOf",
              "payable": false,
              "scope": 9091,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_owner",
                      "scope": 9017,
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
                        "id": 9011,
                        "name": "ElementaryTypeName",
                        "src": "473:7:39"
                      }
                    ],
                    "id": 9012,
                    "name": "VariableDeclaration",
                    "src": "473:14:39"
                  }
                ],
                "id": 9013,
                "name": "ParameterList",
                "src": "472:16:39"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_balance",
                      "scope": 9017,
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
                        "id": 9014,
                        "name": "ElementaryTypeName",
                        "src": "510:7:39"
                      }
                    ],
                    "id": 9015,
                    "name": "VariableDeclaration",
                    "src": "510:16:39"
                  }
                ],
                "id": 9016,
                "name": "ParameterList",
                "src": "509:18:39"
              }
            ],
            "id": 9017,
            "name": "FunctionDefinition",
            "src": "454:74:39"
          },
          {
            "attributes": {
              "body": null,
              "constant": true,
              "implemented": false,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "ownerOf",
              "payable": false,
              "scope": 9091,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 9024,
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
                        "id": 9018,
                        "name": "ElementaryTypeName",
                        "src": "548:7:39"
                      }
                    ],
                    "id": 9019,
                    "name": "VariableDeclaration",
                    "src": "548:16:39"
                  }
                ],
                "id": 9020,
                "name": "ParameterList",
                "src": "547:18:39"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_owner",
                      "scope": 9024,
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
                        "id": 9021,
                        "name": "ElementaryTypeName",
                        "src": "587:7:39"
                      }
                    ],
                    "id": 9022,
                    "name": "VariableDeclaration",
                    "src": "587:14:39"
                  }
                ],
                "id": 9023,
                "name": "ParameterList",
                "src": "586:16:39"
              }
            ],
            "id": 9024,
            "name": "FunctionDefinition",
            "src": "531:72:39"
          },
          {
            "attributes": {
              "body": null,
              "constant": true,
              "implemented": false,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "exists",
              "payable": false,
              "scope": 9091,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 9031,
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
                        "id": 9025,
                        "name": "ElementaryTypeName",
                        "src": "622:7:39"
                      }
                    ],
                    "id": 9026,
                    "name": "VariableDeclaration",
                    "src": "622:16:39"
                  }
                ],
                "id": 9027,
                "name": "ParameterList",
                "src": "621:18:39"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_exists",
                      "scope": 9031,
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
                        "id": 9028,
                        "name": "ElementaryTypeName",
                        "src": "661:4:39"
                      }
                    ],
                    "id": 9029,
                    "name": "VariableDeclaration",
                    "src": "661:12:39"
                  }
                ],
                "id": 9030,
                "name": "ParameterList",
                "src": "660:14:39"
              }
            ],
            "id": 9031,
            "name": "FunctionDefinition",
            "src": "606:69:39"
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
              "name": "approve",
              "payable": false,
              "scope": 9091,
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
                      "name": "_to",
                      "scope": 9038,
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
                        "id": 9032,
                        "name": "ElementaryTypeName",
                        "src": "698:7:39"
                      }
                    ],
                    "id": 9033,
                    "name": "VariableDeclaration",
                    "src": "698:11:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 9038,
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
                        "id": 9034,
                        "name": "ElementaryTypeName",
                        "src": "711:7:39"
                      }
                    ],
                    "id": 9035,
                    "name": "VariableDeclaration",
                    "src": "711:16:39"
                  }
                ],
                "id": 9036,
                "name": "ParameterList",
                "src": "697:31:39"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 9037,
                "name": "ParameterList",
                "src": "735:0:39"
              }
            ],
            "id": 9038,
            "name": "FunctionDefinition",
            "src": "681:55:39"
          },
          {
            "attributes": {
              "body": null,
              "constant": true,
              "implemented": false,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "getApproved",
              "payable": false,
              "scope": 9091,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 9045,
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
                        "id": 9039,
                        "name": "ElementaryTypeName",
                        "src": "760:7:39"
                      }
                    ],
                    "id": 9040,
                    "name": "VariableDeclaration",
                    "src": "760:16:39"
                  }
                ],
                "id": 9041,
                "name": "ParameterList",
                "src": "759:18:39"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_operator",
                      "scope": 9045,
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
                        "id": 9042,
                        "name": "ElementaryTypeName",
                        "src": "799:7:39"
                      }
                    ],
                    "id": 9043,
                    "name": "VariableDeclaration",
                    "src": "799:17:39"
                  }
                ],
                "id": 9044,
                "name": "ParameterList",
                "src": "798:19:39"
              }
            ],
            "id": 9045,
            "name": "FunctionDefinition",
            "src": "739:79:39"
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
              "name": "setApprovalForAll",
              "payable": false,
              "scope": 9091,
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
                      "name": "_operator",
                      "scope": 9052,
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
                        "id": 9046,
                        "name": "ElementaryTypeName",
                        "src": "851:7:39"
                      }
                    ],
                    "id": 9047,
                    "name": "VariableDeclaration",
                    "src": "851:17:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_approved",
                      "scope": 9052,
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
                        "id": 9048,
                        "name": "ElementaryTypeName",
                        "src": "870:4:39"
                      }
                    ],
                    "id": 9049,
                    "name": "VariableDeclaration",
                    "src": "870:14:39"
                  }
                ],
                "id": 9050,
                "name": "ParameterList",
                "src": "850:35:39"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 9051,
                "name": "ParameterList",
                "src": "892:0:39"
              }
            ],
            "id": 9052,
            "name": "FunctionDefinition",
            "src": "824:69:39"
          },
          {
            "attributes": {
              "body": null,
              "constant": true,
              "implemented": false,
              "isConstructor": false,
              "modifiers": [
                null
              ],
              "name": "isApprovedForAll",
              "payable": false,
              "scope": 9091,
              "stateMutability": "view",
              "superFunction": null,
              "visibility": "public"
            },
            "children": [
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_owner",
                      "scope": 9061,
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
                        "id": 9053,
                        "name": "ElementaryTypeName",
                        "src": "922:7:39"
                      }
                    ],
                    "id": 9054,
                    "name": "VariableDeclaration",
                    "src": "922:14:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_operator",
                      "scope": 9061,
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
                        "id": 9055,
                        "name": "ElementaryTypeName",
                        "src": "938:7:39"
                      }
                    ],
                    "id": 9056,
                    "name": "VariableDeclaration",
                    "src": "938:17:39"
                  }
                ],
                "id": 9057,
                "name": "ParameterList",
                "src": "921:35:39"
              },
              {
                "children": [
                  {
                    "attributes": {
                      "constant": false,
                      "name": "",
                      "scope": 9061,
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
                        "id": 9058,
                        "name": "ElementaryTypeName",
                        "src": "978:4:39"
                      }
                    ],
                    "id": 9059,
                    "name": "VariableDeclaration",
                    "src": "978:4:39"
                  }
                ],
                "id": 9060,
                "name": "ParameterList",
                "src": "977:6:39"
              }
            ],
            "id": 9061,
            "name": "FunctionDefinition",
            "src": "896:88:39"
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
              "name": "transferFrom",
              "payable": false,
              "scope": 9091,
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
                      "scope": 9070,
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
                        "id": 9062,
                        "name": "ElementaryTypeName",
                        "src": "1010:7:39"
                      }
                    ],
                    "id": 9063,
                    "name": "VariableDeclaration",
                    "src": "1010:13:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_to",
                      "scope": 9070,
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
                        "id": 9064,
                        "name": "ElementaryTypeName",
                        "src": "1025:7:39"
                      }
                    ],
                    "id": 9065,
                    "name": "VariableDeclaration",
                    "src": "1025:11:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 9070,
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
                        "id": 9066,
                        "name": "ElementaryTypeName",
                        "src": "1038:7:39"
                      }
                    ],
                    "id": 9067,
                    "name": "VariableDeclaration",
                    "src": "1038:16:39"
                  }
                ],
                "id": 9068,
                "name": "ParameterList",
                "src": "1009:46:39"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 9069,
                "name": "ParameterList",
                "src": "1062:0:39"
              }
            ],
            "id": 9070,
            "name": "FunctionDefinition",
            "src": "988:75:39"
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
              "name": "safeTransferFrom",
              "payable": false,
              "scope": 9091,
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
                      "scope": 9079,
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
                        "id": 9071,
                        "name": "ElementaryTypeName",
                        "src": "1092:7:39"
                      }
                    ],
                    "id": 9072,
                    "name": "VariableDeclaration",
                    "src": "1092:13:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_to",
                      "scope": 9079,
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
                        "id": 9073,
                        "name": "ElementaryTypeName",
                        "src": "1107:7:39"
                      }
                    ],
                    "id": 9074,
                    "name": "VariableDeclaration",
                    "src": "1107:11:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 9079,
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
                        "id": 9075,
                        "name": "ElementaryTypeName",
                        "src": "1120:7:39"
                      }
                    ],
                    "id": 9076,
                    "name": "VariableDeclaration",
                    "src": "1120:16:39"
                  }
                ],
                "id": 9077,
                "name": "ParameterList",
                "src": "1091:46:39"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 9078,
                "name": "ParameterList",
                "src": "1144:0:39"
              }
            ],
            "id": 9079,
            "name": "FunctionDefinition",
            "src": "1066:79:39"
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
              "name": "safeTransferFrom",
              "payable": false,
              "scope": 9091,
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
                      "scope": 9090,
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
                        "id": 9080,
                        "name": "ElementaryTypeName",
                        "src": "1176:7:39"
                      }
                    ],
                    "id": 9081,
                    "name": "VariableDeclaration",
                    "src": "1176:13:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_to",
                      "scope": 9090,
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
                        "id": 9082,
                        "name": "ElementaryTypeName",
                        "src": "1191:7:39"
                      }
                    ],
                    "id": 9083,
                    "name": "VariableDeclaration",
                    "src": "1191:11:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_tokenId",
                      "scope": 9090,
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
                        "id": 9084,
                        "name": "ElementaryTypeName",
                        "src": "1204:7:39"
                      }
                    ],
                    "id": 9085,
                    "name": "VariableDeclaration",
                    "src": "1204:16:39"
                  },
                  {
                    "attributes": {
                      "constant": false,
                      "name": "_data",
                      "scope": 9090,
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
                        "id": 9086,
                        "name": "ElementaryTypeName",
                        "src": "1222:5:39"
                      }
                    ],
                    "id": 9087,
                    "name": "VariableDeclaration",
                    "src": "1222:11:39"
                  }
                ],
                "id": 9088,
                "name": "ParameterList",
                "src": "1175:59:39"
              },
              {
                "attributes": {
                  "parameters": [
                    null
                  ]
                },
                "children": [],
                "id": 9089,
                "name": "ParameterList",
                "src": "1241:0:39"
              }
            ],
            "id": 9090,
            "name": "FunctionDefinition",
            "src": "1150:92:39"
          }
        ],
        "id": 9091,
        "name": "ContractDefinition",
        "src": "168:1076:39"
      }
    ],
    "id": 9092,
    "name": "SourceUnit",
    "src": "0:1245:39"
  },
  "compiler": {
    "name": "solc",
    "version": "0.4.18+commit.9cf6e910.Emscripten.clang"
  },
  "networks": {},
  "schemaVersion": "1.0.1",
  "updatedAt": "2018-05-01T21:37:41.258Z"
}