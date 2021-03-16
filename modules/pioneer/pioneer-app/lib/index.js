"use strict";
/*
      🧭U+1F9ED

      Pioneer APP

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
Object.defineProperty(exports, "__esModule", { value: true });
const TAG = " | app | ";
const pioneer_config_1 = require("@pioneer-platform/pioneer-config");
const uuid_1 = require("uuid");
const CryptoJS = require("crypto-js");
const bip39 = require(`bip39`);
const fs = require("fs-extra");
const bcrypt = require("bcryptjs");
const mkdirp = require("mkdirp");
const log = require("@pioneer-platform/loggerdog")();
const prettyjson = require('prettyjson');
const queue = require('queue');
const pendingQueue = queue({ pending: [] });
const approvedQueue = queue({ approved: [] });
//@pioneer-platform/pioneer-events
let Events = require("@pioneer-platform/pioneer-events");
let { getPaths, get_address_from_xpub } = require('@pioneer-platform/pioneer-coins');
let paths = getPaths();
// @ts-ignore
const webcrypto_1 = require("@peculiar/webcrypto");
const native = __importStar(require("@bithighlander/hdwallet-native"));
let Pioneer = require('@pioneer-platform/pioneer');
let Network = require("@pioneer-platform/pioneer-client");
let Hardware = require("@pioneer-platform/pioneer-hardware");
let wait = require('wait-promise');
let sleep = wait.sleep;
const ONLINE = [];
let AUTH_TOKEN;
let IS_LOGGED_IN = false;
let WALLET_CONTEXT = 0;
let ACCOUNT = '';
let WALLET_PUBLIC = {};
let WALLET_PRIVATE = {};
let WALLET_PUBKEYS = [];
let WALLET_PASSWORD = "";
let APPROVE_QUEUE = [];
//
let SOCKET_CLIENT;
//
let TOTAL_VALUE_USD_LOADED = 0;
let WALLETS_LOADED = [];
let IS_SEALED = false;
let MASTER_MAP = {};
let WALLET_VALUE_MAP = {};
let CONTEXT_WALLET_SELECTED;
//urlSpec
let URL_PIONEER_SPEC = process.env['URL_PIONEER_SPEC'];
let URL_PIONEER_SOCKET = process.env['URL_PIONEER_SOCKET'];
let urlSpec = URL_PIONEER_SPEC;
let KEEPKEY;
let network;
//chingle
// let opts:any = {}
// var player = require('play-sound')(opts = {})
let AUTONOMOUS = false;
module.exports = {
    init: function (config, isTestnet) {
        return init_wallet(config, isTestnet);
    },
    initConfig: function (language) {
        return pioneer_config_1.innitConfig(language);
    },
    getAutonomousStatus: function () {
        return AUTONOMOUS;
    },
    autonomousOn: function () {
        AUTONOMOUS = true;
        return AUTONOMOUS;
    },
    autonomousOff: function () {
        AUTONOMOUS = false;
        return AUTONOMOUS;
    },
    getPending: function () {
        return pendingQueue;
    },
    getAproved: function () {
        return approvedQueue;
    },
    getConfig: function () {
        return pioneer_config_1.getConfig();
    },
    updateConfig: function (language) {
        return pioneer_config_1.updateConfig(language);
    },
    createWallet: function (type, wallet) {
        return create_wallet(type, wallet);
    },
    backupWallet: function () {
        return backup_wallet();
    },
    getWallet: function () {
        return pioneer_config_1.getWallet();
    },
    getWallets: function () {
        return WALLETS_LOADED;
    },
    getWalletNames: function () {
        return pioneer_config_1.getWallets();
    },
    selectWallet: function (selection) {
        for (let i = 0; i < WALLETS_LOADED.length; i++) {
            let wallet = WALLETS_LOADED[i];
            log.debug("wallet: ", wallet);
            //if(wallet)
        }
        return true;
    },
    unlockWallet: function (wallet, password) {
        return unlock_wallet(wallet, password);
    },
    migrateWallet: function () {
        return true;
    },
    importKey: function () {
        return true;
    },
    setPassword: function (pw) {
        WALLET_PASSWORD = pw;
        return true;
    },
    setAuth: function (auth) {
        AUTH_TOKEN = auth;
        return true;
    },
    pairKeepkey: function () {
        return pair_keepkey();
    },
    // getAccountInfo: function (asset:string,account:string) {
    //     return network.getAccountInfo(asset,account);
    // },
    // getBlockCount: function (coin:string) {
    //     return network.getAccountInfo(coin);
    // },
    // login: function () {
    //     return login_shapeshift();
    // },
    // loginStatus: function () {
    //     return IS_LOGGED_IN;
    // },
    getAuth: function () {
        return AUTH_TOKEN;
    },
    getAccount: function () {
        return ACCOUNT;
    },
    pair: function (code) {
        return pair_sdk_user(code);
    },
    forget: function () {
        return Pioneer.forget();
    },
    /**
     *    User Ecosystem
     *
     *
     */
    getUsers: function () {
        return [];
    },
    pingUser: function () {
        return [];
    },
    sendRequest: function (sender, receiver, amount, asset) {
        //TODO use invoke
        let payment_request = {
            sender,
            receiver,
            amount,
            asset
        };
        //emit
        return SOCKET_CLIENT.emit('message', payment_request);
    },
    /**
     *    App Ecosystem
     *
     *
     */
    listAppsRemote: function () {
        return list_apps_remote();
    },
    listAppsLocal: function () {
        return pioneer_config_1.getApps();
    },
    downloadApp: function (name) {
        return download_app(name);
    },
    installApp: function (name) {
        return install_app(name);
    },
    /**
     *    Keepkey
     *
     *
     */
    // unlockKeepkey: async function () {
    //     return unlock_keepkey();
    // },
    // showPinHelper: async function () {
    //     return show_pin_helper();
    // },
    // enterPin: async function (pin:string) {
    //     return enter_keepkey_pin(pin);
    // },
    // getKeepkeyInfo: async function () {
    //     return get_keepkey_info();
    // },
    // getLatestFirmware: async function () {
    //     return getLatestFirmwareData();
    // },
    /**
     *    Wallet
     *
     *
     */
    // getWalletPriv: async function () {
    //     return WALLET_PRIVATE;
    // },
    // getWalletPub: async function () {
    //     return WALLET_PUBLIC;
    // },
    // getWalletPubkeys: async function () {
    //     return WALLET_PUBKEYS;
    // },
    getInfo: function (verbosity) {
        return __awaiter(this, void 0, void 0, function* () {
            return get_wallet_summary(verbosity);
        });
    },
    //TODO
    // getNewAddress: async function (coin:string) {
    //     return pioneer.getNewAddress(coin);
    // },
    /**
     *    EOS
     *
     *
     */
    // getEosPubkey: async function (coin:string) {
    //     return pioneer.getNewAddress(coin);
    // },
    // getEosAccountsByPubkey: async function (coin:string) {
    //     return pioneer.getNewAddress(coin);
    // },
    // validateEosUsername: async function (coin:string) {
    //     return pioneer.getNewAddress(coin);
    // },
    // registerEosUsername: async function (coin:string) {
    //     return pioneer.getNewAddress(coin);
    // },
    /*
        FIO commands
    */
    getFioAccountInfo: function (username) {
        return WALLETS_LOADED[WALLET_CONTEXT].getFioAccountInfo(username);
    },
    getFioPubkey: function () {
        return WALLETS_LOADED[WALLET_CONTEXT].getFioPubkey();
    },
    getFioAccountsByPubkey: function (pubkey) {
        return WALLETS_LOADED[WALLET_CONTEXT].getFioAccountsByPubkey(pubkey);
    },
    validateFioUsername: function (username) {
        return WALLETS_LOADED[WALLET_CONTEXT].validateFioUsername(username);
    },
    registerFioUsername: function () {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const open = require("open");
                let pubkey = yield Pioneer.getFioPubkey();
                open("https://reg.fioprotocol.io/ref/shapeshift?publicKey=" + pubkey);
                return true;
            }
            catch (e) {
                log.error(e);
            }
        });
    },
    //TODO send payment request
    // sendFioRequest: function (walletId:string,format:string) {
    //     return send_fio_request(walletId, format);
    // },
    //view all wallets
    //view current wallet
    //switch wallets
    //create new (move old)
    //list installed plugins
    //list available plugins
    //install plugin
    //export wallet
    exportWallet: function (walletId, format) {
        return export_wallet(walletId, format);
    },
    // playChingle: function () {
    //   player.play('./assets/chaching.mp3', function(err:any){
    //     if (err) throw err
    //   })
    //   return true;
    // },
    // getBalance: function (coin:string) {
    //     return get_balance(coin);
    // },
    // getBalances: function () {
    //     return get_balances();
    // },
    // getAddress: function (coin:string) {
    //     return get_address(coin);
    // },
    // getMaster: function (coin:string) {
    //     return Pioneer.getMaster(coin);
    // },
    //TODO
    // listSinceLastblock: function (coin:string,block:string) {
    //     return pioneer.listSinceLastblock(coin,block);
    // },
    sendToAddress: function (coin, address, amount, memo) {
        return __awaiter(this, void 0, void 0, function* () {
            return send_to_address(coin, address, amount, memo);
        });
    },
    broadcastTransaction: function (coin, rawTx) {
        return __awaiter(this, void 0, void 0, function* () {
            return broadcast_transaction(coin, rawTx);
        });
    },
    //TODO
    // getStakes: function (coin:string) {
    //     return pioneer.getStakes(coin);
    // },
    getCoins: function () {
        return ONLINE;
    },
};
let pair_sdk_user = function (code) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | unlock_wallet | ";
        try {
            //send code
            log.info(tag, "network: ", network);
            log.info(tag, "network: ", network.instance);
            let result = yield network.instance.Pair(null, { code });
            return result.data;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let unlock_wallet = function (wallet, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | unlock_wallet | ";
        try {
            //verify config hash match's wallet
            //verify password match's hash
            //if new pw auto migrate
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let pair_keepkey = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | pair_keepkey | ";
        try {
            KEEPKEY = yield Hardware.start();
            let info = yield Hardware.info();
            log.info("info: ", info);
            let deviceId = info.features.deviceId;
            //get lock status
            let lockStatus = yield Hardware.isLocked();
            log.info("lockStatus: ", lockStatus);
            if (!lockStatus) {
                //get pubkeys
                let pubkeys = yield Hardware.getPubkeys();
                console.log("pubkeys: ", prettyjson.render(pubkeys));
            }
            else {
                //
                log.info(tag, "Locked!");
            }
            let pubkeys = yield Hardware.getPubkeys();
            console.log("pubkeys: ", prettyjson.render(pubkeys));
            //get config
            let config = pioneer_config_1.getConfig();
            log.debug(tag, "config: ", config);
            if (!config || Object.keys(config).length === 0) {
                yield pioneer_config_1.innitConfig("english");
                config = pioneer_config_1.getConfig();
            }
            //enable hardware
            let paired = config.paired;
            if (!paired)
                paired = [];
            if (paired.indexOf(deviceId) === -1) {
                paired.push(deviceId);
                pioneer_config_1.updateConfig({ paired });
            }
            pubkeys.deviceId = deviceId;
            //createWallet
            yield create_wallet('hardware', pubkeys);
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let get_wallet_summary = function (verbosity) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | get_wallet_summary | ";
        try {
            let info = {
                totalUsd: TOTAL_VALUE_USD_LOADED,
                wallets: [],
            };
            // let info = await pioneer.getInfo()
            //
            // //console.log("info: ",info)
            // if(info.totalValueUsd){
            //     console.log("info: ",info.totalValueUsd)
            // } else {
            //     console.error("Failed to get info!")
            // }
            //
            // // instantiate
            // var table = new Table({
            //     head: ['ASSET', 'amount','value']
            //     , colWidths: [10, 20, 20]
            // });
            //
            // let coins = Object.keys(info.balances)
            // //if > 1$
            // for(let i = 0; i < coins.length; i++){
            //     let coin = coins[i]
            //     log.debug(tag,"coin: ",coin)
            //     log.debug(tag,"info.balances[coin]: ",info.balances[coin])
            //     log.debug(tag,"info.valueUsds[coin]: ",info.valueUsds[coin])
            //
            //     if(parseFloat(info.valueUsds[coin]) > 1){
            //         table.push([coin,info.balances[coin],info.valueUsds[coin]])
            //     }
            // }
            //
            // table = table.sort(function(a:any, b:any) {
            //     return b[2] - a[2];
            // });
            //
            // log.debug("\n \n \n Your Wallet info! \n "+chalk.yellowBright("( ₿ )")+ "\n \n Total Value (USD): " +chalk.blue(info.totalValueUsd)+" \n \n table: \n",table.toString().trim()+"\n \n \n \n \n")
            return info;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let list_apps_remote = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | list_apps | ";
        try {
            let appList = yield network.apps();
            return appList;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let install_app = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | install_app | ";
        try {
            return true;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let download_app = function (name) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | download_app | ";
        try {
            return true;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let export_wallet = function (walletId, format) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | export_wallet | ";
        try {
            let output;
            if (format === 'citadel' || format === 'keepkey') {
                //if(!outDir) outDir = pioneerPath
                let outDir = pioneer_config_1.pioneerPath;
                let isCreated = yield mkdirp(outDir);
                log.debug("create path: ", isCreated);
                //verify path
                //load seed
                //build wallet
                log.debug(tag, "WALLET_PUBLIC: ", WALLET_PUBLIC);
                log.debug(tag, "WALLET_PRIVATE: ", WALLET_PRIVATE);
                if (Object.keys(WALLET_PUBLIC).length === 0)
                    throw Error("102: Failed to find WALLET_PUBLIC");
                if (Object.keys(WALLET_PUBLIC).length === 0)
                    throw Error("103: Failed to find WALLET_PRIVATE");
                let walletInfo = {
                    WALLET_ID: walletId,
                    TYPE: 'full',
                    CREATED: new Date().getTime(),
                    VERSION: "0.1.3",
                    WALLET_PUBLIC,
                    WALLET_PRIVATE,
                    WALLET_PUBKEYS
                };
                let walletInfoPub = {
                    WALLET_ID: walletId,
                    TYPE: 'watch',
                    CREATED: new Date().getTime(),
                    VERSION: "0.1.3",
                    WALLET_PUBLIC,
                    WALLET_PUBKEYS
                };
                //write to foxpath, name wallet walletId
                let writePathPub = outDir + "/" + walletId + ".watch.wallet.json";
                log.debug(tag, "writePathPub: ", writePathPub);
                let writeSuccessPub = fs.writeFileSync(writePathPub, JSON.stringify(walletInfoPub));
                //for each coin
                let coins = Object.keys(walletInfo.WALLET_PUBLIC);
                let configFileEnv = "";
                configFileEnv = configFileEnv + "WALLET_ID=" + walletInfo.WALLET_ID + "\n";
                configFileEnv = configFileEnv + "TYPE=" + walletInfo.TYPE + "\n";
                configFileEnv = configFileEnv + "VERSION=" + walletInfo.VERSION + "\n";
                //write .env //TODO depricated
                for (let i = 0; i < coins.length; i++) {
                    let coin = coins[i];
                    log.debug(tag, "coin: ", coin);
                    let keypairInfo = WALLET_PUBLIC[coin];
                    log.debug(tag, "keypairInfo: ", keypairInfo);
                    //if(coin === 'EOS'){}
                    //if eth
                    configFileEnv = configFileEnv + "WALLET_" + coin + "_MASTER=" + keypairInfo.master + "\n";
                    //if type xpub
                    if (keypairInfo.type === 'xpub') {
                        configFileEnv = configFileEnv + "WALLET_" + coin + "_XPUB=" + keypairInfo.xpub + "\n";
                    }
                }
                log.debug(tag, "configFileEnv: ", configFileEnv);
                //write to foxpath, name wallet walletId
                let writePathEnv = outDir + "/" + walletId + ".env";
                log.debug(tag, "writePath: ", writePathEnv);
                let writeSuccessEnv = fs.writeFileSync(writePathEnv, configFileEnv);
                log.debug(tag, "writeSuccessEnv: ", writeSuccessEnv);
                //backupWallet(outDir,hash,seed_encrypted,walletId)
            }
            else {
                //
                throw Error("format not supported " + format);
            }
            return output;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let get_balances = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | get_address | ";
        try {
            //use apps
            let output = yield Pioneer.getInfo();
            return output.balances;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let get_balance = function (coin) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | get_address | ";
        try {
            coin = coin.toUpperCase();
            //use apps
            let output = yield Pioneer.getBalance(coin);
            return output;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let broadcast_transaction = function (coin, rawTx) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | broadcast_transaction | ";
        try {
            coin = coin.toUpperCase();
            let result;
            //tier 1 apps
            //if token, set network to ETH
            log.debug("Broadcasting tx coin: ", coin, " rawTx: ", rawTx);
            result = yield Pioneer.broadcastTransaction('ETH', rawTx);
            log.debug(tag, "result: ", result);
            return result;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let send_to_address = function (coin, address, amount, memo) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | send_to_address | ";
        try {
            coin = coin.toUpperCase();
            log.info(tag, "Pioneer: ", Pioneer);
            log.debug("params: ", { coin, address, amount });
            let rawTx = yield WALLETS_LOADED[WALLET_CONTEXT].sendToAddress(coin, address, amount, null);
            log.debug(tag, "rawTx: ", rawTx);
            //open txid?
            //broadcast
            return rawTx;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
let get_address = function (coin) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | get_address | ";
        try {
            coin = coin.toUpperCase();
            //use apps
            let output = yield Pioneer.getMaster(coin);
            return output;
        }
        catch (e) {
            console.error(tag, "Error: ", e);
            throw e;
        }
    });
};
//Build Seed
function standardRandomBytesFunc(size) {
    /* istanbul ignore if: not testable on node */
    return CryptoJS.lib.WordArray.random(size).toString();
}
let backup_wallet = function () {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | create_wallet | ";
        try {
            //TODO validate seed
            //does wallet already exist?
            const wallet = yield pioneer_config_1.getWallet();
            if (!wallet)
                throw Error("Wallet not found!");
            //save wallet in new dir
            let time = new Date().getTime();
            let filename = "backup:" + time;
            let passwordHash = wallet.password;
            let encryptedSeed = wallet.vault;
            //
            //TODO fixme
            //let success = await backupWallet("backup",passwordHash ,encryptedSeed, filename)
            // let success = sa
            //return success;
        }
        catch (e) {
            if (e.response && e.response.data) {
                log.error(tag, "Error: ", e.response.data);
            }
            else {
                log.error(tag, "Error: ", e);
            }
            throw e;
        }
    });
};
let create_wallet = function (type, wallet, isTestnet) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = " | create_wallet | ";
        try {
            if (!isTestnet)
                isTestnet = false;
            //if software
            switch (type) {
                case "software":
                    //TODO validate seed
                    if (!wallet.mnemonic)
                        throw Error("101: mnemonic required!");
                    if (!wallet.password)
                        throw Error("102: password required!");
                    if (!wallet.username)
                        wallet.username = "defaultUser:" + uuid_1.v4();
                    //filename
                    let filename = wallet.username + ".wallet.json";
                    //does wallet exist
                    let alreadyExists = pioneer_config_1.getWallet(filename);
                    log.debug(tag, "alreadyExists: ", alreadyExists);
                    //pw hash
                    const hash = bcrypt.hashSync(wallet.password, 10);
                    //if doesnt exist write file
                    if (!alreadyExists) {
                        // @ts-ignore
                        globalThis.crypto = new webcrypto_1.Crypto();
                        // @ts-ignore
                        const engine = new native.crypto.engines.WebCryptoEngine();
                        // @ts-ignore
                        const walletCrypto = new native.crypto.EncryptedWallet(engine);
                        const result = yield walletCrypto.init(wallet.username, wallet.password);
                        yield walletCrypto.createWallet(wallet.mnemonic);
                        let seed_encrypted = result.encryptedWallet;
                        //
                        log.debug(tag, "seed_encrypted: ", seed_encrypted);
                        log.debug(tag, "hash: ", hash);
                        let walletNew = {
                            isTestnet,
                            TYPE: "citadel",
                            seed_encrypted,
                            hash,
                            username: wallet.username,
                            filename
                        };
                        if (wallet.temp)
                            walletNew.temp = wallet.temp;
                        // @ts-ignore
                        const success = yield pioneer_config_1.initWallet(walletNew);
                    }
                    else {
                        throw Error("already exists");
                        //TODO verify?
                        //createWallet
                    }
                    break;
                case "hardware":
                    log.debug(tag, "wallet hardware: ", wallet);
                    if (!wallet.deviceId)
                        throw Error("102: deviceId require for keepkey wallets!");
                    if (!wallet.wallet.WALLET_PUBLIC)
                        throw Error("103: WALLET_PUBLIC require for keepkey wallets!");
                    log.debug("hardware watch create!");
                    let walletFileNew = {
                        isTestnet,
                        WALLET_ID: "keepkey:" + wallet.deviceId,
                        TYPE: 'keepkey',
                        CREATED: new Date().getTime(),
                        VERSION: "0.1.3",
                        WALLET_PUBLIC: wallet.wallet.WALLET_PUBLIC,
                        WALLET_PUBKEYS: wallet.pubkeys
                    };
                    walletFileNew.pubkeys = wallet.pubkeys;
                    walletFileNew.KEEPKEY = true;
                    walletFileNew.DEVICE_ID = wallet.deviceId;
                    walletFileNew.LABEL = wallet.label;
                    walletFileNew.deviceId = wallet.deviceId;
                    walletFileNew.filename = wallet.deviceId + ".watch.wallet.json";
                    // @ts-ignore
                    const success = yield pioneer_config_1.initWallet(walletFileNew);
                    break;
                default:
                    throw Error("unhandled wallet type! " + type);
                    break;
            }
            return true;
        }
        catch (e) {
            if (e.response && e.response.data) {
                log.error(tag, "Error: ", e.response.data);
            }
            else {
                log.error(tag, "Error: ", e);
            }
            throw e;
        }
    });
};
let init_wallet = function (config, isTestnet) {
    return __awaiter(this, void 0, void 0, function* () {
        let tag = TAG + " | init_wallet | ";
        try {
            if (config.isTestnet)
                isTestnet = true;
            log.info(tag, "isTestnet: ", isTestnet);
            let output = {};
            //is keepkey connected?
            //init wallet
            if (config.keepkey) {
                //TODO testnet flag?
                let KEEPKEY = yield Hardware.start();
                KEEPKEY.events.on('event', function (event) {
                    return __awaiter(this, void 0, void 0, function* () {
                        log.info("EVENT: ", event);
                        //attempt to start
                        if (event.event === 'connect') {
                            yield sleep(2000);
                            //get info
                            let info = yield Hardware.info();
                            log.info(tag, "2info: ", info);
                        }
                        //TODO if no wallet found
                        //TODO offer unlock
                        //TODO collect pin
                    });
                });
                //if hardware connected
                let info = yield Hardware.info();
                log.info("hardwre info: ", info);
            }
            //get wallets
            let wallets = yield pioneer_config_1.getWallets();
            log.debug(tag, "wallets: ", wallets);
            //TODO if testnet flag only show testnet wallets!
            output.walletFiles = wallets;
            output.wallets = [];
            if (!config.username)
                config.username = "temp:";
            //if no password
            if (!config.password)
                config.password = config.temp;
            if (!config.password)
                throw Error("101: password required!");
            if (!config.username)
                throw Error("102: username required!");
            if (!config.queryKey)
                throw Error("103: queryKey required!");
            if (config.urlSpec) {
                URL_PIONEER_SPEC = config.urlSpec;
            }
            if (!URL_PIONEER_SPEC)
                URL_PIONEER_SPEC = "https://pioneers.dev/spec/swagger.json";
            if (config.pioneerSocket) {
                URL_PIONEER_SOCKET = config.pioneerSocket;
            }
            if (!URL_PIONEER_SOCKET)
                URL_PIONEER_SOCKET = "wss://pioneers.dev";
            network = new Network(URL_PIONEER_SPEC, {
                queryKey: config.queryKey
            });
            network = yield network.init();
            if (!wallets) {
                throw Error(" No wallets found! ");
                //create wallet
                // if(info.features){
                //     let walletName = info.features.deviceId + ".wallet.json"
                //     //if locked
                //     //let isLocked = Hardware.is
                //
                // }
                //hardware
            }
            //Load wallets if setup
            for (let i = 0; i < wallets.length; i++) {
                let walletName = wallets[i];
                log.debug(tag, "walletName: ", walletName);
                let walletFile = pioneer_config_1.getWallet(walletName);
                log.debug(tag, "walletFile: ", walletFile);
                if (!walletFile.TYPE)
                    walletFile.TYPE = walletFile.type;
                if (walletFile.TYPE === 'keepkey') {
                    if (!walletFile.pubkeys)
                        throw Error("102: invalid keepkey wallet!");
                    //if(!walletFile.wallet) throw Error("103: invalid keepkey wallet!")
                    let configPioneer = {
                        isTestnet,
                        hardware: true,
                        vendor: "keepkey",
                        pubkeys: walletFile.pubkeys,
                        wallet: walletFile,
                        username: walletFile.username,
                        pioneerApi: true,
                        spec: URL_PIONEER_SPEC,
                        queryKey: config.queryKey,
                        auth: process.env['SHAPESHIFT_AUTH'] || 'lol',
                        authProvider: 'shapeshift'
                    };
                    log.debug(tag, "KEEPKEY init config: ", configPioneer);
                    let wallet = new Pioneer('keepkey', configPioneer, isTestnet);
                    WALLETS_LOADED.push(wallet);
                    //init
                    let walletClient = yield wallet.init();
                    //info
                    let info = yield wallet.getInfo();
                    info.name = walletFile.username;
                    info.type = 'keepkey';
                    output.wallets.push(info);
                    log.debug(tag, "info: ", info.totalValueUsd);
                    //write pubkeys
                    let writePathPub = pioneer_config_1.pioneerPath + "/" + info.name + ".watch.wallet.json";
                    log.info(tag, "writePathPub: ", writePathPub);
                    let writeSuccessPub = fs.writeFileSync(writePathPub, JSON.stringify(info.public));
                    log.info(tag, "writeSuccessPub: ", writeSuccessPub);
                    //global total valueUSD
                    TOTAL_VALUE_USD_LOADED = TOTAL_VALUE_USD_LOADED + info.totalValueUsd;
                    WALLET_VALUE_MAP[configPioneer.username] = info.totalValueUsd;
                }
                else if (walletFile.TYPE === 'seedwords') {
                    //decrypt
                    // @ts-ignore
                    globalThis.crypto = new webcrypto_1.Crypto();
                    // @ts-ignore
                    const engine = new native.crypto.engines.WebCryptoEngine();
                    // @ts-ignore
                    const walletCrypto = new native.crypto.EncryptedWallet(engine);
                    //if wallet has pw, use it
                    if (walletFile.password)
                        config.password = walletFile.password;
                    const resultOut = yield walletCrypto.init(walletFile.username, config.password, walletFile.vault);
                    if (!walletFile.vault)
                        throw Error("Wallet vault not found! ");
                    let mnemonic = yield resultOut.decrypt();
                    //TODO validate seed
                    if (!mnemonic)
                        throw Error("unable to start wallet! invalid seed!");
                    // log.debug(tag,"mnemonic: ",mnemonic)
                    //load wallet to global
                    let configPioneer = {
                        isTestnet,
                        mnemonic,
                        username: walletFile.username,
                        pioneerApi: true,
                        auth: process.env['SHAPESHIFT_AUTH'] || 'lol',
                        authProvider: 'shapeshift',
                        spec: URL_PIONEER_SPEC,
                        queryKey: config.queryKey
                    };
                    log.info(tag, "configPioneer: ", configPioneer);
                    log.info(tag, "isTestnet: ", isTestnet);
                    let wallet = new Pioneer('pioneer', configPioneer, isTestnet);
                    WALLETS_LOADED.push(wallet);
                    //init
                    let walletClient = yield wallet.init();
                    //info
                    let info = yield wallet.getInfo();
                    info.name = walletFile.username;
                    info.type = 'software';
                    output.wallets.push(info);
                    log.debug(tag, "info: ", info.totalValueUsd);
                    let walletInfoPub = {
                        WALLET_ID: walletFile.username,
                        TYPE: 'watch',
                        CREATED: new Date().getTime(),
                        VERSION: "0.1.3",
                        WALLET_PUBLIC: info.public,
                        WALLET_PUBKEYS: info.pubkeys
                    };
                    let writePathPub = pioneer_config_1.pioneerPath + "/" + info.name + ".watch.wallet.json";
                    log.info(tag, "writePathPub: ", writePathPub);
                    let writeSuccessPub = fs.writeFileSync(writePathPub, JSON.stringify(walletInfoPub));
                    log.info(tag, "writeSuccessPub: ", writeSuccessPub);
                    //
                    log.info(tag, "info: ", info);
                    //global total valueUSD
                    TOTAL_VALUE_USD_LOADED = TOTAL_VALUE_USD_LOADED + info.totalValueUsd;
                    WALLET_VALUE_MAP[configPioneer.username] = info.totalValueUsd;
                }
                else {
                    throw Error("unhandled wallet type! " + walletFile.TYPE);
                }
            }
            output.TOTAL_VALUE_USD_LOADED = TOTAL_VALUE_USD_LOADED;
            output.WALLET_VALUE_MAP = WALLET_VALUE_MAP;
            log.debug(tag, "TOTAL_VALUE_USD_LOADED: ", TOTAL_VALUE_USD_LOADED);
            //sub all to events
            let configEvents = {
                username: config.username,
                queryKey: config.queryKey,
                pioneerWs: URL_PIONEER_SOCKET
            };
            //sub ALL events
            let events = yield Events.init(configEvents);
            //on blocks update lastBlockHeight
            //on payments update balances
            //on on invocations add to queue
            events.on('message', function (request) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log("message: ", request);
                    //TODO filter invocations by subscribers
                    //TODO autonomousOn/Off
                    // @ts-ignore
                    let txid = yield send_to_address(request.coin, request.address, request.amount, request.memo);
                    console.log("txid: ", txid);
                    //push txid to invocationId
                    //update status on server
                    //add to history
                });
            });
            output.events = events;
            return output;
        }
        catch (e) {
            if (e.response && e.response.data) {
                log.error(tag, "Error: ", e.response.data);
            }
            else {
                log.error(tag, "Error: ", e);
            }
            throw e;
        }
    });
};
