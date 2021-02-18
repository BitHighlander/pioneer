"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EOS = void 0;
exports.EOS = {
    metaData: {
        contractAddress: "0x86Fa049857E0209aa7D9e616F7eb3b3B78ECfdb0",
        BASE: 1000000000000000000,
        accountsList: "EOS_accounts",
        from: "from",
        to: "to",
        value: "value"
    },
    ABI: [{
            "constant": true,
            "inputs": [],
            "name": "name",
            "outputs": [{ "name": "", "type": "bytes32" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "stop",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "guy", "type": "address" }, { "name": "wad", "type": "uint256" }],
            "name": "approve",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "owner_", "type": "address" }],
            "name": "setOwner",
            "outputs": [],
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
            "inputs": [{ "name": "src", "type": "address" }, { "name": "dst", "type": "address" }, {
                    "name": "wad",
                    "type": "uint256"
                }],
            "name": "transferFrom",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "decimals",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint128" }],
            "name": "push",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "name_", "type": "bytes32" }],
            "name": "setName",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "wad", "type": "uint128" }],
            "name": "mint",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "src", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "stopped",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "authority_", "type": "address" }],
            "name": "setAuthority",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "src", "type": "address" }, { "name": "wad", "type": "uint128" }],
            "name": "pull",
            "outputs": [{ "name": "", "type": "bool" }],
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
            "inputs": [{ "name": "wad", "type": "uint128" }],
            "name": "burn",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "symbol",
            "outputs": [{ "name": "", "type": "bytes32" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "dst", "type": "address" }, { "name": "wad", "type": "uint256" }],
            "name": "transfer",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "start",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "authority",
            "outputs": [{ "name": "", "type": "address" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "src", "type": "address" }, { "name": "guy", "type": "address" }],
            "name": "allowance",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "inputs": [{ "name": "symbol_", "type": "bytes32" }],
            "payable": false,
            "type": "constructor"
        }, {
            "anonymous": true,
            "inputs": [{ "indexed": true, "name": "sig", "type": "bytes4" }, {
                    "indexed": true,
                    "name": "guy",
                    "type": "address"
                }, { "indexed": true, "name": "foo", "type": "bytes32" }, {
                    "indexed": true,
                    "name": "bar",
                    "type": "bytes32"
                }, { "indexed": false, "name": "wad", "type": "uint256" }, { "indexed": false, "name": "fax", "type": "bytes" }],
            "name": "LogNote",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "authority", "type": "address" }],
            "name": "LogSetAuthority",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "owner", "type": "address" }],
            "name": "LogSetOwner",
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
        }]
};
