export const GENERICNFT_ABI = [{
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "account",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
    }],
    "name": "ApprovalForAll",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "value",
        "type": "address"
    }],
    "name": "Creators",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "Supply",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
    }, {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
    }],
    "name": "TransferBatch",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    }, {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
    }],
    "name": "TransferSingle",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "internalType": "string",
        "name": "value",
        "type": "string"
    }, {
        "indexed": true,
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    }],
    "name": "URI",
    "type": "event"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    }],
    "name": "balanceOf",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address[]",
        "name": "accounts",
        "type": "address[]"
    }, {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
    }],
    "name": "balanceOfBatch",
    "outputs": [{
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "creators",
    "outputs": [{
        "internalType": "address",
        "name": "",
        "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "string",
        "name": "_uri",
        "type": "string"
    }],
    "name": "initialize",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }],
    "name": "isApprovedForAll",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "account",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "maximum",
        "type": "uint256"
    }, {
        "internalType": "string",
        "name": "tokenUri",
        "type": "string"
    }, {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
    }],
    "name": "mint",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "minted",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256[]",
        "name": "ids",
        "type": "uint256[]"
    }, {
        "internalType": "uint256[]",
        "name": "amounts",
        "type": "uint256[]"
    }, {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
    }],
    "name": "safeBatchTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
    }, {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
    }, {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
    }],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "address",
        "name": "operator",
        "type": "address"
    }, {
        "internalType": "bool",
        "name": "approved",
        "type": "bool"
    }],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "supply",
    "outputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
    }],
    "name": "supportsInterface",
    "outputs": [{
        "internalType": "bool",
        "name": "",
        "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "tokenURI",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
    }],
    "name": "uri",
    "outputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
}]

export const GENERICNFT721_ABI = [{
    "inputs": [{
        "internalType": "address",
        "name": "from",
        "type": "address"
    }, {
        "internalType": "address",
        "name": "to",
        "type": "address"
    }, {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
    }],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]
export const POLYGONNFT_ABI = [
    {
       "anonymous":false,
       "inputs":[
          {
             "indexed":true,
             "internalType":"address",
             "name":"owner",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"address",
             "name":"approved",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"Approval",
       "type":"event"
    },
    {
       "anonymous":false,
       "inputs":[
          {
             "indexed":true,
             "internalType":"address",
             "name":"owner",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"address",
             "name":"operator",
             "type":"address"
          },
          {
             "indexed":false,
             "internalType":"bool",
             "name":"approved",
             "type":"bool"
          }
       ],
       "name":"ApprovalForAll",
       "type":"event"
    },
    {
       "anonymous":false,
       "inputs":[
          {
             "indexed":false,
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          },
          {
             "indexed":false,
             "internalType":"address",
             "name":"beneficiary",
             "type":"address"
          },
          {
             "indexed":false,
             "internalType":"string",
             "name":"tokenUri",
             "type":"string"
          },
          {
             "indexed":false,
             "internalType":"address",
             "name":"minter",
             "type":"address"
          }
       ],
       "name":"Minted",
       "type":"event"
    },
    {
       "anonymous":false,
       "inputs":[
          {
             "indexed":true,
             "internalType":"address",
             "name":"from",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "indexed":true,
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"Transfer",
       "type":"event"
    },
    {
       "inputs":[
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"approve",
       "outputs":[
          
       ],
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"address",
             "name":"owner",
             "type":"address"
          }
       ],
       "name":"balanceOf",
       "outputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          
       ],
       "name":"baseURI",
       "outputs":[
          {
             "internalType":"string",
             "name":"",
             "type":"string"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"uint256",
             "name":"_tokenId",
             "type":"uint256"
          }
       ],
       "name":"burn",
       "outputs":[
          
       ],
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "name":"creators",
       "outputs":[
          {
             "internalType":"address",
             "name":"",
             "type":"address"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"uint256",
             "name":"_tokenId",
             "type":"uint256"
          }
       ],
       "name":"exists",
       "outputs":[
          {
             "internalType":"bool",
             "name":"",
             "type":"bool"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"getApproved",
       "outputs":[
          {
             "internalType":"address",
             "name":"",
             "type":"address"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"uint256",
             "name":"_tokenId",
             "type":"uint256"
          },
          {
             "internalType":"address",
             "name":"_operator",
             "type":"address"
          }
       ],
       "name":"isApproved",
       "outputs":[
          {
             "internalType":"bool",
             "name":"",
             "type":"bool"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"address",
             "name":"owner",
             "type":"address"
          },
          {
             "internalType":"address",
             "name":"operator",
             "type":"address"
          }
       ],
       "name":"isApprovedForAll",
       "outputs":[
          {
             "internalType":"bool",
             "name":"",
             "type":"bool"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"address",
             "name":"_beneficiary",
             "type":"address"
          },
          {
             "internalType":"string",
             "name":"_tokenUri",
             "type":"string"
          }
       ],
       "name":"mint",
       "outputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "inputs":[
          
       ],
       "name":"name",
       "outputs":[
          {
             "internalType":"string",
             "name":"",
             "type":"string"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"ownerOf",
       "outputs":[
          {
             "internalType":"address",
             "name":"",
             "type":"address"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "name":"primarySalePrice",
       "outputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"address",
             "name":"from",
             "type":"address"
          },
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"safeTransferFrom",
       "outputs":[
          
       ],
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"address",
             "name":"from",
             "type":"address"
          },
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          },
          {
             "internalType":"bytes",
             "name":"_data",
             "type":"bytes"
          }
       ],
       "name":"safeTransferFrom",
       "outputs":[
          
       ],
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"address",
             "name":"operator",
             "type":"address"
          },
          {
             "internalType":"bool",
             "name":"approved",
             "type":"bool"
          }
       ],
       "name":"setApprovalForAll",
       "outputs":[
          
       ],
       "stateMutability":"nonpayable",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"bytes4",
             "name":"interfaceId",
             "type":"bytes4"
          }
       ],
       "name":"supportsInterface",
       "outputs":[
          {
             "internalType":"bool",
             "name":"",
             "type":"bool"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          
       ],
       "name":"symbol",
       "outputs":[
          {
             "internalType":"string",
             "name":"",
             "type":"string"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"uint256",
             "name":"index",
             "type":"uint256"
          }
       ],
       "name":"tokenByIndex",
       "outputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          
       ],
       "name":"tokenIdPointer",
       "outputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"address",
             "name":"owner",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"index",
             "type":"uint256"
          }
       ],
       "name":"tokenOfOwnerByIndex",
       "outputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"tokenURI",
       "outputs":[
          {
             "internalType":"string",
             "name":"",
             "type":"string"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          
       ],
       "name":"totalSupply",
       "outputs":[
          {
             "internalType":"uint256",
             "name":"",
             "type":"uint256"
          }
       ],
       "stateMutability":"view",
       "type":"function"
    },
    {
       "inputs":[
          {
             "internalType":"address",
             "name":"from",
             "type":"address"
          },
          {
             "internalType":"address",
             "name":"to",
             "type":"address"
          },
          {
             "internalType":"uint256",
             "name":"tokenId",
             "type":"uint256"
          }
       ],
       "name":"transferFrom",
       "outputs":[
          
       ],
       "stateMutability":"nonpayable",
       "type":"function"
    }
 ]
export const POLYGONNFT721_ABI = [{
    "inputs":[{
        "internalType":"address",
        "name":"from",
        "type":"address"
    },
    {
        "internalType":"address",
        "name":"to","type":"address"
    },
    {
        "internalType":"uint256",
        "name":"tokenId",
        "type":"uint256"
    },
    {
        "internalType":"bytes",
        "name":"_data","type":"bytes"
    }],
    "name":"safeTransferFrom",
    "outputs":[],
    "stateMutability":"nonpayable",
    "type":"function"
}]