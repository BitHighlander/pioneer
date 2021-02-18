"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEESH = void 0;
exports.MEESH = {
    metaData: {
        contractAddress: "0xadd4a0dd63e08f5874762e647ad8cd4dc26c9724",
        BASE: 100000000,
        accountsList: "MEESH_accounts",
        from: "_from",
        to: "_to",
        value: "_value"
    },
    ABI: [{
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{
                    "name": "",
                    "type": "string"
                }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                    "name": "_spender",
                    "type": "address"
                }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "approve",
            "outputs": [{
                    "name": "success",
                    "type": "bool"
                }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{
                    "name": "",
                    "type": "uint256"
                }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                    "name": "_from",
                    "type": "address"
                }, {
                    "name": "_to",
                    "type": "address"
                }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "transferFrom",
            "outputs": [{
                    "name": "success",
                    "type": "bool"
                }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{
                    "name": "",
                    "type": "uint8"
                }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "version",
            "outputs": [{
                    "name": "",
                    "type": "string"
                }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                    "name": "_owner",
                    "type": "address"
                }],
            "name": "balanceOf",
            "outputs": [{
                    "name": "balance",
                    "type": "uint256"
                }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{
                    "name": "",
                    "type": "string"
                }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                    "name": "_to",
                    "type": "address"
                }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "transfer",
            "outputs": [{
                    "name": "success",
                    "type": "bool"
                }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{
                    "name": "_spender",
                    "type": "address"
                }, {
                    "name": "_value",
                    "type": "uint256"
                }, {
                    "name": "_extraData",
                    "type": "bytes"
                }],
            "name": "approveAndCall",
            "outputs": [{
                    "name": "success",
                    "type": "bool"
                }],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{
                    "name": "_owner",
                    "type": "address"
                }, {
                    "name": "_spender",
                    "type": "address"
                }],
            "name": "allowance",
            "outputs": [{
                    "name": "remaining",
                    "type": "uint256"
                }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "fallback"
        }, {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "name": "_from",
                    "type": "address"
                }, {
                    "indexed": true,
                    "name": "_to",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                    "indexed": true,
                    "name": "_owner",
                    "type": "address"
                }, {
                    "indexed": true,
                    "name": "_spender",
                    "type": "address"
                }, {
                    "indexed": false,
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "Approval",
            "type": "event"
        }]
};
