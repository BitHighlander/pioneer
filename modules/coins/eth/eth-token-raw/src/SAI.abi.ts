export const SAI = {
    metaData: {
        contractAddress: "0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359",
        BASE: 1000000000000000000,
        accountsList: "SAI_accounts",
        from: "src",
        to: "dst",
        value: "wad"
    },
    ABI: [
        {
            "constant": true,
            "inputs": [

            ],
            "name": "name",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [

            ],
            "name": "stop",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "guy",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
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
                    "name": "owner_",
                    "type": "address"
                }
            ],
            "name": "setOwner",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [

            ],
            "name": "totalSupply",
            "outputs": [
                {
                    "name": "",
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
                    "name": "src",
                    "type": "address"
                },
                {
                    "name": "dst",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "name": "",
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

            ],
            "name": "decimals",
            "outputs": [
                {
                    "name": "",
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
                    "name": "guy",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "name_",
                    "type": "bytes32"
                }
            ],
            "name": "setName",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "src",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [

            ],
            "name": "stopped",
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
            "constant": false,
            "inputs": [
                {
                    "name": "authority_",
                    "type": "address"
                }
            ],
            "name": "setAuthority",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [

            ],
            "name": "owner",
            "outputs": [
                {
                    "name": "",
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

            ],
            "name": "symbol",
            "outputs": [
                {
                    "name": "",
                    "type": "bytes32"
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
                    "name": "guy",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "burn",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "mint",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "dst",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "name": "",
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
                    "name": "dst",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "push",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "src",
                    "type": "address"
                },
                {
                    "name": "dst",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "move",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [

            ],
            "name": "start",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [

            ],
            "name": "authority",
            "outputs": [
                {
                    "name": "",
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
                    "name": "guy",
                    "type": "address"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "name": "",
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
                    "name": "src",
                    "type": "address"
                },
                {
                    "name": "guy",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "name": "",
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
                    "name": "src",
                    "type": "address"
                },
                {
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "pull",
            "outputs": [

            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "name": "symbol_",
                    "type": "bytes32"
                }
            ],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "guy",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "Mint",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "guy",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "Burn",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "authority",
                    "type": "address"
                }
            ],
            "name": "LogSetAuthority",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "owner",
                    "type": "address"
                }
            ],
            "name": "LogSetOwner",
            "type": "event"
        },
        {
            "anonymous": true,
            "inputs": [
                {
                    "indexed": true,
                    "name": "sig",
                    "type": "bytes4"
                },
                {
                    "indexed": true,
                    "name": "guy",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "foo",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "name": "bar",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "name": "wad",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "name": "fax",
                    "type": "bytes"
                }
            ],
            "name": "LogNote",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "name": "src",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "guy",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "wad",
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
                    "name": "src",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "name": "dst",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "wad",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        }
    ]
}





