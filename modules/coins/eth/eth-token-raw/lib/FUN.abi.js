"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FUN = void 0;
exports.FUN = {
    metaData: {
        contractAddress: "0x419d0d8bdd9af5e606ae2232ed285aff190e711b",
        BASE: 100000000,
        accountsList: "FUN_accounts",
        from: "from",
        to: "to",
        value: "value"
    },
    ABI: [{
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }],
            "name": "approve",
            "outputs": [{ "name": "success", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "multilocked",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "transferFrom",
            "outputs": [{ "name": "success", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{ "name": "", "type": "uint8" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_amount", "type": "uint256" }],
            "name": "burn",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "finalize",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "bits", "type": "uint256[]" }],
            "name": "multiApprove",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "motd",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_m", "type": "string" }],
            "name": "setMotd",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_subtractedValue", "type": "uint256" }],
            "name": "decreaseApproval",
            "outputs": [{ "name": "success", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_token", "type": "address" }, { "name": "_to", "type": "address" }],
            "name": "claimTokens",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "a", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "acceptOwnership",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "lockMultis",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "owner",
            "outputs": [{ "name": "", "type": "address" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "controllerApprove",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_c", "type": "address" }],
            "name": "setController",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "controllerTransfer",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_newOwner", "type": "address" }],
            "name": "changeOwner",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }],
            "name": "transfer",
            "outputs": [{ "name": "success", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "bits", "type": "uint256[]" }],
            "name": "multiTransfer",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "finalized",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_addedValue", "type": "uint256" }],
            "name": "increaseApproval",
            "outputs": [{ "name": "success", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }],
            "name": "allowance",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": false, "name": "message", "type": "string" }],
            "name": "Motd",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "from", "type": "address" }, {
                    "indexed": true,
                    "name": "to",
                    "type": "address"
                }, { "indexed": false, "name": "value", "type": "uint256" }],
            "name": "Transfer",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "owner", "type": "address" }, {
                    "indexed": true,
                    "name": "spender",
                    "type": "address"
                }, { "indexed": false, "name": "value", "type": "uint256" }],
            "name": "Approval",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": false, "name": "token", "type": "address" }, {
                    "indexed": false,
                    "name": "to",
                    "type": "address"
                }, { "indexed": false, "name": "amount", "type": "uint256" }],
            "name": "logTokenTransfer",
            "type": "event"
        }]
};
