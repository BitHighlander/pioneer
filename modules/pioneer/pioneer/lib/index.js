"use strict";
/*

    Pioneer Wallet v2

    Class based wallet development

 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HDWALLETS = exports.AuthProviders = void 0;
var TAG = " | Pioneer | ";
var log = require("@pioneer-platform/loggerdog")();
//TODO remove this dep
var cryptoTools = require('crypto');
var tokenData = require("@pioneer-platform/pioneer-eth-token-data");
var crypto = require("@pioneer-platform/utxo-crypto");
var ripemd160 = require("crypto-js/ripemd160");
var CryptoJS = require("crypto-js");
var sha256 = require("crypto-js/sha256");
var bech32 = require("bech32");
var bitcoin = require("bitcoinjs-lib");
var ethUtils = require('ethereumjs-util');
var prettyjson = require('prettyjson');
var coinSelect = require('coinselect');
var keccak256 = require('keccak256');
var bchaddr = require('bchaddrjs');
//coin crypto modules
var ethCrypto = require("@pioneer-platform/eth-crypto");
var coincap = require("@pioneer-platform/coincap");
//All paths
//TODO make paths adjustable!
var _a = require('@pioneer-platform/pioneer-coins'), getPaths = _a.getPaths, nativeToBaseAmount = _a.nativeToBaseAmount, baseAmountToNative = _a.baseAmountToNative, UTXO_COINS = _a.UTXO_COINS, getNativeAssetForBlockchain = _a.getNativeAssetForBlockchain;
//support
var support = __importStar(require("./support"));
var web3_utils_1 = require("web3-utils");
var fiosdk_offline_1 = require("fiosdk-offline");
//Pioneer follows OpenAPI spec
var network = require("@pioneer-platform/pioneer-client");
//pioneer
var hdwallet_core_1 = require("@bithighlander/hdwallet-core");
//Highlander fork
var hdwallet = require("@bithighlander/hdwallet-core");
var pioneer = require("@bithighlander/hdwallet-native");
// SS public TODO catch up public repo
// const hdwallet = require("@shapeshiftoss/hdwallet-core")
// const pioneer = require("@shapeshiftoss/hdwallet-native")
//global
var keyring = new hdwallet.Keyring();
// let WALLET_BALANCES:any = {}
// let WALLET_MODE:any
var WALLET_COINS = [];
//eth token info
WALLET_COINS.push('ETH');
//TODO support coinlist (coingecko)
for (var i = 0; i < tokenData.tokens.length; i++) {
    var token = tokenData.tokens[i];
    WALLET_COINS.push(token);
}
// COINS
WALLET_COINS.push('RUNE');
WALLET_COINS.push('BNB');
WALLET_COINS.push('ATOM');
WALLET_COINS.push('EOS');
WALLET_COINS.push('FIO');
//TODO BNB tokens
//TODO type paths
//TODO MOVEME coins module
var HD_RUNE_KEYPATH = "m/44'/931'/0'/0/0";
var RUNE_CHAIN = "thorchain";
var RUNE_BASE = 100000000;
var RUNE_TX_FEE = "100";
var RUNE_MAX_GAS = "100000";
var HD_ATOM_KEYPATH = "m/44'/118'/0'/0/0";
var ATOM_CHAIN = "cosmoshub-4";
var ATOM_BASE = 1000000;
var ATOM_TX_FEE = "100";
var ATOM_MAX_GAS = "100000";
var HD_BNB_KEYPATH = "44'/714'/0'/0/";
var BNB_ASSET_SYMBOL = "BNB";
var BNB_CHAIN = "";
var BNB_MAX_GAS = "100000";
var BNB_TX_FEE = "100";
var BNB_BASE = 100000000;
var HD_EOS_KEYPATH = "44'/194'/0'/0/";
var EOS_ASSET_SYMBOL = "EOS";
var EOS_CHAIN = "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906";
var EOS_MAX_GAS = "100000";
var EOS_TX_FEE = "100";
var EOS_BASE = 1000;
var AuthProviders;
(function (AuthProviders) {
    AuthProviders["shapeshift"] = "shapeshift";
    AuthProviders["bitcoin"] = "bitcoin";
})(AuthProviders = exports.AuthProviders || (exports.AuthProviders = {}));
var HDWALLETS;
(function (HDWALLETS) {
    HDWALLETS[HDWALLETS["pioneer"] = 0] = "pioneer";
    HDWALLETS[HDWALLETS["trezor"] = 1] = "trezor";
    HDWALLETS[HDWALLETS["keepkey"] = 2] = "keepkey";
    HDWALLETS[HDWALLETS["ledger"] = 3] = "ledger";
    HDWALLETS[HDWALLETS["metamask"] = 4] = "metamask";
})(HDWALLETS = exports.HDWALLETS || (exports.HDWALLETS = {}));
//note: must match api!
// interface BroadcastBody {
//     coin?:string
//     serialized:string
//     type?:string
//     broadcastBody?:any,
//     txid?:string
//     dscription?:any
//     invocationId?:string
// }
function bech32ify(address, prefix) {
    var words = bech32.toWords(address);
    return bech32.encode(prefix, words);
}
function createBech32Address(publicKey, prefix) {
    var message = CryptoJS.enc.Hex.parse(publicKey.toString("hex"));
    var hash = ripemd160(sha256(message)).toString();
    var address = Buffer.from(hash, "hex");
    var cosmosAddress = bech32ify(address, prefix);
    return cosmosAddress;
}
module.exports = /** @class */ (function () {
    function wallet(type, config, isTestnet) {
        this.PUBLIC_WALLET = {};
        this.PRIVATE_WALLET = {};
        //if(config.isTestnet) isTestnet = true
        this.APPROVE_QUEUE = [];
        this.PENDING_QUEUE = [];
        this.isTestnet = false;
        this.offline = false; //TODO supportme
        this.mode = config.mode;
        this.context = config.context;
        this.queryKey = config.queryKey;
        this.username = config.username;
        this.pioneerApi = config.pioneerApi;
        this.blockchains = config.blockchains;
        this.WALLET_BALANCES = {};
        this.type = type;
        this.spec = config.spec;
        this.mnemonic = config.mnemonic;
        this.auth = config.auth;
        this.authProvider = config.authProvider;
        this.bip32ToAddressNList = function (path) {
            return hdwallet_core_1.bip32ToAddressNList(path);
        };
        this.setMnemonic = function () {
            return this.mnemonic;
        };
        this.init = function (wallet) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, paths, _a, pioneerAdapter, _b, isTestnet_1, _loop_1, this_1, i, _c, _loop_2, this_2, i, blockchainsEnabled, i, pubkey, nativeAsset, i, pubkey, _d, _e, _f, _g, _h, register, regsiterResponse, walletInfo, coins, i, coin, balance, e_1;
                return __generator(this, function (_j) {
                    switch (_j.label) {
                        case 0:
                            tag = TAG + " | init_wallet | ";
                            _j.label = 1;
                        case 1:
                            _j.trys.push([1, 21, , 22]);
                            if (!this.blockchains && !wallet.blockchains)
                                throw Error("Must Specify blockchain support! ");
                            log.debug(tag, "checkpoint");
                            paths = getPaths(this.blockchains);
                            _a = +HDWALLETS[this.type];
                            switch (_a) {
                                case HDWALLETS.pioneer: return [3 /*break*/, 2];
                                case HDWALLETS.keepkey: return [3 /*break*/, 6];
                                case HDWALLETS.metamask: return [3 /*break*/, 12];
                            }
                            return [3 /*break*/, 13];
                        case 2:
                            pioneerAdapter = pioneer.NativeAdapter.useKeyring(keyring);
                            log.debug(tag, "checkpoint", " pioneer wallet detected! ");
                            if (!config.mnemonic && !wallet && !config.context)
                                throw Error("102: mnemonic or wallet file or context required! ");
                            if (config.mnemonic && config.wallet)
                                throw Error("103: wallet collision! invalid config! ");
                            log.debug(tag, "isTestnet: ", this.isTestnet);
                            //pair
                            _b = this;
                            return [4 /*yield*/, pioneerAdapter.pairDevice(config.username)];
                        case 3:
                            //pair
                            _b.WALLET = _j.sent();
                            return [4 /*yield*/, this.WALLET.loadDevice({ mnemonic: config.mnemonic, isTestnet: this.isTestnet })
                                //verify testnet
                            ];
                        case 4:
                            _j.sent();
                            isTestnet_1 = false;
                            log.debug(tag, "hdwallet isTestnet: ", isTestnet_1);
                            log.info(tag, "paths: ", paths.length);
                            log.info(tag, "blockchains: ", this.blockchains);
                            _loop_1 = function (i) {
                                var blockchain = this_1.blockchains[i];
                                log.debug(tag, "blockchain: ", blockchain);
                                //find blockchain in path
                                var isFound = paths.find(function (path) {
                                    return path.blockchain === blockchain;
                                });
                                if (!isFound) {
                                    throw Error("Failed to find path for blockchain: " + blockchain);
                                }
                            };
                            this_1 = this;
                            //verify paths for each enabled blockchain
                            for (i = 0; i < this.blockchains.length; i++) {
                                _loop_1(i);
                            }
                            log.info(tag, "Checkpoint valid paths ** ");
                            _c = this;
                            return [4 /*yield*/, this.WALLET.getPublicKeys(paths)];
                        case 5:
                            _c.pubkeys = _j.sent();
                            log.debug("pubkeys ", JSON.stringify(this.pubkeys));
                            _loop_2 = function (i) {
                                var blockchain = this_2.blockchains[i];
                                //find blockchain in path
                                var isFound = this_2.pubkeys.find(function (pubkey) {
                                    return pubkey.blockchain == blockchain;
                                });
                                if (!isFound) {
                                    throw Error("Failed to find path for blockchain: " + blockchain);
                                }
                            };
                            this_2 = this;
                            //verify pubkey for each blockchain
                            for (i = 0; i < this.blockchains.length; i++) {
                                _loop_2(i);
                            }
                            log.info(tag, "Checkpoint valid pubkeys ** ");
                            //TODO verify hdwallet init successfull
                            log.debug("pubkeys ", this.pubkeys);
                            log.debug("pubkeys.length ", this.pubkeys.length);
                            log.debug("paths.length ", paths.length);
                            log.debug("blockchainsEnabled: ", this.blockchains.length);
                            blockchainsEnabled = this.blockchains.length;
                            for (i = 0; i < this.pubkeys.length; i++) {
                                pubkey = this.pubkeys[i];
                                log.debug(tag, "pubkey: ", pubkey);
                                if (!pubkey)
                                    throw Error("empty pubkey!");
                                if (!pubkey.symbol) {
                                    nativeAsset = getNativeAssetForBlockchain(pubkey.blockchain);
                                    if (!nativeAsset)
                                        throw Error("102: blockchain not supported by coins module!  " + pubkey.blockchain);
                                    pubkey.symbol = nativeAsset;
                                }
                                // if(isTestnet && pubkey.xpub && !pubkey.tpub){
                                //     pubkey.tpub = await crypto.xpubConvert(pubkey.xpub,'tpub')
                                // }
                                this.PUBLIC_WALLET[pubkey.symbol] = pubkey;
                            }
                            return [3 /*break*/, 14];
                        case 6:
                            log.debug(tag, " Keepkey mode! ");
                            if (!config.wallet)
                                throw Error("Config is missing watch wallet!");
                            if (!config.wallet.WALLET_PUBLIC)
                                throw Error("Config watch wallet missing WALLET_PUBLIC!");
                            if (!config.wallet.pubkeys)
                                throw Error("Config watch wallet missing pubkeys!");
                            //load wallet from keepkey
                            this.WALLET = wallet;
                            log.debug(tag, "IN paths: ", paths);
                            //TODO why this no worky
                            // this.pubkeys = await this.WALLET.getPublicKeys(paths)
                            this.pubkeys = config.wallet.pubkeys;
                            log.debug("pubkeys ", JSON.stringify(this.pubkeys));
                            log.debug("pubkeys.length ", this.pubkeys.length);
                            log.debug("paths.length ", paths.length);
                            i = 0;
                            _j.label = 7;
                        case 7:
                            if (!(i < this.pubkeys.length)) return [3 /*break*/, 11];
                            pubkey = this.pubkeys[i];
                            log.debug(tag, "pubkey: ", pubkey);
                            if (!pubkey)
                                throw Error("empty pubkey!");
                            if (!pubkey.symbol) {
                                log.debug("pubkey: ", pubkey);
                                throw Error("Invalid pubkey!");
                            }
                            if (!(this.isTestnet && pubkey.xpub && !pubkey.tpub)) return [3 /*break*/, 9];
                            _d = pubkey;
                            return [4 /*yield*/, crypto.xpubConvert(pubkey.xpub, 'tpub')];
                        case 8:
                            _d.tpub = _j.sent();
                            _j.label = 9;
                        case 9:
                            this.PUBLIC_WALLET[pubkey.symbol] = pubkey;
                            _j.label = 10;
                        case 10:
                            i++;
                            return [3 /*break*/, 7];
                        case 11:
                            log.debug("this.PUBLIC_WALLET", this.PUBLIC_WALLET);
                            return [3 /*break*/, 14];
                        case 12:
                            log.debug(tag, " metamask mode! ");
                            if (!config.wallet)
                                throw Error("Config is missing watch wallet!");
                            if (!config.wallet.WALLET_PUBLIC)
                                throw Error("Config watch wallet missing WALLET_PUBLIC!");
                            this.PUBLIC_WALLET = config.wallet.WALLET_PUBLIC;
                            if (!config.pubkeys)
                                throw Error("Config watch wallet missing pubkeys!");
                            this.pubkeys = config.pubkeys;
                            return [3 /*break*/, 14];
                        case 13: throw Error("108: WALLET not yet supported! " + type + " valid: " + HDWALLETS);
                        case 14:
                            if (!this.pubkeys)
                                throw Error("103: failed to init wallet! missing pubkeys!");
                            if (!this.pioneerApi) return [3 /*break*/, 19];
                            if (!this.spec)
                                throw Error("102:  Api spec required! ");
                            if (!this.queryKey)
                                throw Error("102:  queryKey required! ");
                            this.pioneer = new network(config.spec, {
                                queryKey: config.queryKey
                            });
                            _e = this;
                            return [4 /*yield*/, this.pioneer.init(config.spec, {
                                    queryKey: config.queryKey
                                })];
                        case 15:
                            _e.pioneerClient = _j.sent();
                            _g = (_f = log).debug;
                            _h = ["baseUrl: "];
                            return [4 /*yield*/, this.pioneerClient.getBaseURL()];
                        case 16:
                            _g.apply(_f, _h.concat([_j.sent()]));
                            register = {
                                isTestnet: false,
                                username: this.username,
                                blockchains: this.blockchains,
                                walletName: this.context,
                                data: {
                                    pubkeys: this.pubkeys
                                },
                                queryKey: this.queryKey,
                                auth: this.auth,
                                provider: 'bitcoin'
                            };
                            log.debug("registerBody: ", register);
                            log.debug("this.pioneerClient: ", this.pioneerClient);
                            return [4 /*yield*/, this.pioneerClient.instance.Register(null, register)];
                        case 17:
                            regsiterResponse = _j.sent();
                            log.debug("regsiterResponse: ", regsiterResponse);
                            log.info(tag, "getting info on context: ", this.context);
                            return [4 /*yield*/, this.getInfo(this.context)];
                        case 18:
                            walletInfo = _j.sent();
                            log.info(tag, "walletInfo: ", walletInfo);
                            //validate info
                            log.debug("walletInfo: ", walletInfo);
                            if (walletInfo && walletInfo.balances) {
                                coins = Object.keys(walletInfo.balances);
                                for (i = 0; i < coins.length; i++) {
                                    coin = coins[i];
                                    balance = walletInfo.balances[coin];
                                    this.WALLET_BALANCES[coin] = balance;
                                }
                            }
                            if (walletInfo && walletInfo.balances)
                                this.WALLET_BALANCES = walletInfo.balances;
                            //emitter.info = walletInfo
                            return [2 /*return*/, walletInfo];
                        case 19:
                            log.debug(tag, "Offline mode!");
                            _j.label = 20;
                        case 20: return [3 /*break*/, 22];
                        case 21:
                            e_1 = _j.sent();
                            log.error(tag, e_1);
                            throw e_1;
                        case 22: return [2 /*return*/];
                    }
                });
            });
        };
        this.paths = function (format) {
            var tag = TAG + " | get_paths | ";
            try {
                var output = [];
                if (format === 'keepkey') {
                    var paths = getPaths(this.blockchains);
                    for (var i = 0; i < paths.length; i++) {
                        var path = paths[i];
                        var pathForKeepkey = {};
                        //send coin as bitcoin
                        pathForKeepkey.symbol = path.symbol;
                        pathForKeepkey.addressNList = path.addressNList;
                        //why
                        pathForKeepkey.coin = 'Bitcoin';
                        pathForKeepkey.script_type = 'p2pkh';
                        output.push(pathForKeepkey);
                    }
                }
                else {
                    var paths = getPaths(this.blockchains);
                    output = paths;
                }
                return output;
            }
            catch (e) {
                log.error(tag, "e: ", e);
            }
        };
        // this.normalizePubkeys = function (format:string,pubkeys:any,paths:any) {
        //     return normalize_pubkeys(format,pubkeys,paths)
        // }
        this.forget = function () {
            return this.pioneerClient.instance.Forget();
        };
        // this.coins = function () {
        //     return WALLET_COINS;
        // }
        this.getInfo = function (walletId) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, walletInfo, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tag = TAG + " | getInfo | ";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            walletInfo = {};
                            if (!!this.offline) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.pioneerClient.instance.Info(walletId)];
                        case 2:
                            //query api
                            walletInfo = _a.sent();
                            log.debug(tag, "walletInfo: ", walletInfo);
                            _a.label = 3;
                        case 3: return [2 /*return*/, walletInfo.data];
                        case 4:
                            e_2 = _a.sent();
                            log.error(tag, "e: ", e_2);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        };
        this.getBalance = function (coin) {
            return this.WALLET_BALANCES[coin] || 0;
        };
        this.getMasterOfSeed = function (mnemonic, coin) {
            return __awaiter(this, void 0, void 0, function () {
                var wallet;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, ethCrypto.generateWalletFromSeed(mnemonic)];
                        case 1:
                            wallet = _a.sent();
                            return [2 /*return*/, wallet.masterAddress];
                    }
                });
            });
        };
        this.getBalanceRemote = function (coin, address) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, output, pubkey, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tag = TAG + " | getBalance | ";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 10, , 11]);
                            log.debug("coin detected: ", coin);
                            output = void 0;
                            pubkey = void 0;
                            if (!(coin === "ETH")) return [3 /*break*/, 3];
                            log.debug("ETH detected ");
                            return [4 /*yield*/, this.PUBLIC_WALLET[coin].master];
                        case 2:
                            pubkey = _a.sent();
                            return [3 /*break*/, 8];
                        case 3:
                            if (!(tokenData.tokens.indexOf(coin) >= 0 && coin !== 'EOS')) return [3 /*break*/, 5];
                            log.debug("token detected ");
                            return [4 /*yield*/, this.getMaster('ETH')];
                        case 4:
                            pubkey = _a.sent();
                            return [3 /*break*/, 8];
                        case 5:
                            if (!(UTXO_COINS.indexOf(coin) >= 0)) return [3 /*break*/, 6];
                            //get xpub/zpub
                            pubkey = this.PUBLIC_WALLET[coin].pubkey;
                            return [3 /*break*/, 8];
                        case 6: return [4 /*yield*/, this.PUBLIC_WALLET[coin].master];
                        case 7:
                            pubkey = _a.sent();
                            _a.label = 8;
                        case 8:
                            log.debug(tag, "pubkey: ", pubkey);
                            return [4 /*yield*/, this.pioneerClient.instance.GetPubkeyBalance({ coin: coin, pubkey: pubkey })];
                        case 9:
                            output = _a.sent();
                            output = output.data;
                            return [2 /*return*/, output];
                        case 10:
                            e_3 = _a.sent();
                            log.error(tag, "e: ", e_3);
                            throw e_3;
                        case 11: return [2 /*return*/];
                    }
                });
            });
        };
        // /*
        //     Verify Balance locally
        //     Dont trust remote
        // */
        // this.getBalanceAudit = function (coin:string) {
        //     return get_balance_audit(coin);
        // }
        // /*
        //     EOS commands
        //  */
        // this.getEosPubkey = function () {
        //     return get_eos_pubkey();
        // }
        // this.getEosAccountsByPubkey = function (pubkey:string) {
        //     return get_eos_account_by_pubkey(pubkey);
        // }
        // this.validateEosUsername = function (username:string) {
        //     return validate_EOS_username(username);
        // }
        // this.registerEosUsername = function (pubkey:string,username:string) {
        //     return register_eos_username(pubkey,username);
        // }
        /*
            Queue
                Unsigned tx's (ready to be reviewed approves)
                Pending (broadcasted/unconfirmed, but available for replacement)
         */
        this.getApproveQueue = function () {
            return this.APPROVE_QUEUE;
        };
        this.getPendingQueue = function () {
            return this.PENDING_QUEUE;
        };
        this.getNextReview = function () {
            return this.APPROVE_QUEUE.shift();
        };
        this.addUnsigned = function (unsigned) {
            return this.APPROVE_QUEUE.push(unsigned);
        };
        this.addBroadcasted = function (signed) {
            return this.PENDING_QUEUE.push(signed);
        };
        /*
        FIO commands
         */
        this.getFioPubkey = function () {
            return this.PUBLIC_WALLET['FIO'].pubkey;
        };
        this.getFioAccountInfo = function (username) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pioneerClient.instance.GetFioAccountInfo(username)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result.data];
                    }
                });
            });
        };
        this.getFioAccountsByPubkey = function (pubkey) {
            return __awaiter(this, void 0, void 0, function () {
                var accounts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pioneerClient.instance.AccountsFromFioPubkey(pubkey)];
                        case 1:
                            accounts = _a.sent();
                            return [2 /*return*/, accounts.data];
                    }
                });
            });
        };
        //getPaymentRequests
        this.getPaymentRequests = function () {
            return __awaiter(this, void 0, void 0, function () {
                var accounts;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.pioneerClient.instance.GetPaymentRequests(this.PUBLIC_WALLET['FIO'].pubkey)];
                        case 1:
                            accounts = _a.sent();
                            return [2 /*return*/, accounts.data];
                    }
                });
            });
        };
        this.fioEncryptRequestContent = function (content) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.WALLET.fioEncryptRequestContent(content)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        //fioDecryptRequestContent
        this.fioDecryptRequestContent = function (content) {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.WALLET.fioDecryptRequestContent(content)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, result];
                    }
                });
            });
        };
        // this.validateFioUsername = async function (username:string) {
        //     let result = await this.pioneerClient.instance.ValidateFioUsername(username)
        //     return result
        // }
        // this.registerFioUsername = function (pubkey:string,username:string) {
        //     return register_fio_username(pubkey,username);
        // }
        // /*
        //     Staking assets
        //  */
        // this.getStakes = function (coin:string) {
        //     return get_staking_positions(coin);
        // }
        // this.getBalances = function () {
        //     return get_balances();
        // }
        this.getMaster = function (coin) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, output;
                return __generator(this, function (_a) {
                    tag = TAG + " | get_address_master | ";
                    try {
                        if (!coin)
                            throw Error("101: must pass coin!");
                        if (this.PUBLIC_WALLET[coin]) {
                            output = this.PUBLIC_WALLET[coin].address;
                            return [2 /*return*/, output];
                        }
                        else {
                            return [2 /*return*/, "Not found!"];
                        }
                    }
                    catch (e) {
                        log.error(tag, "e: ", e);
                    }
                    return [2 /*return*/];
                });
            });
        };
        this.getAddress = function (coin, account, index, isChange) {
            var tag = TAG + " | get_address | ";
            try {
                var output 
                //if token use ETH pubkey
                = void 0;
                //if token use ETH pubkey
                if (tokenData.tokens.indexOf(coin) >= 0 && coin !== 'EOS') {
                    coin = 'ETH';
                }
                //if xpub get next unused
                if (!this.PUBLIC_WALLET[coin]) {
                    log.error(tag, "PUBLIC_WALLET: ", this.PUBLIC_WALLET);
                    throw Error("102: coin not in this.PUBLIC_WALLET! coin:" + coin);
                }
                if (this.PUBLIC_WALLET[coin].type === 'xpub') {
                    //get pubkey at path
                    var publicKey = bitcoin.bip32.fromBase58(this.PUBLIC_WALLET[coin].pubkey).derive(account).derive(index).publicKey;
                    log.debug("publicKey: ********* ", publicKey);
                    switch (coin) {
                        case 'ETH':
                            output = ethUtils.bufferToHex(ethUtils.pubToAddress(publicKey, true));
                            break;
                        case 'RUNE':
                            // code block
                            if (this.isTestnet) {
                                output = createBech32Address(publicKey, 'tthor');
                            }
                            else {
                                output = createBech32Address(publicKey, 'thor');
                            }
                            break;
                        case 'ATOM':
                            // code block
                            output = createBech32Address(publicKey, 'cosmos');
                            break;
                        case 'BNB':
                            // code block
                            output = createBech32Address(publicKey, 'bnb');
                            break;
                        case 'EOS':
                        // log.debug(tag,"pubkey: ",publicKey)
                        //
                        // let account = this.pioneerClient.instance.Balance(null,publicKey)
                        // log.debug(tag,"account: ",account)
                        // //get accounts for pubkey
                        // output = 'fixmebro'
                        // break;
                        case 'FIO':
                            log.debug(tag, "pubkey: ", publicKey);
                            var accountFio = this.pioneerClient.instance.GetFioAccount(publicKey);
                            log.debug(tag, "accountFio: ", accountFio);
                            //get accounts for pubkey
                            output = accountFio;
                            break;
                        default:
                            throw Error("coin not yet implemented ! ");
                        // code block
                    }
                    log.debug(tag, "output: ", output);
                }
                else {
                    output = this.PUBLIC_WALLET[coin].master || this.PUBLIC_WALLET[coin].pubkey;
                }
                return output;
            }
            catch (e) {
                log.error(tag, "e: ", e);
            }
        };
        // this.getAddressByPath = function (coin:string,path:string) {
        //     return get_address_by_path(coin,path);
        // }
        // this.getNewAddress = function (coin:string) {
        //     return get_new_address(coin);
        // }
        // this.listSinceLastblock = function (coin:string,block:string) {
        //     return list_since_block(coin,block);
        // }
        // this.getTransaction = function (coin:string,txid:string) {
        //     return get_transaction(coin,txid);
        // }
        // this.getTransactions = function (coin:string,params:any) {
        //     return get_transactions(coin,params)
        // }
        // /*
        //     Txs
        //
        //     3 type:
        //         Transfers
        //              optional memo's
        //         Swaps
        //              Dex trades
        //              Thorchain contract (ETH/TOKEN) trades
        //
        //         non-transfers
        //             Register address
        //             Register Username
        //             staking
        //
        //  */
        /*
        let swap = {
            inboundAddress: {
                chain: 'ETH',
                pub_key: 'tthorpub1addwnpepqvuy8vh6yj4h28xp6gfpjsztpj6p46y2rs0763t6uw9f6lkky0ly5uvwla6',
                address: '0x36286e570c412531aad366154eea9867b0e71755',
                router: '0x9d496De78837f5a2bA64Cb40E62c19FBcB67f55a',
                halted: false
            },
            asset: {
                chain: 'ETH',
                symbol: 'ETH',
                ticker: 'ETH',
                iconPath: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/ETH-1C9/logo.png'
            },
            memo: '=:THOR.RUNE:tthor1veu9u5h4mtdq34fjgu982s8pympp6w87ag58nh',
            amount: "0.1"
        }
        */
        // @ts-ignore
        // @ts-ignore
        // @ts-ignore
        this.addLiquidity = function (addLiquidity) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, rawTx, UTXOcoins, addressFrom, data, nonceRemote, nonce, gas_limit, gas_price, masterPathEth, amountNative, ethTx, txid, coin, addressFrom, transfer, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tag = TAG + " | addLiquidity | ";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 14, , 15]);
                            rawTx = void 0;
                            UTXOcoins = [
                                'BTC',
                                'BCH',
                                'LTC'
                            ];
                            if (!(addLiquidity.inboundAddress.chain === 'ETH')) return [3 /*break*/, 9];
                            addressFrom = void 0;
                            if (!addLiquidity.addressFrom) return [3 /*break*/, 2];
                            addressFrom = addLiquidity.addressFrom;
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.getMaster('ETH')];
                        case 3:
                            addressFrom = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!addressFrom)
                                throw Error("102: unable to get master address! ");
                            return [4 /*yield*/, this.pioneerClient.instance.GetThorchainMemoEncoded(null, addLiquidity)];
                        case 5:
                            data = _a.sent();
                            data = data.data;
                            log.debug(tag, "txData: ", data);
                            return [4 /*yield*/, this.pioneerClient.instance.GetNonce(addressFrom)];
                        case 6:
                            nonceRemote = _a.sent();
                            nonceRemote = nonceRemote.data;
                            nonce = addLiquidity.nonce || nonceRemote;
                            gas_limit = 80000 //TODO dynamic gas limit?
                            ;
                            return [4 /*yield*/, this.pioneerClient.instance.GetGasPrice()];
                        case 7:
                            gas_price = _a.sent();
                            gas_price = gas_price.data;
                            log.debug(tag, "gas_price: ", gas_price);
                            gas_price = parseInt(gas_price);
                            gas_price = gas_price + 1000000000;
                            masterPathEth = "m/44'/60'/0'/0/0" //TODO moveme to support
                            ;
                            amountNative = parseFloat(addLiquidity.amount) * support.getBase('ETH');
                            amountNative = Number(parseInt(String(amountNative)));
                            log.debug("amountNative: ", amountNative);
                            log.debug("nonce: ", nonce);
                            ethTx = {
                                // addressNList: support.bip32ToAddressNList(masterPathEth),
                                "addressNList": [
                                    2147483692,
                                    2147483708,
                                    2147483648,
                                    0,
                                    0
                                ],
                                nonce: web3_utils_1.numberToHex(nonce),
                                gasPrice: web3_utils_1.numberToHex(gas_price),
                                gasLimit: web3_utils_1.numberToHex(gas_limit),
                                value: web3_utils_1.numberToHex(amountNative),
                                to: addLiquidity.inboundAddress.router,
                                data: data,
                            };
                            log.debug("unsignedTxETH: ", ethTx);
                            return [4 /*yield*/, this.WALLET.ethSignTx(ethTx)];
                        case 8:
                            //send to hdwallet
                            rawTx = _a.sent();
                            rawTx.params = ethTx;
                            txid = keccak256(rawTx.serialized).toString('hex');
                            log.debug(tag, "txid: ", txid);
                            rawTx.txid = txid;
                            return [3 /*break*/, 13];
                        case 9:
                            if (!(UTXOcoins.indexOf(addLiquidity.inboundAddress.chain) >= 0)) return [3 /*break*/, 12];
                            if (!addLiquidity.memo)
                                throw Error("Memo required for swaps!");
                            coin = addLiquidity.inboundAddress.chain;
                            return [4 /*yield*/, this.getMaster(coin)
                                //build transfer with memo
                            ]; //TODO this silly in utxo
                        case 10:
                            addressFrom = _a.sent() //TODO this silly in utxo
                            ;
                            transfer = {
                                coin: "BTC",
                                addressTo: addLiquidity.inboundAddress.address,
                                addressFrom: addressFrom,
                                amount: addLiquidity.amount,
                                feeLevel: addLiquidity.feeLevel,
                                memo: addLiquidity.memo
                            };
                            return [4 /*yield*/, this.buildTransfer(transfer)];
                        case 11:
                            rawTx = _a.sent();
                            console.log("rawTx: ", rawTx);
                            return [3 /*break*/, 13];
                        case 12: throw Error("Chain not supported! " + addLiquidity.inboundAddress.chain);
                        case 13: return [2 /*return*/, rawTx];
                        case 14:
                            e_4 = _a.sent();
                            log.error(e_4);
                            throw e_4;
                        case 15: return [2 /*return*/];
                    }
                });
            });
        },
            this.buildApproval = function (approval) {
                return __awaiter(this, void 0, void 0, function () {
                    var tag, rawTx, addressFrom, nonceRemote, nonce, gas_limit, gas_price, data, ethTx, e_5;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                tag = TAG + " | buildApproval | ";
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 5, , 6]);
                                rawTx = void 0;
                                return [4 /*yield*/, this.getMaster('ETH')];
                            case 2:
                                addressFrom = _a.sent();
                                return [4 /*yield*/, this.pioneerClient.instance.GetNonce(addressFrom)];
                            case 3:
                                nonceRemote = _a.sent();
                                nonceRemote = nonceRemote.data;
                                nonce = approval.nonce || nonceRemote;
                                gas_limit = 80000 //TODO dynamic gas limit?
                                ;
                                return [4 /*yield*/, this.pioneerClient.instance.GetGasPrice()];
                            case 4:
                                gas_price = _a.sent();
                                gas_price = gas_price.data;
                                log.debug(tag, "gas_price: ", gas_price);
                                gas_price = parseInt(gas_price);
                                gas_price = gas_price + 1000000000;
                                log.debug(tag, "approval.tokenAddress: ", approval.tokenAddress);
                                log.debug(tag, "approval.amount: ", approval.amount);
                                data = "0x" +
                                    "095ea7b3" + // ERC-20 contract approve function identifier
                                    (approval.contract).replace("0x", "").padStart(64, "0") +
                                    (approval.amount).toString(16).padStart(64, "0");
                                log.debug(tag, "data: ", data);
                                ethTx = {
                                    // addressNList: support.bip32ToAddressNList(masterPathEth),
                                    "addressNList": [
                                        2147483692,
                                        2147483708,
                                        2147483648,
                                        0,
                                        0
                                    ],
                                    nonce: web3_utils_1.numberToHex(nonce),
                                    gasPrice: web3_utils_1.numberToHex(gas_price),
                                    gasLimit: web3_utils_1.numberToHex(gas_limit),
                                    value: web3_utils_1.numberToHex(0),
                                    to: approval.tokenAddress,
                                    data: data,
                                };
                                log.debug("unsignedTxETH: ", ethTx);
                                //send to hdwallet
                                // rawTx = await this.WALLET.ethSignTx(ethTx)
                                // rawTx.params = ethTx
                                //
                                // const txid = keccak256(rawTx.serialized).toString('hex')
                                // log.debug(tag,"txid: ",txid)
                                // rawTx.txid = txid
                                return [2 /*return*/, ethTx];
                            case 5:
                                e_5 = _a.sent();
                                log.error(e_5);
                                throw e_5;
                            case 6: return [2 /*return*/];
                        }
                    });
                });
            },
            //@ts-ignore
            this.buildSwap = function (swap) {
                return __awaiter(this, void 0, void 0, function () {
                    var tag, rawTx, UTXOcoins, addressFrom, data, nonceRemote, nonce, gas_limit, gas_price, masterPathEth, amountNative, ethTx, e_6;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                tag = TAG + " | buildSwap | ";
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 10, , 11]);
                                rawTx = void 0;
                                UTXOcoins = [
                                    'BTC',
                                    'BCH',
                                    'LTC'
                                ];
                                if (!(swap.inboundAddress.chain === 'ETH')) return [3 /*break*/, 8];
                                addressFrom = void 0;
                                if (!swap.addressFrom) return [3 /*break*/, 2];
                                addressFrom = swap.addressFrom;
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, this.getMaster('ETH')];
                            case 3:
                                addressFrom = _a.sent();
                                _a.label = 4;
                            case 4:
                                if (!addressFrom)
                                    throw Error("102: unable to get master address! ");
                                return [4 /*yield*/, this.pioneerClient.instance.GetThorchainMemoEncoded(null, swap)];
                            case 5:
                                data = _a.sent();
                                data = data.data;
                                log.debug(tag, "txData: ", data);
                                return [4 /*yield*/, this.pioneerClient.instance.GetNonce(addressFrom)];
                            case 6:
                                nonceRemote = _a.sent();
                                nonceRemote = nonceRemote.data;
                                nonce = swap.nonce || nonceRemote;
                                gas_limit = 80000 //TODO dynamic gas limit?
                                ;
                                return [4 /*yield*/, this.pioneerClient.instance.GetGasPrice()];
                            case 7:
                                gas_price = _a.sent();
                                gas_price = gas_price.data;
                                log.debug(tag, "gas_price: ", gas_price);
                                gas_price = parseInt(gas_price);
                                gas_price = gas_price + 1000000000;
                                masterPathEth = "m/44'/60'/0'/0/0" //TODO moveme to support
                                ;
                                amountNative = parseFloat(swap.amount) * support.getBase('ETH');
                                amountNative = Number(parseInt(String(amountNative)));
                                log.debug("amountNative: ", amountNative);
                                log.debug("nonce: ", nonce);
                                ethTx = {
                                    // addressNList: support.bip32ToAddressNList(masterPathEth),
                                    "addressNList": [
                                        2147483692,
                                        2147483708,
                                        2147483648,
                                        0,
                                        0
                                    ],
                                    nonce: web3_utils_1.numberToHex(nonce),
                                    gasPrice: web3_utils_1.numberToHex(gas_price),
                                    gasLimit: web3_utils_1.numberToHex(gas_limit),
                                    value: web3_utils_1.numberToHex(amountNative),
                                    to: swap.inboundAddress.router,
                                    data: data,
                                };
                                log.debug("unsignedTxETH: ", ethTx);
                                rawTx = ethTx;
                                return [3 /*break*/, 9];
                            case 8:
                                if (UTXOcoins.indexOf(swap.inboundAddress.chain) >= 0) {
                                    throw Error("NOT SUPPORTED! Use transfer with memo!");
                                }
                                else {
                                    throw Error("Chain not supported! " + swap.inboundAddress.chain);
                                }
                                _a.label = 9;
                            case 9: return [2 /*return*/, rawTx];
                            case 10:
                                e_6 = _a.sent();
                                log.error(e_6);
                                throw e_6;
                            case 11: return [2 /*return*/];
                        }
                    });
                });
            },
            this.buildTx = function (transaction) {
                return __awaiter(this, void 0, void 0, function () {
                    var tag, rawTx, tx, signTx, res, _a, e_7;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                tag = TAG + " | buildTx | ";
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, 11, , 12]);
                                rawTx = {};
                                if (!(transaction.coin === 'FIO')) return [3 /*break*/, 9];
                                tx = void 0;
                                signTx = void 0;
                                res = void 0;
                                _a = transaction.type;
                                switch (_a) {
                                    case "fioSignAddPubAddressTx": return [3 /*break*/, 2];
                                    case "fioSignRegisterDomainTx": return [3 /*break*/, 4];
                                    case "fioSignRegisterFioAddressTx": return [3 /*break*/, 5];
                                    case "fioSignNewFundsRequestTx": return [3 /*break*/, 6];
                                }
                                return [3 /*break*/, 8];
                            case 2:
                                tx = transaction.tx;
                                signTx = {
                                    addressNList: hdwallet_core_1.bip32ToAddressNList("m/44'/235'/0'/0/0"),
                                    actions: [
                                        {
                                            account: fiosdk_offline_1.FioActionParameters.FioAddPubAddressActionAccount,
                                            name: fiosdk_offline_1.FioActionParameters.FioAddPubAddressActionName,
                                            data: tx,
                                        },
                                    ],
                                };
                                log.debug(tag, "signTx: ", JSON.stringify(signTx));
                                return [4 /*yield*/, this.WALLET.fioSignTx(signTx)];
                            case 3:
                                res = _b.sent();
                                res.coin = "FIO";
                                res.type = transaction.type;
                                rawTx = res;
                                // code block
                                return [3 /*break*/, 8];
                            case 4: 
                            // code block
                            return [3 /*break*/, 8];
                            case 5: 
                            // code block
                            return [3 /*break*/, 8];
                            case 6:
                                tx = transaction.tx;
                                signTx = {
                                    addressNList: hdwallet_core_1.bip32ToAddressNList("m/44'/235'/0'/0/0"),
                                    actions: [
                                        {
                                            account: fiosdk_offline_1.FioActionParameters.FioNewFundsRequestActionAccount,
                                            name: fiosdk_offline_1.FioActionParameters.FioNewFundsRequestActionName,
                                            data: tx,
                                        },
                                    ],
                                };
                                log.debug(tag, "signTx: ", JSON.stringify(signTx));
                                return [4 /*yield*/, this.WALLET.fioSignTx(signTx)];
                            case 7:
                                res = _b.sent();
                                res.coin = "FIO";
                                res.type = transaction.type;
                                rawTx = res;
                                return [3 /*break*/, 8];
                            case 8: return [3 /*break*/, 10];
                            case 9:
                                log.error(tag, "coin not supported! ", transaction.coin);
                                _b.label = 10;
                            case 10: return [2 /*return*/, rawTx];
                            case 11:
                                e_7 = _b.sent();
                                log.error(e_7);
                                throw e_7;
                            case 12: return [2 /*return*/];
                        }
                    });
                });
            };
        // this.encrypt = function (msg:FioActionParameters.FioRequestContent,payerPubkey:string) {
        //     return encrypt_message(msg,payerPubkey);
        // }
        this.sendApproval = function (intent) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, invocationId, approval, signedTx_1, broadcast_hook, e_8;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tag = TAG + " | sendApproval | ";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            invocationId = void 0;
                            if (!intent.invocationId) {
                                invocationId = "notset";
                            }
                            else {
                                invocationId = intent.invocationId;
                            }
                            if (intent.coin && intent.coin !== 'ETH')
                                throw Error("approvals are ETH only!");
                            intent.coin = "ETH";
                            if (!intent.contract)
                                throw Error("102: contract required!");
                            if (!intent.tokenAddress)
                                throw Error("103: tokenAddress required!");
                            if (!intent.amount)
                                throw Error("104: amount required!");
                            approval = {
                                contract: intent.contract,
                                tokenAddress: intent.tokenAddress,
                                amount: intent.amount
                            };
                            return [4 /*yield*/, this.buildApproval(approval)];
                        case 2:
                            signedTx_1 = _a.sent();
                            log.debug(tag, "signedTx: ", signedTx_1);
                            if (invocationId)
                                signedTx_1.invocationId = invocationId;
                            log.debug(tag, "invocationId: ", invocationId);
                            signedTx_1.broadcasted = false;
                            broadcast_hook = function () { return __awaiter(_this, void 0, void 0, function () {
                                var broadcastResult, e_9;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, , 3]);
                                            log.debug(tag, "signedTx: ", signedTx_1);
                                            return [4 /*yield*/, this.broadcastTransaction('ETH', signedTx_1)];
                                        case 1:
                                            broadcastResult = _a.sent();
                                            log.debug(tag, "broadcastResult: ", broadcastResult);
                                            return [3 /*break*/, 3];
                                        case 2:
                                            e_9 = _a.sent();
                                            log.error(tag, "Failed to broadcast transaction!");
                                            return [3 /*break*/, 3];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); };
                            //broadcast hook
                            if (!intent.noBroadcast) {
                                signedTx_1.broadcasted = true;
                            }
                            else {
                                signedTx_1.noBroadcast = true;
                            }
                            //if noBroadcast we MUST still release the inovation
                            //notice we pass noBroadcast to the broadcast post request
                            //also Notice NO asyc here! tx lifecycle hooks bro!
                            broadcast_hook();
                            signedTx_1.invocationId = invocationId;
                            //
                            if (!signedTx_1.txid)
                                throw Error("103: Pre-broadcast txid hash not implemented!");
                            return [2 /*return*/, signedTx_1];
                        case 3:
                            e_8 = _a.sent();
                            log.error(tag, e_8);
                            throw Error(e_8);
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        this.sendToAddress = function (intent) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, invocationId, addressFrom, balance, transaction, unSignedTx, e_10;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tag = TAG + " | sendToAddress | ";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 6, , 7]);
                            invocationId = void 0;
                            if (!intent.invocationId) {
                                invocationId = "notset";
                            }
                            else {
                                invocationId = intent.invocationId;
                            }
                            if (!intent.address && intent.addressTo)
                                intent.address = intent.addressTo;
                            intent.coin = intent.coin.toUpperCase();
                            log.debug(tag, "params: ", intent);
                            if (!intent.amount)
                                throw Error("Amount required!");
                            if (!intent.address)
                                throw Error("address required!");
                            return [4 /*yield*/, this.getMaster(intent.coin)];
                        case 2:
                            addressFrom = _a.sent();
                            log.debug(tag, "addressFrom: ", addressFrom);
                            if (!(intent.amount === 'all')) return [3 /*break*/, 4];
                            return [4 /*yield*/, this.getBalance(intent.coin)];
                        case 3:
                            balance = _a.sent();
                            log.debug(tag, "balance: ", balance);
                            //subtract fees
                            intent.amount = String(parseFloat(balance) - 0.08);
                            log.debug(tag, "ALL amount: ", intent.amount);
                            if (parseFloat(intent.amount) < 0) {
                                throw Error("Balance lower then expected fee!");
                            }
                            _a.label = 4;
                        case 4:
                            transaction = {
                                coin: intent.coin,
                                addressTo: intent.address,
                                addressFrom: addressFrom,
                                amount: intent.amount,
                            };
                            if (intent.memo)
                                transaction.memo = intent.memo;
                            if (intent.noBroadcast)
                                transaction.noBroadcast = intent.noBroadcast;
                            return [4 /*yield*/, this.buildTransfer(transaction)];
                        case 5:
                            unSignedTx = _a.sent();
                            log.debug(tag, "unSignedTx: ", unSignedTx);
                            if (invocationId)
                                unSignedTx.invocationId = invocationId;
                            log.debug(tag, "transaction: ", transaction);
                            unSignedTx.broadcasted = false;
                            if (!intent.noBroadcast) {
                                unSignedTx.broadcasted = true;
                            }
                            else {
                                unSignedTx.noBroadcast = true;
                            }
                            unSignedTx.invocationId = invocationId;
                            return [2 /*return*/, unSignedTx];
                        case 6:
                            e_10 = _a.sent();
                            log.error(tag, e_10);
                            throw Error(e_10);
                        case 7: return [2 /*return*/];
                    }
                });
            });
        };
        this.signTransaction = function (unsignedTx) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, signedTx, coin, UTXOcoins, res, txid, res, txFinal, broadcastString, buffer, hash, res, txFinal, broadcastString, signedTxResponse, pubkeySigHex, buffer, hash, e_11;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tag = TAG + " | signTransaction | ";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 13, , 14]);
                            signedTx = {};
                            coin = unsignedTx.coin;
                            UTXOcoins = [
                                'BTC',
                                'BCH',
                                'LTC'
                            ];
                            if (!(UTXOcoins.indexOf(coin) >= 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, this.WALLET.btcSignTx(unsignedTx.HDwalletPayload)];
                        case 2:
                            res = _a.sent();
                            log.debug(tag, "res: ", res);
                            //
                            signedTx = {
                                txid: res.txid,
                                coin: coin,
                                serialized: res.serializedTx
                            };
                            return [3 /*break*/, 12];
                        case 3:
                            if (!(coin === 'ETH' || tokenData.tokens.indexOf(coin) >= 0 && coin !== 'EOS')) return [3 /*break*/, 5];
                            log.debug("unsignedTxETH: ", unsignedTx.HDwalletPayload);
                            return [4 /*yield*/, this.WALLET.ethSignTx(unsignedTx.HDwalletPayload)
                                //debug https://flightwallet.github.io/decode-eth-tx/
                                //txid
                                //const txHash = await web3.utils.sha3(signed.rawTransaction);
                            ];
                        case 4:
                            signedTx = _a.sent();
                            //debug https://flightwallet.github.io/decode-eth-tx/
                            //txid
                            //const txHash = await web3.utils.sha3(signed.rawTransaction);
                            if (!signedTx.serialized)
                                throw Error("Failed to sign!");
                            txid = keccak256(signedTx.serialized).toString('hex');
                            log.debug(tag, "txid: ", txid);
                            signedTx.txid = txid;
                            signedTx.params = unsignedTx.transaction; //input
                            return [3 /*break*/, 12];
                        case 5:
                            if (!(coin === 'RUNE')) return [3 /*break*/, 7];
                            return [4 /*yield*/, this.WALLET.thorchainSignTx(unsignedTx.HDwalletPayload)];
                        case 6:
                            res = _a.sent();
                            log.debug("res: ", prettyjson.render(res));
                            log.debug("res*****: ", res);
                            txFinal = void 0;
                            txFinal = res;
                            txFinal.signatures = res.signatures;
                            log.debug("FINAL: ****** ", txFinal);
                            broadcastString = {
                                tx: txFinal,
                                type: "cosmos-sdk/StdTx",
                                mode: "sync"
                            };
                            buffer = Buffer.from(JSON.stringify(txFinal), 'base64');
                            hash = sha256(buffer).toString().toUpperCase();
                            // let hash = crypto.createHash('sha256').update(buffer).digest('hex').toUpperCase()
                            signedTx = {
                                txid: hash,
                                coin: coin,
                                serialized: JSON.stringify(broadcastString)
                            };
                            return [3 /*break*/, 12];
                        case 7:
                            if (!(coin === 'ATOM')) return [3 /*break*/, 9];
                            return [4 /*yield*/, this.WALLET.cosmosSignTx(unsignedTx.HDwalletPayload)];
                        case 8:
                            res = _a.sent();
                            log.debug("res: ", prettyjson.render(res));
                            log.debug("res*****: ", res);
                            txFinal = void 0;
                            txFinal = res;
                            txFinal.signatures = res.signatures;
                            log.debug("FINAL: ****** ", txFinal);
                            broadcastString = {
                                tx: txFinal,
                                type: "cosmos-sdk/StdTx",
                                mode: "sync"
                            };
                            signedTx = {
                                txid: "",
                                coin: coin,
                                serialized: JSON.stringify(broadcastString)
                            };
                            return [3 /*break*/, 12];
                        case 9:
                            if (!(coin === 'BNB')) return [3 /*break*/, 11];
                            return [4 /*yield*/, this.WALLET.binanceSignTx(unsignedTx.HDwalletPayload)];
                        case 10:
                            signedTxResponse = _a.sent();
                            log.debug(tag, "**** signedTxResponse: ", signedTxResponse);
                            log.debug(tag, "**** signedTxResponse: ", JSON.stringify(signedTxResponse));
                            pubkeySigHex = signedTxResponse.signatures.pub_key.toString('hex');
                            log.debug(tag, "pubkeySigHex: ", pubkeySigHex);
                            buffer = Buffer.from(signedTxResponse.serialized, 'base64');
                            hash = cryptoTools.createHash('sha256').update(buffer).digest('hex').toUpperCase();
                            signedTx = {
                                txid: hash,
                                serialized: signedTxResponse.serialized
                            };
                            return [3 /*break*/, 12];
                        case 11: 
                        //TODO EOS
                        //FIO
                        throw Error("Coin not supported! " + coin);
                        case 12:
                            //
                            if (unsignedTx.transaction.noBroadcast)
                                signedTx.noBroadcast = true;
                            if (unsignedTx.invocationId)
                                signedTx.invocationId = unsignedTx.invocationId;
                            return [2 /*return*/, signedTx];
                        case 13:
                            e_11 = _a.sent();
                            log.error(tag, "e: ", e_11);
                            throw e_11;
                        case 14: return [2 /*return*/];
                    }
                });
            });
        };
        this.buildTransfer = function (transaction) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, coin, address, amount, memo, addressFrom, rawTx, input, unspentInputs, utxos, i, input_1, utxo, feeRateInfo, feeRate, amountSat, targets, totalInSatoshi, i, amountInSat, valueIn, valueOut, selectedResults, inputs, outputs, i, inputInfo, input_2, changeAddress, type_1, i, outputInfo, output, output, longName, hdwalletTxDescription, unsignedTx, balanceEth, nonceRemote, nonce, gas_limit, gas_price, txParams, amountNative, knownCoins, balanceToken, abiInfo, metaData, amountNative, transfer_data, masterPathEth, chainId, ethTx, unsignedTx, amountNative, masterInfo, sequence, account_number, txType, gas, fee, memo_1, unsigned, chain_id, fromAddress, runeTx, unsignedTx, amountNative, masterInfo, sequence, account_number, txType, gas, fee, memo_2, unsigned, chain_id, fromAddress, atomTx, unsignedTx, accountInfo, sequence, account_number, pubkey, bnbTx, binanceTx, unsignedTx, e_12;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tag = TAG + " | build_transfer | ";
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 28, , 29]);
                            log.info(tag, "transaction: ", transaction);
                            isTestnet = false;
                            coin = transaction.coin.toUpperCase();
                            address = transaction.address;
                            if (!address)
                                address = transaction.addressTo;
                            amount = transaction.amount;
                            if (!coin)
                                throw Error("102: Invalid transaction missing coin!");
                            if (!address)
                                throw Error("103: Invalid transaction missing address!");
                            if (!amount)
                                throw Error("104: Invalid transaction missing amount!");
                            memo = transaction.memo;
                            addressFrom = void 0;
                            if (!transaction.addressFrom) return [3 /*break*/, 2];
                            addressFrom = transaction.addressFrom;
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.getMaster(coin)];
                        case 3:
                            addressFrom = _a.sent();
                            _a.label = 4;
                        case 4:
                            if (!addressFrom)
                                throw Error("102: unable to get master address! ");
                            log.debug(tag, "addressFrom: ", addressFrom);
                            rawTx = void 0;
                            if (!(UTXO_COINS.indexOf(coin) >= 0)) return [3 /*break*/, 10];
                            log.debug(tag, "Build UTXO tx! ", coin);
                            //list unspent
                            log.debug(tag, "coin: ", coin);
                            log.debug(tag, "xpub: ", this.PUBLIC_WALLET[coin].xpub);
                            input = void 0;
                            log.debug(tag, "isTestnet: ", isTestnet);
                            if (this.isTestnet && false) { //Seriously fuck testnet flagging!
                                // input = {coin:"TEST",xpub:this.PUBLIC_WALLET[coin].pubkey}
                            }
                            else {
                                input = { coin: coin, xpub: this.PUBLIC_WALLET[coin].pubkey };
                            }
                            log.info(tag, "input: ", input);
                            return [4 /*yield*/, this.pioneerClient.instance.ListUnspent(input)];
                        case 5:
                            unspentInputs = _a.sent();
                            unspentInputs = unspentInputs.data;
                            log.info(tag, "unspentInputs: ", unspentInputs);
                            utxos = [];
                            for (i = 0; i < unspentInputs.length; i++) {
                                input_1 = unspentInputs[i];
                                utxo = {
                                    txId: input_1.txid,
                                    vout: input_1.vout,
                                    value: parseInt(input_1.value),
                                    nonWitnessUtxo: Buffer.from(input_1.hex, 'hex'),
                                    hex: input_1.hex,
                                    tx: input_1.tx,
                                    path: input_1.path
                                    //TODO if segwit
                                    // witnessUtxo: {
                                    //     script: Buffer.from(input.hex, 'hex'),
                                    //     value: 10000 // 0.0001 BTC and is the exact same as the value above
                                    // }
                                };
                                utxos.push(utxo);
                            }
                            //if no utxo's
                            if (utxos.length === 0) {
                                throw Error("101 YOUR BROKE! no UTXO's found! ");
                            }
                            return [4 /*yield*/, this.pioneerClient.instance.GetFeeInfo({ coin: coin })];
                        case 6:
                            feeRateInfo = _a.sent();
                            feeRateInfo = feeRateInfo.data;
                            log.debug(tag, "feeRateInfo: ", feeRateInfo);
                            feeRate = void 0;
                            //TODO dynamic all the things
                            if (coin === 'BTC') {
                                feeRate = feeRateInfo;
                            }
                            else if (coin === 'BCH') {
                                feeRate = 2;
                            }
                            else if (coin === 'LTC') {
                                feeRate = 4;
                            }
                            else {
                                throw Error("Fee's not configured for coin:" + coin);
                            }
                            log.debug(tag, "feeRate: ", feeRate);
                            if (!feeRate)
                                throw Error("Can not build TX without fee Rate!");
                            amountSat = parseFloat(amount) * 100000000;
                            amountSat = parseInt(amountSat.toString());
                            log.debug(tag, "amount satoshi: ", amountSat);
                            targets = [
                                {
                                    address: address,
                                    value: amountSat
                                }
                            ];
                            totalInSatoshi = 0;
                            for (i = 0; i < utxos.length; i++) {
                                amountInSat = utxos[i].value;
                                totalInSatoshi = totalInSatoshi + amountInSat;
                            }
                            log.debug(tag, "totalInSatoshi: ", totalInSatoshi);
                            log.debug(tag, "totalInBase: ", nativeToBaseAmount(coin, totalInSatoshi));
                            return [4 /*yield*/, coincap.getValue(coin, nativeToBaseAmount(coin, totalInSatoshi))];
                        case 7:
                            valueIn = _a.sent();
                            log.debug(tag, "totalInValue: ", valueIn);
                            //amount out
                            log.debug(tag, "amountOutSat: ", amountSat);
                            log.debug(tag, "amountOutBase: ", amount);
                            return [4 /*yield*/, coincap.getValue(coin, nativeToBaseAmount(coin, amountSat))];
                        case 8:
                            valueOut = _a.sent();
                            log.debug(tag, "valueOut: ", valueOut);
                            if (valueOut < 1) {
                                if (coin === 'BCH') {
                                    log.info(tag, " God bless you sir's :BCH:");
                                }
                                else {
                                    log.info("ALERT DUST! sending less that 1usd. (hope you know what you are doing)");
                                }
                                //Expensive coins
                                if (["BTC", "ETH", "RUNE"].indexOf(coin) >= 0) {
                                    throw Error("You dont want to do this!");
                                }
                            }
                            if (nativeToBaseAmount(coin, totalInSatoshi) < amount) {
                                throw Error("Sum of input less than output! YOUR BROKE! ");
                            }
                            log.debug(tag, "inputs coinselect algo: ", { utxos: utxos, targets: targets, feeRate: feeRate });
                            selectedResults = coinSelect(utxos, targets, feeRate);
                            log.debug(tag, "result coinselect algo: ", selectedResults);
                            //value of all outputs
                            //amount fee in USD
                            //if
                            if (!selectedResults.inputs) {
                                throw Error("Fee exceeded total available inputs!");
                            }
                            inputs = [];
                            outputs = [];
                            for (i = 0; i < selectedResults.inputs.length; i++) {
                                inputInfo = selectedResults.inputs[i];
                                log.debug(tag, "inputInfo: ", inputInfo);
                                input_2 = {
                                    addressNList: support.bip32ToAddressNList(inputInfo.path),
                                    scriptType: "p2pkh",
                                    amount: String(inputInfo.value),
                                    vout: inputInfo.vout,
                                    txid: inputInfo.txId,
                                    segwit: false,
                                    hex: inputInfo.hex,
                                    tx: inputInfo.tx
                                };
                                inputs.push(input_2);
                            }
                            return [4 /*yield*/, this.getMaster(coin)
                                //if bch convert format
                            ];
                        case 9:
                            changeAddress = _a.sent();
                            //if bch convert format
                            if (coin === 'BCH') {
                                type_1 = bchaddr.detectAddressFormat(changeAddress);
                                log.debug(tag, "type: ", type_1);
                                if (type_1 === 'cashaddr') {
                                    changeAddress = bchaddr.toLegacyAddress(changeAddress);
                                }
                            }
                            for (i = 0; i < selectedResults.outputs.length; i++) {
                                outputInfo = selectedResults.outputs[i];
                                if (outputInfo.address) {
                                    output = {
                                        address: address,
                                        addressType: "spend",
                                        scriptType: "p2wpkh",
                                        amount: String(outputInfo.value),
                                        isChange: false,
                                    };
                                    outputs.push(output);
                                }
                                else {
                                    output = {
                                        address: changeAddress,
                                        addressType: "spend",
                                        scriptType: "p2pkh",
                                        amount: String(outputInfo.value),
                                        isChange: true,
                                    };
                                    outputs.push(output);
                                }
                            }
                            longName = void 0;
                            if (coin === 'BCH') {
                                longName = 'BitcoinCash';
                            }
                            else if (coin === 'LTC') {
                                longName = 'Litecoin';
                                if (isTestnet) {
                                    longName = 'Testnet';
                                }
                            }
                            else if (coin === 'BTC') {
                                longName = 'Bitcoin';
                                if (isTestnet) {
                                    longName = 'Testnet';
                                }
                            }
                            else {
                                throw Error("UTXO coin: " + coin + " Not supported yet! ");
                            }
                            hdwalletTxDescription = {
                                opReturnData: memo,
                                coin: longName,
                                inputs: inputs,
                                outputs: outputs,
                                version: 1,
                                locktime: 0,
                            };
                            unsignedTx = {
                                coin: coin,
                                transaction: transaction,
                                HDwalletPayload: hdwalletTxDescription,
                                verbal: "UTXO transaction"
                            };
                            rawTx = unsignedTx;
                            return [3 /*break*/, 27];
                        case 10:
                            if (!(coin === 'ETH' || tokenData.tokens.indexOf(coin) >= 0 && coin !== 'EOS')) return [3 /*break*/, 18];
                            log.debug(tag, "checkpoint");
                            return [4 /*yield*/, this.getBalance('ETH')];
                        case 11:
                            balanceEth = _a.sent();
                            log.debug(tag, "balanceEth: ", balanceEth);
                            return [4 /*yield*/, this.pioneerClient.instance.GetNonce(addressFrom)];
                        case 12:
                            nonceRemote = _a.sent();
                            nonceRemote = nonceRemote.data;
                            nonce = transaction.nonce || nonceRemote;
                            gas_limit = 80000 //TODO dynamic gas limit?
                            ;
                            return [4 /*yield*/, this.pioneerClient.instance.GetGasPrice()];
                        case 13:
                            gas_price = _a.sent();
                            gas_price = gas_price.data;
                            log.debug(tag, "gas_price: ", gas_price);
                            gas_price = parseInt(gas_price);
                            gas_price = gas_price + 1000000000;
                            txParams = void 0;
                            if (!(coin === "ETH")) return [3 /*break*/, 14];
                            amountNative = parseFloat(amount) * support.getBase('ETH');
                            amountNative = Number(parseInt(String(amountNative)));
                            txParams = {
                                nonce: nonce,
                                to: address,
                                gasPrice: gas_price,
                                gasLimit: gas_limit,
                                value: amountNative,
                                data: memo
                            };
                            log.debug(tag, "txParams: ", txParams);
                            return [3 /*break*/, 17];
                        case 14:
                            knownCoins = tokenData.tokens;
                            log.debug(tag, "knownCoins: ", knownCoins);
                            if (knownCoins.indexOf(coin) === -1)
                                throw Error("107: unknown token! " + coin);
                            return [4 /*yield*/, this.getBalance(coin)
                                //verify token balance
                            ];
                        case 15:
                            balanceToken = _a.sent();
                            //verify token balance
                            if (amount > balanceToken)
                                throw Error("103: Insufficient balance! ");
                            abiInfo = tokenData.ABI[coin];
                            metaData = abiInfo.metaData;
                            amountNative = parseFloat(amount) * metaData.BASE;
                            amountNative = Number(parseInt(String(amountNative)));
                            log.debug({ coin: coin, address: address, amountNative: amountNative });
                            return [4 /*yield*/, this.pioneerClient.instance.GetTransferData({ coin: coin, address: address, amount: amountNative })];
                        case 16:
                            transfer_data = _a.sent();
                            transfer_data = transfer_data.data;
                            log.debug(tag, "transfer_data: ", transfer_data);
                            txParams = {
                                nonce: nonce,
                                to: metaData.contractAddress,
                                gasPrice: gas_price,
                                data: transfer_data,
                                gasLimit: gas_limit
                            };
                            log.debug(tag, "txParams: ", txParams);
                            _a.label = 17;
                        case 17:
                            masterPathEth = "m/44'/60'/0'/0/0" //TODO moveme to support
                            ;
                            log.debug(tag, "txParams: ", txParams);
                            chainId = 1;
                            if (this.isTestnet) {
                                chainId = 3; //ropsten
                            }
                            ethTx = {
                                addressNList: support.bip32ToAddressNList(masterPathEth),
                                nonce: web3_utils_1.numberToHex(txParams.nonce),
                                gasPrice: web3_utils_1.numberToHex(txParams.gasPrice),
                                gasLimit: web3_utils_1.numberToHex(txParams.gasLimit),
                                value: web3_utils_1.numberToHex(txParams.value || 0),
                                to: txParams.to,
                                data: txParams.data,
                                chainId: chainId
                            };
                            unsignedTx = {
                                coin: coin,
                                transaction: transaction,
                                HDwalletPayload: ethTx,
                                verbal: "Ethereum transaction"
                            };
                            rawTx = unsignedTx;
                            return [3 /*break*/, 27];
                        case 18:
                            if (!(coin === 'RUNE')) return [3 /*break*/, 21];
                            amountNative = RUNE_BASE * parseFloat(amount);
                            amountNative = parseInt(amountNative.toString());
                            //get account number
                            log.debug(tag, "addressFrom: ", addressFrom);
                            return [4 /*yield*/, this.pioneerClient.instance.GetAccountInfo({ coin: 'RUNE', address: addressFrom })];
                        case 19:
                            masterInfo = _a.sent();
                            masterInfo = masterInfo.data;
                            log.debug(tag, "masterInfo: ", masterInfo.data);
                            sequence = masterInfo.result.value.sequence || 0;
                            account_number = masterInfo.result.value.account_number;
                            sequence = parseInt(sequence);
                            sequence = sequence.toString();
                            txType = "thorchain/MsgSend";
                            gas = "250000";
                            fee = "2000000";
                            memo_1 = transaction.memo || "";
                            unsigned = {
                                "fee": {
                                    "amount": [
                                        {
                                            "amount": fee,
                                            "denom": "rune"
                                        }
                                    ],
                                    "gas": gas
                                },
                                "memo": memo_1,
                                "msg": [
                                    {
                                        "type": txType,
                                        "value": {
                                            "amount": [
                                                {
                                                    "amount": amountNative.toString(),
                                                    "denom": "rune"
                                                }
                                            ],
                                            "from_address": addressFrom,
                                            "to_address": address
                                        }
                                    }
                                ],
                                "signatures": null
                            };
                            chain_id = RUNE_CHAIN;
                            if (!sequence)
                                throw Error("112: Failed to get sequence");
                            if (!account_number)
                                account_number = 0;
                            return [4 /*yield*/, this.WALLET.thorchainGetAddress({
                                    addressNList: hdwallet_core_1.bip32ToAddressNList(HD_RUNE_KEYPATH),
                                    showDisplay: false,
                                })];
                        case 20:
                            fromAddress = _a.sent();
                            log.debug(tag, "fromAddressHDwallet: ", fromAddress);
                            log.debug(tag, "fromAddress: ", addressFrom);
                            log.debug("res: ", prettyjson.render({
                                addressNList: hdwallet_core_1.bip32ToAddressNList(HD_RUNE_KEYPATH),
                                chain_id: chain_id,
                                account_number: account_number,
                                sequence: sequence,
                                tx: unsigned,
                            }));
                            if (fromAddress !== addressFrom) {
                                log.error(tag, "fromAddress: ", fromAddress);
                                log.error(tag, "addressFrom: ", addressFrom);
                                throw Error("Can not sign, address mismatch");
                            }
                            log.debug(tag, "******* signTx: ", JSON.stringify({
                                addressNList: hdwallet_core_1.bip32ToAddressNList(HD_RUNE_KEYPATH),
                                chain_id: chain_id,
                                account_number: account_number,
                                sequence: sequence,
                                tx: unsigned,
                            }));
                            runeTx = {
                                addressNList: hdwallet_core_1.bip32ToAddressNList(HD_RUNE_KEYPATH),
                                chain_id: chain_id,
                                account_number: account_number,
                                sequence: sequence,
                                tx: unsigned,
                            };
                            unsignedTx = {
                                coin: coin,
                                transaction: transaction,
                                HDwalletPayload: runeTx,
                                verbal: "Thorchain transaction"
                            };
                            rawTx = unsignedTx;
                            return [3 /*break*/, 27];
                        case 21:
                            if (!(coin === 'ATOM')) return [3 /*break*/, 24];
                            amountNative = ATOM_BASE * parseFloat(amount);
                            amountNative = parseInt(amountNative.toString());
                            //get account number
                            log.debug(tag, "addressFrom: ", addressFrom);
                            return [4 /*yield*/, this.pioneerClient.instance.GetAccountInfo({ coin: 'ATOM', address: addressFrom })];
                        case 22:
                            masterInfo = _a.sent();
                            masterInfo = masterInfo.data;
                            log.debug(tag, "masterInfo: ", masterInfo.data);
                            sequence = masterInfo.result.value.sequence;
                            account_number = masterInfo.result.value.account_number;
                            sequence = parseInt(sequence);
                            sequence = sequence.toString();
                            txType = "cosmos-sdk/MsgSend";
                            gas = "100000";
                            fee = "1000";
                            memo_2 = transaction.memo || "";
                            unsigned = {
                                "fee": {
                                    "amount": [
                                        {
                                            "amount": fee,
                                            "denom": "uatom"
                                        }
                                    ],
                                    "gas": gas
                                },
                                "memo": memo_2,
                                "msg": [
                                    {
                                        "type": txType,
                                        "value": {
                                            "amount": [
                                                {
                                                    "amount": amountNative.toString(),
                                                    "denom": "uatom"
                                                }
                                            ],
                                            "from_address": "thor1jhv0vuygfazfvfu5ws6m80puw0f80kk660s9qj",
                                            "to_address": address
                                        }
                                    }
                                ],
                                "signatures": null
                            };
                            chain_id = ATOM_CHAIN;
                            if (!sequence)
                                throw Error("112: Failed to get sequence");
                            if (!account_number)
                                throw Error("113: Failed to get account_number");
                            return [4 /*yield*/, this.WALLET.cosmosGetAddress({
                                    addressNList: hdwallet_core_1.bip32ToAddressNList(HD_ATOM_KEYPATH),
                                    showDisplay: false,
                                })];
                        case 23:
                            fromAddress = _a.sent();
                            log.debug(tag, "fromAddressHDwallet: ", fromAddress);
                            log.debug(tag, "fromAddress: ", addressFrom);
                            log.debug("res: ", prettyjson.render({
                                addressNList: hdwallet_core_1.bip32ToAddressNList(HD_ATOM_KEYPATH),
                                chain_id: chain_id,
                                account_number: account_number,
                                sequence: sequence,
                                tx: unsigned,
                            }));
                            atomTx = {
                                addressNList: hdwallet_core_1.bip32ToAddressNList(HD_ATOM_KEYPATH),
                                chain_id: chain_id,
                                account_number: account_number,
                                sequence: sequence,
                                tx: unsigned,
                            };
                            unsignedTx = {
                                coin: coin,
                                transaction: transaction,
                                HDwalletPayload: atomTx,
                                verbal: "Thorchain transaction"
                            };
                            rawTx = unsignedTx;
                            return [3 /*break*/, 27];
                        case 24:
                            if (!(coin === "BNB")) return [3 /*break*/, 26];
                            //TODO move to tx builder module
                            //get account info
                            log.debug("addressFrom: ", addressFrom);
                            return [4 /*yield*/, this.pioneerClient.instance.GetAccountInfo({ coin: coin, address: addressFrom })];
                        case 25:
                            accountInfo = _a.sent();
                            accountInfo = accountInfo.data;
                            log.debug("accountInfo: ", prettyjson.render(accountInfo));
                            sequence = void 0;
                            account_number = void 0;
                            pubkey = void 0;
                            if (!accountInfo.result) {
                                //assume new account
                                sequence = "0";
                                account_number = "0";
                                pubkey = null;
                            }
                            else {
                                sequence = transaction.nonce || accountInfo.result.sequence;
                                account_number = accountInfo.result.account_number;
                                pubkey = accountInfo.result.public_key;
                            }
                            if (!address)
                                throw Error("Missing TO address! ");
                            bnbTx = {
                                "account_number": account_number,
                                "chain_id": "Binance-Chain-Nile",
                                "data": null,
                                "memo": transaction.memo,
                                "msgs": [
                                    {
                                        "inputs": [
                                            {
                                                "address": addressFrom,
                                                "coins": [
                                                    {
                                                        "amount": amount,
                                                        "denom": "BNB"
                                                    }
                                                ]
                                            }
                                        ],
                                        "outputs": [
                                            {
                                                "address": address,
                                                "coins": [
                                                    {
                                                        "amount": amount,
                                                        "denom": "BNB"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                "sequence": sequence,
                                "source": "1"
                            };
                            log.debug(tag, "bnbTx: ", prettyjson.render(bnbTx));
                            binanceTx = {
                                addressNList: hdwallet_core_1.bip32ToAddressNList("m/44'/714'/0'/0/0"),
                                chain_id: "Binance-Chain-Nile",
                                account_number: account_number,
                                sequence: sequence,
                                tx: bnbTx,
                            };
                            unsignedTx = {
                                coin: coin,
                                transaction: transaction,
                                HDwalletPayload: binanceTx,
                                verbal: "Thorchain transaction"
                            };
                            rawTx = unsignedTx;
                            return [3 /*break*/, 27];
                        case 26:
                            if (coin === "EOS") {
                                throw Error("666: EOS not supported yet!");
                                // amount = getEosAmount(amount)
                                // //EOS transfer
                                // let unsigned_main = {
                                //     expiration: "2020-04-30T22:00:00.000",
                                //     ref_block_num: 54661,
                                //     ref_block_prefix: 2118672142,
                                //     max_net_usage_words: 0,
                                //     max_cpu_usage_ms: 0,
                                //     delay_sec: 0,
                                //     context_free_actions: [],
                                //     actions: [
                                //         {
                                //             account: "eosio.token",
                                //             name: "transfer",
                                //             authorization: [
                                //                 {
                                //                     actor: addressFrom,
                                //                     permission: "active",
                                //                 },
                                //             ],
                                //             data: {
                                //                 from: addressFrom,
                                //                 to: address,
                                //                 quantity: amount+" EOS",
                                //                 memo: memo,
                                //             },
                                //         },
                                //     ],
                                // };
                                //
                                // log.debug(tag,"unsigned_main: ",JSON.stringify(unsigned_main))
                                //
                                // let chainid_main =
                                //     "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906";
                                // let res = await this.WALLET.eosSignTx({
                                //     addressNList:[ 0x80000000 + 44, 0x80000000 + 194, 0x80000000 + 0 , 0, 0 ],
                                //     chain_id: chainid_main,
                                //     tx: unsigned_main,
                                // });
                                //
                                // log.debug(tag,"**** res: ",res)
                                //
                                // // let broadcastForm = {
                                // //     serializedTransaction:Uint8Array.from(Buffer.from(res.serialized, 'hex')),
                                // //     signatures: [res.eosFormSig]
                                // // }
                                //
                                // let broadcastForm = {
                                //     serializedTransaction:res.serialized,
                                //     signatures: res.eosFormSig
                                // }
                                //
                                // // output.serializedTransaction =  Uint8Array.from(Buffer.from(res.serialized, 'hex'));
                                // // output.signatures = [res.eosFormSig]
                                // // log.debug(tag,"res: ",res)
                                // rawTx = {
                                //     txid:"",
                                //     serialized:res.serialized,
                                //     broadcastBody:broadcastForm
                                // }
                                // log.debug(tag,"rawTx: ",rawTx)
                            }
                            else if (coin === "FIO") {
                                throw Error("666: FIO not supported yet!");
                                // //if name
                                // if(address.indexOf("@") >= 0){
                                //     address = await network.getFioPubkeyFromUsername(address)
                                // }
                                //
                                // //
                                // log.debug(tag,"address: ",address)
                                //
                                // let amountNative = parseFloat(amount) * 100000000
                                // amountNative = parseInt(String(amountNative))
                                // //
                                // log.debug(tag,"fiotx: ",transaction)
                                // const data: FioActionParameters.FioTransferTokensPubKeyActionData = {
                                //     payee_public_key: address,
                                //     amount: String(amountNative),
                                //     max_fee: 2000000000,
                                //     tpid: "",
                                // };
                                //
                                // const res = await WALLET.fioSignTx({
                                //     addressNList: bip32ToAddressNList("m/44'/235'/0'/0/0"),
                                //     actions: [
                                //         {
                                //             account: FioActionParameters.FioTransferTokensPubKeyActionAccount,
                                //             name: FioActionParameters.FioTransferTokensPubKeyActionName,
                                //             data,
                                //         },
                                //     ],
                                // });
                                // log.debug(tag,"res: ",res)
                                //
                                // rawTx = res
                            }
                            else {
                                throw Error("109: coin not yet implemented! coin: " + coin);
                            }
                            _a.label = 27;
                        case 27: return [2 /*return*/, rawTx];
                        case 28:
                            e_12 = _a.sent();
                            log.error(tag, "e: ", e_12);
                            throw e_12;
                        case 29: return [2 /*return*/];
                    }
                });
            });
        };
        this.broadcastTransaction = function (coin, signedTx) {
            return __awaiter(this, void 0, void 0, function () {
                var tag, resultBroadcast;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            tag = TAG + " | broadcastTransaction | ";
                            if (this.isTestnet && coin === 'BTC') {
                                signedTx.coin = "TEST";
                            }
                            else {
                                signedTx.coin = coin;
                            }
                            log.debug(tag, "signedTx: ", signedTx);
                            return [4 /*yield*/, this.pioneerClient.instance.Broadcast(null, signedTx)];
                        case 1:
                            resultBroadcast = _a.sent();
                            log.debug(tag, "resultBroadcast: ", resultBroadcast.data);
                            return [2 /*return*/, resultBroadcast.data];
                    }
                });
            });
        };
    }
    return wallet;
}());
