export const WINGS = {
    metaData: {
        contractAddress: "0x667088b212ce3d06a1b553a7221E1fD19000d9aF",
        BASE : 1000000000000000000,
        accountsList : "WINGS_accounts",
        from : "from",
        to : "to",
        value: "value"
    },
    ABI: [
        {
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_spender",
                    "type": "address"
                },
                {
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
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
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "MAX_ALLOCATIONS_COUNT",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "releasePremine",
            "outputs": [],
            "payable": false,
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "newOwner",
                    "type": "address"
                }
            ],
            "name": "transferOwner",
            "outputs": [],
            "payable": false,
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
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "DAYS_28",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "accountsToAllocate",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_preminer",
                    "type": "address"
                },
                {
                    "name": "_newPreminer",
                    "type": "address"
                },
                {
                    "name": "_newRecipient",
                    "type": "address"
                }
            ],
            "name": "disablePreminer",
            "outputs": [],
            "payable": false,
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
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "success",
                    "type": "bool"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_preminer",
                    "type": "address"
                },
                {
                    "name": "_time",
                    "type": "uint256"
                }
            ],
            "name": "addPremineAllocation",
            "outputs": [],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_preminer",
                    "type": "address"
                }
            ],
            "name": "getPreminer",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                },
                {
                    "name": "",
                    "type": "bool"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "user",
                    "type": "address"
                },
                {
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "name": "allocate",
            "outputs": [],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "multisignature",
            "outputs": [
                {
                    "name": "",
                    "type": "address"
                }
            ],
            "payable": false,
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
                    "name": "_spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "remaining",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "_preminer",
                    "type": "address"
                },
                {
                    "name": "_index",
                    "type": "uint256"
                }
            ],
            "name": "getPreminerAllocation",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "DAYS_31",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "preminer",
                    "type": "address"
                },
                {
                    "name": "recipient",
                    "type": "address"
                },
                {
                    "name": "initialBalance",
                    "type": "uint256"
                },
                {
                    "name": "monthlyPayment",
                    "type": "uint256"
                }
            ],
            "name": "addPreminer",
            "outputs": [],
            "payable": false,
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "_accountsToAllocate",
                    "type": "uint256"
                },
                {
                    "name": "_multisignature",
                    "type": "address"
                }
            ],
            "payable": false,
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "ALLOCATION",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "PREMINER_ADDED",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "time",
                    "type": "uint256"
                }
            ],
            "name": "PREMINE_ALLOCATION_ADDED",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "account",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "timestamp",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "PREMINE_RELEASE",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "oldPreminer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "newPreminer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "newRecipient",
                    "type": "address"
                }
            ],
            "name": "PREMINER_CHANGED",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
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
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        }
    ]
}
