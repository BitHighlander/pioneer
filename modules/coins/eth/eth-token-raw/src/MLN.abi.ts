export const MLN = {
    metaData:{
        contractAddress: "0xBEB9eF514a379B997e0798FDcC901Ee474B6D9A1",
        BASE : 1000000000000000000,
        accountsList : "MLN_accounts",
        from : "_from",
        to : "_to",
        value: "_value"
    },
    ABI:[{
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "minter",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "newAddress", "type": "address"}],
    "name": "changeMelonportAddress",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "sender", "type": "address"}, {"name": "recipient", "type": "address"}, {
        "name": "amount",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "endTime",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "MAX_TOTAL_TOKEN_AMOUNT_OFFERED_TO_PUBLIC",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "newAddress", "type": "address"}],
    "name": "changeMintingAddress",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "lockedBalanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "startTime",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "recipient", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "mintIcedToken",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "recipient", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "mintLiquidToken",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "MAX_TOTAL_TOKEN_AMOUNT",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "recipient", "type": "address"}, {"name": "amount", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "recipient", "type": "address"}],
    "name": "unlockBalance",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}, {"name": "_spender", "type": "address"}],
    "name": "allowance",
    "outputs": [{"name": "remaining", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "melonport",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "THAWING_DURATION",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "inputs": [{"name": "setMinter", "type": "address"}, {
        "name": "setMelonport",
        "type": "address"
    }, {"name": "setStartTime", "type": "uint256"}, {"name": "setEndTime", "type": "uint256"}],
    "payable": false,
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_from", "type": "address"}, {
        "indexed": true,
        "name": "_to",
        "type": "address"
    }, {"indexed": false, "name": "_value", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_owner", "type": "address"}, {
        "indexed": true,
        "name": "_spender",
        "type": "address"
    }, {"indexed": false, "name": "_value", "type": "uint256"}],
    "name": "Approval",
    "type": "event"
}]}
