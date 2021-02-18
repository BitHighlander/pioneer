export const ANT = {
    metaData :{
        contractAddress:"0x960b236A07cf122663c4303350609A66A7B288C0",
        BASE : 1000000000000000000,
        accountsList : "ANT_accounts",
        from : "from",
        to : "to",
        value: "value"
    },
    ABI:[{
    "constant": false,
    "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}, {
        "name": "_start",
        "type": "uint64"
    }, {"name": "_cliff", "type": "uint64"}, {"name": "_vesting", "type": "uint64"}],
    "name": "grantVestedTokens",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_holder", "type": "address"}],
    "name": "tokenGrantsCount",
    "outputs": [{"name": "index", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_amount", "type": "uint256"}],
    "name": "approve",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_holder", "type": "address"}],
    "name": "spendableBalanceOf",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "creationBlock",
    "outputs": [{"name": "", "type": "uint256"}],
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
    "inputs": [{"name": "_addr", "type": "address"}, {"name": "_allowed", "type": "bool"}],
    "name": "setCanCreateGrants",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_from", "type": "address"}, {"name": "_to", "type": "address"}, {
        "name": "_value",
        "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "", "type": "address"}, {"name": "", "type": "uint256"}],
    "name": "grants",
    "outputs": [{"name": "granter", "type": "address"}, {"name": "value", "type": "uint256"}, {
        "name": "cliff",
        "type": "uint64"
    }, {"name": "vesting", "type": "uint64"}, {"name": "start", "type": "uint64"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [{"name": "", "type": "uint8"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_newController", "type": "address"}],
    "name": "changeController",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}, {"name": "_blockNumber", "type": "uint256"}],
    "name": "balanceOfAt",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "version",
    "outputs": [{"name": "", "type": "string"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "_holder", "type": "address"}, {"name": "_grantId", "type": "uint256"}],
    "name": "tokenGrant",
    "outputs": [{"name": "granter", "type": "address"}, {"name": "value", "type": "uint256"}, {
        "name": "vested",
        "type": "uint256"
    }, {"name": "start", "type": "uint64"}, {"name": "cliff", "type": "uint64"}, {"name": "vesting", "type": "uint64"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_cloneTokenName", "type": "string"}, {
        "name": "_cloneDecimalUnits",
        "type": "uint8"
    }, {"name": "_cloneTokenSymbol", "type": "string"}, {
        "name": "_snapshotBlock",
        "type": "uint256"
    }, {"name": "_transfersEnabled", "type": "bool"}],
    "name": "createCloneToken",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "holder", "type": "address"}],
    "name": "lastTokenIsTransferableDate",
    "outputs": [{"name": "date", "type": "uint64"}],
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
    "name": "parentToken",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_owner", "type": "address"}, {"name": "_amount", "type": "uint256"}],
    "name": "generateTokens",
    "outputs": [{"name": "", "type": "bool"}],
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
    "inputs": [{"name": "_blockNumber", "type": "uint256"}],
    "name": "totalSupplyAt",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_to", "type": "address"}, {"name": "_value", "type": "uint256"}],
    "name": "transfer",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "transfersEnabled",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "parentSnapShotBlock",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_spender", "type": "address"}, {"name": "_amount", "type": "uint256"}, {
        "name": "_extraData",
        "type": "bytes"
    }],
    "name": "approveAndCall",
    "outputs": [{"name": "success", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "holder", "type": "address"}, {"name": "time", "type": "uint64"}],
    "name": "transferableTokens",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_owner", "type": "address"}, {"name": "_amount", "type": "uint256"}],
    "name": "destroyTokens",
    "outputs": [{"name": "", "type": "bool"}],
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
    "name": "tokenFactory",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_holder", "type": "address"}, {"name": "_grantId", "type": "uint256"}],
    "name": "revokeTokenGrant",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_transfersEnabled", "type": "bool"}],
    "name": "enableTransfers",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "controller",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "_newWhitelister", "type": "address"}],
    "name": "changeVestingWhitelister",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "inputs": [{"name": "_tokenFactory", "type": "address"}],
    "payable": false,
    "type": "constructor"
}, {"payable": true, "type": "fallback"}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
        "indexed": true,
        "name": "to",
        "type": "address"
    }, {"indexed": false, "name": "value", "type": "uint256"}, {
        "indexed": false,
        "name": "start",
        "type": "uint64"
    }, {"indexed": false, "name": "cliff", "type": "uint64"}, {"indexed": false, "name": "vesting", "type": "uint64"}],
    "name": "NewTokenGrant",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "_cloneToken", "type": "address"}, {
        "indexed": false,
        "name": "_snapshotBlock",
        "type": "uint256"
    }],
    "name": "NewCloneToken",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "from", "type": "address"}, {
        "indexed": true,
        "name": "to",
        "type": "address"
    }, {"indexed": false, "name": "value", "type": "uint256"}],
    "name": "Transfer",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{"indexed": true, "name": "owner", "type": "address"}, {
        "indexed": true,
        "name": "spender",
        "type": "address"
    }, {"indexed": false, "name": "value", "type": "uint256"}],
    "name": "Approval",
    "type": "event"
}]}
