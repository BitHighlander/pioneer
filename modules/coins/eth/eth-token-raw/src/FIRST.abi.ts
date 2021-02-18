export const FIRST = {
    metaData: {
        contractAddress: "0xAf30D2a7E90d7DC361c8C4585e9BB7D2F6f15bc7",
        BASE: 1000000000000000000,
        accountsList: "1ST_accounts",
        from: "_from",
        to: "_to",
        value: "_value"
    },
    ABI: [{
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [{ "name": "", "type": "string" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "endBlock",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" }],
        "name": "approve",
        "outputs": [{ "name": "success", "type": "bool" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "bountyAllocated",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "signer",
        "outputs": [{ "name": "", "type": "address" }],
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, {
            "name": "_value",
            "type": "uint256"
        }],
        "name": "transferFrom",
        "outputs": [{ "name": "success", "type": "bool" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [{ "name": "blockNumber", "type": "uint256" }],
        "name": "testPrice",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "presaleEtherRaised",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "startBlock",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "allocateBountyAndEcosystemTokens",
        "outputs": [],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "founder",
        "outputs": [{ "name": "", "type": "address" }],
        "type": "function"
    }, { "constant": false, "inputs": [], "name": "halt", "outputs": [], "type": "function" }, {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }],
        "name": "balanceOf",
        "outputs": [{ "name": "balance", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "etherCap",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "ecosystemAllocated",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "founderAllocation",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "founderLockup",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "name": "newFounder", "type": "address" }],
        "name": "changeFounder",
        "outputs": [],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [{ "name": "", "type": "string" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "founderAllocated",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "price",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }],
        "name": "transfer",
        "outputs": [{ "name": "success", "type": "bool" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "halted",
        "outputs": [{ "name": "", "type": "bool" }],
        "type": "function"
    }, {
        "constant": false,
        "inputs": [],
        "name": "allocateFounderTokens",
        "outputs": [],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "ecosystemAllocation",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "transferLockup",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "presaleTokenSupply",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, { "constant": false, "inputs": [], "name": "unhalt", "outputs": [], "type": "function" }, {
        "constant": true,
        "inputs": [{ "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" }],
        "name": "allowance",
        "outputs": [{ "name": "remaining", "type": "uint256" }],
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "name": "recipient", "type": "address" }, { "name": "v", "type": "uint8" }, {
            "name": "r",
            "type": "bytes32"
        }, { "name": "s", "type": "bytes32" }],
        "name": "buyRecipient",
        "outputs": [],
        "type": "function"
    }, {
        "constant": false,
        "inputs": [{ "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" }],
        "name": "buy",
        "outputs": [],
        "type": "function"
    }, {
        "constant": true,
        "inputs": [],
        "name": "bountyAllocation",
        "outputs": [{ "name": "", "type": "uint256" }],
        "type": "function"
    }, {
        "inputs": [{ "name": "founderInput", "type": "address" }, {
            "name": "signerInput",
            "type": "address"
        }, { "name": "startBlockInput", "type": "uint256" }, { "name": "endBlockInput", "type": "uint256" }],
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "name": "sender", "type": "address" }, {
            "indexed": false,
            "name": "eth",
            "type": "uint256"
        }, { "indexed": false, "name": "fbt", "type": "uint256" }],
        "name": "Buy",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "name": "sender", "type": "address" }, {
            "indexed": false,
            "name": "to",
            "type": "address"
        }, { "indexed": false, "name": "eth", "type": "uint256" }],
        "name": "Withdraw",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "name": "sender", "type": "address" }],
        "name": "AllocateFounderTokens",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "name": "sender", "type": "address" }],
        "name": "AllocateBountyAndEcosystemTokens",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "name": "_from", "type": "address" }, {
            "indexed": true,
            "name": "_to",
            "type": "address"
        }, { "indexed": false, "name": "_value", "type": "uint256" }],
        "name": "Transfer",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{ "indexed": true, "name": "_owner", "type": "address" }, {
            "indexed": true,
            "name": "_spender",
            "type": "address"
        }, { "indexed": false, "name": "_value", "type": "uint256" }],
        "name": "Approval",
        "type": "event"
    }]
};
