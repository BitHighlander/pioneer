"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NMR = void 0;
exports.NMR = {
    metaData: {
        contractAddress: "0x1776e1F26f98b1A5dF9cD347953a26dd3Cb46671",
        BASE: 1000000000000000000,
        accountsList: "NMR_accounts",
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
            "outputs": [{ "name": "ok", "type": "bool" }],
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
            "constant": true,
            "inputs": [{ "name": "_tournamentID", "type": "uint256" }],
            "name": "getTournament",
            "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256[]" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "transferFrom",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "numerai",
            "outputs": [{ "name": "", "type": "address" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "_addr", "type": "address" }],
            "name": "isOwner",
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
            "constant": true,
            "inputs": [{ "name": "_tournamentID", "type": "uint256" }, { "name": "_roundID", "type": "uint256" }],
            "name": "getRound",
            "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "delegateContract",
            "outputs": [{ "name": "", "type": "address" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "standard",
            "outputs": [{ "name": "", "type": "string" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_tournamentID", "type": "uint256" }, {
                    "name": "_roundID",
                    "type": "uint256"
                }, { "name": "_endTime", "type": "uint256" }, { "name": "_resolutionTime", "type": "uint256" }],
            "name": "createRound",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_staker", "type": "address" }, { "name": "_tag", "type": "bytes32" }, {
                    "name": "_etherValue",
                    "type": "uint256"
                }, { "name": "_tournamentID", "type": "uint256" }, {
                    "name": "_roundID",
                    "type": "uint256"
                }, { "name": "_successful", "type": "bool" }],
            "name": "releaseStake",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "emergencyStop",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_staker", "type": "address" }, { "name": "_value", "type": "uint256" }, {
                    "name": "_tag",
                    "type": "bytes32"
                }, { "name": "_tournamentID", "type": "uint256" }, {
                    "name": "_roundID",
                    "type": "uint256"
                }, { "name": "_confidence", "type": "uint256" }],
            "name": "stakeOnBehalf",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "", "type": "uint256" }],
            "name": "tournaments",
            "outputs": [{ "name": "creationTime", "type": "uint256" }],
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
            "inputs": [{ "name": "_owners", "type": "address[]" }, { "name": "_required", "type": "uint256" }],
            "name": "changeShareable",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "contractUpgradable",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }],
            "name": "numeraiTransfer",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "release",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "_tournamentID", "type": "uint256" }, {
                    "name": "_roundID",
                    "type": "uint256"
                }, { "name": "_staker", "type": "address" }, { "name": "_tag", "type": "bytes32" }],
            "name": "getStake",
            "outputs": [{ "name": "", "type": "uint256" }, { "name": "", "type": "uint256" }, {
                    "name": "",
                    "type": "bool"
                }, { "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "initial_disbursement",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_value", "type": "uint256" }, { "name": "_tag", "type": "bytes32" }, {
                    "name": "_tournamentID",
                    "type": "uint256"
                }, { "name": "_roundID", "type": "uint256" }, { "name": "_confidence", "type": "uint256" }],
            "name": "stake",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_spender", "type": "address" }, {
                    "name": "_oldValue",
                    "type": "uint256"
                }, { "name": "_newValue", "type": "uint256" }],
            "name": "changeApproval",
            "outputs": [{ "name": "ok", "type": "bool" }],
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
            "constant": true,
            "inputs": [],
            "name": "weekly_disbursement",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_value", "type": "uint256" }],
            "name": "mint",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_staker", "type": "address" }, {
                    "name": "_tag",
                    "type": "bytes32"
                }, { "name": "_tournamentID", "type": "uint256" }, { "name": "_roundID", "type": "uint256" }],
            "name": "destroyStake",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "deploy_time",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "disableContractUpgradability",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }],
            "name": "transfer",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_operation", "type": "bytes32" }],
            "name": "revoke",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "stoppable",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "total_minted",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "_operation", "type": "bytes32" }, { "name": "_owner", "type": "address" }],
            "name": "hasConfirmed",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "ownerIndex", "type": "uint256" }],
            "name": "getOwner",
            "outputs": [{ "name": "", "type": "address" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [],
            "name": "disableStopping",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, {
                    "name": "_value",
                    "type": "uint256"
                }],
            "name": "withdraw",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "required",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_tournamentID", "type": "uint256" }],
            "name": "createTournament",
            "outputs": [{ "name": "ok", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "", "type": "address" }, { "name": "", "type": "address" }],
            "name": "allowance",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_token", "type": "address" }],
            "name": "claimTokens",
            "outputs": [],
            "payable": false,
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{ "name": "_newDelegate", "type": "address" }],
            "name": "changeDelegate",
            "outputs": [{ "name": "", "type": "bool" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "supply_cap",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "getMintable",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "type": "function"
        }, {
            "constant": true,
            "inputs": [{ "name": "", "type": "uint256" }],
            "name": "previousDelegates",
            "outputs": [{ "name": "", "type": "address" }],
            "payable": false,
            "type": "function"
        }, {
            "inputs": [{ "name": "_owners", "type": "address[]" }, {
                    "name": "_num_required",
                    "type": "uint256"
                }, { "name": "_initial_disbursement", "type": "uint256" }], "payable": false, "type": "constructor"
        }, { "payable": true, "type": "fallback" }, {
            "anonymous": false,
            "inputs": [{ "indexed": false, "name": "oldAddress", "type": "address" }, {
                    "indexed": false,
                    "name": "newAddress",
                    "type": "address"
                }],
            "name": "DelegateChanged",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": false, "name": "value", "type": "uint256" }],
            "name": "Mint",
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
            "inputs": [{ "indexed": true, "name": "staker", "type": "address" }, {
                    "indexed": false,
                    "name": "tag",
                    "type": "bytes32"
                }, { "indexed": false, "name": "totalAmountStaked", "type": "uint256" }, {
                    "indexed": false,
                    "name": "confidence",
                    "type": "uint256"
                }, { "indexed": true, "name": "tournamentID", "type": "uint256" }, {
                    "indexed": true,
                    "name": "roundID",
                    "type": "uint256"
                }],
            "name": "Staked",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "tournamentID", "type": "uint256" }, {
                    "indexed": true,
                    "name": "roundID",
                    "type": "uint256"
                }, { "indexed": false, "name": "endTime", "type": "uint256" }, {
                    "indexed": false,
                    "name": "resolutionTime",
                    "type": "uint256"
                }],
            "name": "RoundCreated",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "tournamentID", "type": "uint256" }],
            "name": "TournamentCreated",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "tournamentID", "type": "uint256" }, {
                    "indexed": true,
                    "name": "roundID",
                    "type": "uint256"
                }, { "indexed": true, "name": "stakerAddress", "type": "address" }, {
                    "indexed": false,
                    "name": "tag",
                    "type": "bytes32"
                }],
            "name": "StakeDestroyed",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": true, "name": "tournamentID", "type": "uint256" }, {
                    "indexed": true,
                    "name": "roundID",
                    "type": "uint256"
                }, { "indexed": true, "name": "stakerAddress", "type": "address" }, {
                    "indexed": false,
                    "name": "tag",
                    "type": "bytes32"
                }, { "indexed": false, "name": "etherReward", "type": "uint256" }],
            "name": "StakeReleased",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": false, "name": "owner", "type": "address" }, {
                    "indexed": false,
                    "name": "operation",
                    "type": "bytes32"
                }],
            "name": "Confirmation",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{ "indexed": false, "name": "owner", "type": "address" }, {
                    "indexed": false,
                    "name": "operation",
                    "type": "bytes32"
                }],
            "name": "Revoke",
            "type": "event"
        }]
};
