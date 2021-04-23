/*
      🧭U+1F9ED

      Pioneer APP

 */

const TAG = " | app | ";

import {
    getConfig,
    getWallet,
    getWallets,
    walletDataDir,
    pioneerConfig,
    pioneerPath,
    getApps,
    initWallet,
    innitConfig,
    updateConfig,
    getWalletPublic
} from "@pioneer-platform/pioneer-config";
import {v4 as uuidv4} from 'uuid';

const CryptoJS = require("crypto-js");
const bip39 = require(`bip39`);
const fs = require("fs-extra");
const bcrypt = require("bcryptjs");
const mkdirp = require("mkdirp");
const log = require("@pioneer-platform/loggerdog")()
const prettyjson = require('prettyjson');
const queue = require('queue')

const pendingQueue = queue({ pending: [] })
const approvedQueue = queue({ approved: [] })

//dbs
let nedb = require("@pioneer-platform/nedb")

//@pioneer-platform/pioneer-events
let Events = require("@pioneer-platform/pioneer-events")

// let {
//     getPaths,
//     get_address_from_xpub
// } = require('@pioneer-platform/pioneer-coins')

// @ts-ignore
import { Crypto } from "@peculiar/webcrypto";
import * as native from "@bithighlander/hdwallet-native";
let Pioneer = require('@pioneer-platform/pioneer')
let Network = require("@pioneer-platform/pioneer-client")

//hardware
let Hardware = require("@pioneer-platform/pioneer-hardware")

let wait = require('wait-promise');
let sleep = wait.sleep;

const ONLINE: never[] = [];
let AUTH_TOKEN: string;
let IS_LOGGED_IN = false;

let DATABASES:any = {}

let WALLET_CONTEXT = ""
let ACCOUNT = ''
let WALLET_PUBLIC:any = {}
let WALLET_PRIVATE:any = {}
let WALLET_PUBKEYS:any = []
let WALLET_PASSWORD:any = ""
let APPROVE_QUEUE:any = []
let ALL_PENDING:any = []
//
let SOCKET_CLIENT:any

//
let TOTAL_VALUE_USD_LOADED:number = 0
let WALLETS_LOADED: any = {}
let IS_SEALED =false
let MASTER_MAP:any = {}
let WALLET_VALUE_MAP:any = {}
let CONTEXT_WALLET_SELECTED
//urlSpec
let URL_PIONEER_SPEC = process.env['URL_PIONEER_SPEC'] || 'https://pioneers.dev/spec/swagger.json'
let URL_PIONEER_SOCKET = process.env['URL_PIONEER_SOCKET'] || 'wss://pioneers.dev'

let urlSpec = URL_PIONEER_SPEC

let KEEPKEY:any
let network:any
//chingle
// let opts:any = {}
// var player = require('play-sound')(opts = {})

let AUTONOMOUS = false

module.exports = {
    init: function (config: any,isTestnet?:boolean) {
        return init_wallet(config,isTestnet);
    },
    initConfig: function (language: any) {
        return innitConfig(language);
    },
    context: function () {
        return WALLET_CONTEXT;
    },
    getAutonomousStatus: function () {
        return AUTONOMOUS;
    },
    autonomousOn: function () {
        AUTONOMOUS = true
        return AUTONOMOUS;
    },
    autonomousOff: function () {
        AUTONOMOUS = false
        return AUTONOMOUS;
    },
    hardwareStart: function () {
        return Hardware.start();
    },
    hardwareState: function () {
        return Hardware.state();
    },
    hardwareLocked: function () {
        return Hardware.isLocked();
    },
    hardwareInfo: function () {
        return Hardware.info();
    },
    hardwareWipe: function () {
        return Hardware.wipe();
    },
    hardwareLoad: function (mnemonic:string) {
        return Hardware.load(mnemonic);
    },
    hardwareShowPin: function () {
        return Hardware.displayPin();
    },
    hardwareEnterPin: function (pin:string) {
        return Hardware.enterPin(pin);
    },
    // getPending: function () {
    //     return pendingQueue;
    // },
    // getAproved: function () {
    //     return approvedQueue;
    // },
    approveTransaction: function (context:string,invocationId:string) {
        return approve_transaction(context,invocationId);
    },
    getConfig: function () {
        return getConfig();
    },
    updateConfig: function (language:string) {
        return updateConfig(language);
    },
    createWallet: function (type:string,wallet:any) {
        return create_wallet(type,wallet);
    },
    backupWallet: function () {
        return backup_wallet();
    },
    getWallet: function () {
        return getWallet();
    },
    getWallets: function () {
        return WALLETS_LOADED;
    },
    getWalletNames: function () {
        return getWallets();
    },
    selectWallet: function (selection:string) {
        if(WALLETS_LOADED[selection]){
            WALLET_CONTEXT = selection
            return true;
        } else {
            throw Error("invalid wallet name! selection: "+selection)
        }
    },
    unlockWallet: function (wallet:string,password:string) {
        return unlock_wallet(wallet,password);
    },
    migrateWallet: function () {
        return true;
    },
    importKey: function () {
        return true;
    },
    setPassword: function (pw: string) {
        WALLET_PASSWORD = pw;
        return true;
    },
    setAuth: function (auth: string) {
        AUTH_TOKEN = auth;
        return true;
    },
    pairKeepkey: function (wallet:any) {
        return pair_keepkey(wallet);
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
    pair: function (code:string) {
        return pair_sdk_user(code);
    },
    // forget: function () {
    //     return Pioneer.forget();
    // },
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
    sendRequest: function (sender:string,receiver:string,amount:string,asset:string) {
        //TODO use invoke
        let payment_request = {
            sender,
            receiver,
            amount,
            asset
        }
        //emit
        return SOCKET_CLIENT.emit('message',payment_request);
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
        return getApps();
    },
    downloadApp: function (name:string) {
        return download_app(name);
    },
    installApp: function (name:string) {
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
    // getInfo: async function (verbosity:any) {
    //     return get_wallet_summary(verbosity);
    // },
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
    // getFioAccountInfo: function (username:string) {
    //     return WALLETS_LOADED[WALLET_CONTEXT].getFioAccountInfo(username);
    // },
    // getFioPubkey: function () {
    //     return WALLETS_LOADED[WALLET_CONTEXT].getFioPubkey();
    // },
    // getFioAccountsByPubkey: function (pubkey:string) {
    //     return WALLETS_LOADED[WALLET_CONTEXT].getFioAccountsByPubkey(pubkey);
    // },
    // validateFioUsername: function (username:string) {
    //     return WALLETS_LOADED[WALLET_CONTEXT].validateFioUsername(username);
    // },
    registerFioUsername: async function () {
        try{
            const open = require("open");
            let pubkey = await Pioneer.getFioPubkey()
            open("https://reg.fioprotocol.io/ref/shapeshift?publicKey="+pubkey)
            return true;
        }catch(e){
            log.error(e)
        }
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
    exportWallet: function (walletId:string,format:string) {
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
    // sendToAddress: async function (coin:string,address:string,amount:string,memo?:string) {
    //     return send_to_address(coin,address,amount,memo);
    // },
    // broadcastTransaction: async function (coin:string,rawTx:string) {
    //     return broadcast_transaction(coin,rawTx);
    // },
    //TODO
    // getStakes: function (coin:string) {
    //     return pioneer.getStakes(coin);
    // },

    getCoins: function () {
        return ONLINE;
    },
    //TODO
    // viewSeed: function () {
    //     return WALLET_SEED;
    // },
    sendToAddress: function (intent:any) {
      return send_to_address(intent);
    },

    //keepkey
    //download firmware
    //upload firmware
    //


    //wallet
    // get address x coin
    // sendToAddress
    // getTxHistory

    //Nodes
    //download x node
    //start node

    //Autopilot

    //start wallet REST api

};

/*

    approve_transaction

    Notes:
        Source:
        Dapp:
        amountUSD known:
        expected Fee in USD:

 */

let approve_transaction = async function (context:string,invocationId:string) {
    let tag = " | unlock_wallet | ";
    try {
        let transactionViewFinal:any = {}
        let allUnapproved = []
        //get all pending from all contexts
        let wallets = Object.keys(WALLETS_LOADED)
        for(let i = 0; i < wallets.length; i++){
            let wallet = wallets[i]
            //
            let unApproved = WALLETS_LOADED[wallet].getApproveQueue()
            for(let j = 0; j < unApproved.length; j++){
                let unsignedTransaction = unApproved[j]
                allUnapproved.push(unsignedTransaction)
            }
        }

        //if context dont match
        if(WALLET_CONTEXT !== context){
            log.info(tag,"Signing transaction for wallet out of context!")
            transactionViewFinal.outOfContext = true
        }

        //add warning to view
        for(let i = 0; i < allUnapproved.length; i++){
            let unsignedTransaction = allUnapproved[i]
            if(unsignedTransaction.invocationId === invocationId){
                transactionViewFinal.unsignedTransaction = unsignedTransaction
                //approve transaction
                let signedTx = await WALLETS_LOADED[WALLET_CONTEXT].signTransaction(unsignedTransaction)
                transactionViewFinal.signedTx = signedTx
                //broadcast
                let broadcast = await WALLETS_LOADED[WALLET_CONTEXT].broadcastTransaction(unsignedTransaction.coin,signedTx)
                transactionViewFinal.broadcast = broadcast
                //add to pending
                let walletPending = await WALLETS_LOADED[WALLET_CONTEXT].addBroadcasted({unsignedTransaction,signedTx,broadcast})
                for(let j = 0; j < walletPending.length; j++){
                    ALL_PENDING.push(walletPending[j])
                }
                transactionViewFinal.pending = ALL_PENDING
            }
        }

        return transactionViewFinal
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};


let pair_sdk_user = async function (code:string) {
    let tag = " | unlock_wallet | ";
    try {

        //send code

        log.info(tag,"network: ",network)
        log.info(tag,"network: ",network.instance)
        let result = await network.instance.Pair(null,{code})

        return result.data
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};

let unlock_wallet = async function (wallet:any,password:string) {
    let tag = " | unlock_wallet | ";
    try {
        //verify config hash match's wallet
        //verify password match's hash

        //if new pw auto migrate


    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};


let pair_keepkey = async function (keepkeyWallet:any) {
    let tag = " | pair_keepkey | ";
    try {

        log.debug(tag, "config: ", keepkeyWallet)
        let deviceId = keepkeyWallet.features.deviceId

        //get config
        let config = getConfig()
        log.debug(tag, "config: ", config)

        if(!config || Object.keys(config).length === 0){
            await innitConfig("english");
            config = getConfig()
        }

        //enable hardware
        let paired = config.paired
        if(!paired) paired = []
        if(paired.indexOf(deviceId) === -1){
            paired.push(deviceId)
            updateConfig({paired});
        }

        //use as ID
        keepkeyWallet.deviceId = deviceId
        //createWallet
        await create_wallet('hardware',keepkeyWallet)
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};


let get_wallet_summary = async function (verbosity:any) {
    let tag = " | get_wallet_summary | ";
    try {
        let info:any = {
            totalUsd: TOTAL_VALUE_USD_LOADED,
            wallets:[],
        }

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
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};

let list_apps_remote = async function () {
    let tag = " | list_apps | ";
    try {

        let appList = await network.apps()
        return appList;
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};

let install_app = async function (name:string) {
    let tag = " | install_app | ";
    try {



        return true;
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};


let download_app = async function (name:string) {
    let tag = " | download_app | ";
    try {


        return true;
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};




let export_wallet = async function (walletId:string,format:string) {
    let tag = " | export_wallet | ";
    try {
        let output

        if(format === 'citadel' || format === 'keepkey'){
            //if(!outDir) outDir = pioneerPath
            let outDir = pioneerPath
            let isCreated = await mkdirp(outDir);
            log.debug("create path: ",isCreated)
            //verify path

            //load seed

            //build wallet
            log.debug(tag,"WALLET_PUBLIC: ",WALLET_PUBLIC)
            log.debug(tag,"WALLET_PRIVATE: ",WALLET_PRIVATE)

            if(Object.keys(WALLET_PUBLIC).length === 0) throw Error("102: Failed to find WALLET_PUBLIC")
            if(Object.keys(WALLET_PUBLIC).length === 0) throw Error("103: Failed to find WALLET_PRIVATE")

            let walletInfo = {
                WALLET_ID:walletId,
                TYPE:'full',
                CREATED: new Date().getTime(),
                VERSION:"0.1.3",
                WALLET_PUBLIC,
                WALLET_PRIVATE,
                WALLET_PUBKEYS
            }

            let walletInfoPub = {
                WALLET_ID:walletId,
                TYPE:'watch',
                CREATED: new Date().getTime(),
                VERSION:"0.1.3",
                WALLET_PUBLIC,
                WALLET_PUBKEYS
            }

            //write to foxpath, name wallet walletId
            let writePathPub = outDir+"/"+walletId+".watch.wallet.json"
            log.debug(tag,"writePathPub: ",writePathPub)
            let writeSuccessPub = fs.writeFileSync(writePathPub, JSON.stringify(walletInfoPub));

            //for each coin
            let coins = Object.keys(walletInfo.WALLET_PUBLIC)

            let configFileEnv = ""
            configFileEnv = configFileEnv + "WALLET_ID="+walletInfo.WALLET_ID + "\n"
            configFileEnv = configFileEnv + "TYPE="+walletInfo.TYPE + "\n"
            configFileEnv = configFileEnv + "VERSION="+walletInfo.VERSION + "\n"

            //write .env //TODO depricated
            for(let i = 0; i < coins.length; i++){
                let coin = coins[i]
                log.debug(tag,"coin: ",coin)

                let keypairInfo = WALLET_PUBLIC[coin]
                log.debug(tag,"keypairInfo: ",keypairInfo)

                //if(coin === 'EOS'){}

                //if eth
                configFileEnv = configFileEnv + "WALLET_"+coin+"_MASTER="+keypairInfo.master + "\n"

                //if type xpub
                if(keypairInfo.type === 'xpub'){
                    configFileEnv = configFileEnv + "WALLET_"+coin+"_XPUB="+keypairInfo.xpub+ "\n"
                }
            }


            log.debug(tag,"configFileEnv: ",configFileEnv)
            //write to foxpath, name wallet walletId
            let writePathEnv = outDir+"/"+walletId+".env"
            log.debug(tag,"writePath: ",writePathEnv)
            let writeSuccessEnv = fs.writeFileSync(writePathEnv, configFileEnv);
            log.debug(tag,"writeSuccessEnv: ",writeSuccessEnv)

            //backupWallet(outDir,hash,seed_encrypted,walletId)
        }else{
            //
            throw Error("format not supported "+format)
        }

        return output;
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};

let get_balances = async function () {
    let tag = " | get_address | ";
    try {

        //use apps
        let output = await Pioneer.getInfo()

        return output.balances;
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};

let get_balance = async function (coin:string) {
    let tag = " | get_address | ";
    try {
        coin = coin.toUpperCase()

        //use apps
        let output = await Pioneer.getBalance(coin)

        return output;
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};

let broadcast_transaction = async function (coin:string,rawTx:string) {
    let tag = " | broadcast_transaction | ";
    try {
        coin = coin.toUpperCase()

        let result:any
        //tier 1 apps

        //if token, set network to ETH

        log.debug("Broadcasting tx coin: ",coin," rawTx: ",rawTx)
        result = await Pioneer.broadcastTransaction('ETH',rawTx)
        log.debug(tag,"result: ", result)

        return result;
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};

let send_approval = async function (intent:any) {
    let tag = " | send_to_address | ";
    try {
        log.info(tag,"params: ",intent)

        let signedTx = await WALLETS_LOADED[WALLET_CONTEXT].sendApproval(intent)
        log.info(tag,"txid: ", signedTx.txid)
        //

        return signedTx
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};

let send_to_address = async function (intent:any) {
    let tag = " | send_to_address | ";
    try {
        if(!intent.address) throw Error("102: invalid intent missing address!")
        if(!intent.coin) throw Error("102: invalid intent missing coin!")
        if(!intent.amount) throw Error("102: invalid intent missing amount!")
        log.info(tag,"params: ",intent)
        intent.addressTo = intent.address

        log.info(tag,"Building TX on context: ",WALLET_CONTEXT)
        //TODO check remote context match's local

        //build tx add to approve queue
        let unsignedTx = await WALLETS_LOADED[WALLET_CONTEXT].sendToAddress(intent)

        //add to queue
        WALLETS_LOADED[WALLET_CONTEXT].addUnsigned(unsignedTx)

        // let signedTx = await WALLETS_LOADED[WALLET_CONTEXT].sendToAddress(intent)
        // log.info(tag,"txid: ", signedTx.txid)
        //

        return unsignedTx
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};


let build_swap = async function (swap:any,invocationId?:string) {
    let tag = " | send_to_address | ";
    try {

        let signedTx = await WALLETS_LOADED[WALLET_CONTEXT].buildSwap(swap)
        log.info(tag,"txid: ", signedTx.txid)

        if(invocationId) signedTx.invocationId = invocationId

        //broadcast hook
        let broadcast_hook = async () =>{
            try{
                log.info(tag,"checkpoint: broadcast_hook: ",signedTx)
                //TODO flag for async broadcast
                if(!swap.asset.chain) {
                    log.error("Invalid Swap! swap: ",swap)
                    throw Error("104: fucking type swaps gdamnit")
                }
                let broadcastResult = await WALLETS_LOADED[WALLET_CONTEXT].broadcastTransaction(swap.asset.chain,signedTx)
                broadcastResult = broadcastResult.data
                log.info(tag,"broadcastResult: ",broadcastResult)

                //TODO push event to event emitter -> UI

            }catch(e){
                log.error(tag,"Failed to broadcast transaction!")
            }
        }
        //Notice NO asyc!
        broadcast_hook()

        return signedTx
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};

let get_address = async function (coin:string) {
    let tag = " | get_address | ";
    try {
        coin = coin.toUpperCase()

        //use apps
        let output = await Pioneer.getMaster(coin)


        return output;
    } catch (e) {
        console.error(tag, "Error: ", e);
        throw e;
    }
};


//Build Seed
function standardRandomBytesFunc(size: any) {
    /* istanbul ignore if: not testable on node */

    return CryptoJS.lib.WordArray.random(size).toString();
}

let backup_wallet = async function () {
    let tag = " | backup_wallet | ";
    try {
        //TODO validate seed

        //does wallet already exist?
        const wallet = await getWallet()
        if(!wallet) throw Error("Wallet not found!")

        //save wallet in new dir
        let time = new Date().getTime()

        let filename = "backup:"+time
        let passwordHash = wallet.password
        let encryptedSeed = wallet.vault

        //
        //TODO fixme
        //let success = await backupWallet("backup",passwordHash ,encryptedSeed, filename)

        // let success = sa


        //return success;
    } catch (e) {
        if(e.response && e.response.data){
            log.error(tag, "Error: ", e.response.data);
        }else{
            log.error(tag, "Error: ", e);
        }
        throw e;
    }
};

let create_wallet = async function (type:string,wallet:any,isTestnet?:boolean) {
    let tag = " | create_wallet | ";
    try {
        if(!isTestnet) isTestnet = false
        let output = false
        //if software
        switch(type){
            case "software":
                //TODO validate seed
                if(!wallet.mnemonic) throw Error("101: mnemonic required!")
                if(!wallet.password) throw Error("102: password required!")
                if(!wallet.masterAddress) throw Error("103: masterAddress required!")
                if(!wallet.username) wallet.username = "defaultUser:"+uuidv4()

                //filename
                let filename = wallet.masterAddress+".wallet.json"
                log.info(tag,"filename: ",filename)
                //does wallet exist
                let alreadyExists = getWallet(filename)
                log.debug(tag,"alreadyExists: ",alreadyExists)

                //pw hash
                const hash = bcrypt.hashSync(wallet.password, 10);

                //if doesnt exist write file
                if(!alreadyExists){
                    // @ts-ignore
                    globalThis.crypto = new Crypto();
                    // @ts-ignore
                    const engine = new native.crypto.engines.WebCryptoEngine();
                    // @ts-ignore
                    const walletCrypto = new native.crypto.EncryptedWallet(engine);
                    const result = await walletCrypto.init(wallet.username, wallet.password);
                    await walletCrypto.createWallet(wallet.mnemonic);
                    let seed_encrypted = result.encryptedWallet

                    //
                    log.debug(tag, "seed_encrypted: ", seed_encrypted);
                    log.debug(tag, "hash: ", hash);

                    let walletNew:any = {
                        isTestnet,
                        masterAddress:wallet.masterAddress,
                        TYPE:"citadel",
                        seed_encrypted,
                        hash,
                        username:wallet.username,
                        filename
                    }
                    if(wallet.temp) walletNew.temp = wallet.temp

                    await initWallet(walletNew);
                    //TODO verify exists?
                    output = true
                } else {
                    throw Error("already exists")
                    //TODO verify?
                    //createWallet
                }
                break
            case "hardware":
                log.info(tag,"wallet hardware: ",wallet)
                if(!wallet.deviceId) throw Error("102: deviceId require for keepkey wallets!")
                if(!wallet.wallet.WALLET_PUBLIC) throw Error("103: WALLET_PUBLIC require for keepkey wallets!")

                log.info("hardware watch create!")
                let walletFileNew:any = {
                    isTestnet,
                    features:wallet.features,
                    WALLET_ID:"keepkey:"+wallet.deviceId,
                    TYPE:'keepkey',
                    CREATED: new Date().getTime(),
                    VERSION:"0.1.3",
                    WALLET_PUBLIC:wallet.wallet.WALLET_PUBLIC,
                    WALLET_PUBKEYS:wallet.pubkeys
                }
                walletFileNew.pubkeys = wallet.pubkeys
                walletFileNew.KEEPKEY = true
                walletFileNew.DEVICE_ID = wallet.deviceId
                walletFileNew.LABEL = wallet.label
                walletFileNew.deviceId = wallet.deviceId
                walletFileNew.filename = wallet.deviceId + ".watch.wallet.json"
                await initWallet(walletFileNew);
                //TODO verify exists?
                output = true
                break
            default:
                throw Error("unhandled wallet type! "+type)
                break

        }
        return output
    } catch (e) {
        if(e.response && e.response.data){
            log.error(tag, "Error: ", e.response.data);
        }else{
            log.error(tag, "Error: ", e);
        }
        throw e;
    }
};

let init_wallet = async function (config:any,isTestnet?:boolean) {
    let tag = TAG+" | init_wallet | ";
    try {
        DATABASES = await nedb.init()
        let output:any = {}

        //get wallets
        let wallets = await getWallets()
        log.debug(tag,"wallets: ",wallets)
        //TODO if testnet flag only show testnet wallets!

        output.walletFiles = wallets
        output.wallets = []

        //get wallets remote

        //if diff mark missing wallets
        //if context not loaded change context

        //if no password
        if(!config.password) config.password = config.temp
        if(!config.password) throw Error("101: password required!")
        if(!config.username) throw Error("102: username required!")
        if(!config.queryKey) throw Error("103: queryKey required!")

        if(config.urlSpec || config.spec){
            URL_PIONEER_SPEC = config.urlSpec || config.spec
        }
        if(!URL_PIONEER_SPEC) URL_PIONEER_SPEC = "https://pioneers.dev/spec/swagger.json"

        if(config.pioneerSocket || config.wss){
            URL_PIONEER_SOCKET = config.pioneerSocket || config.wss
        }
        if(!URL_PIONEER_SOCKET) URL_PIONEER_SOCKET = "wss://pioneers.dev"

        network = new Network(URL_PIONEER_SPEC,{
            queryKey:config.queryKey
        })
        network = await network.init()

        if(!wallets){
            throw Error(" No wallets found! ")
        }

        if(config.hardware){
            log.info(tag,"Hardware enabled!")

            //start
            KEEPKEY = await Hardware.start()

            KEEPKEY.events.on('event', async function(event:any) {
                //events.emit('keepkey',{event})
            });

        }

        if(!config.blockchains){
            config.blockchains = ['bitcoin','ethereum','thorchain']
            log.info(tag,"Config Blockchains not set! default min",config.blockchains)
        }

        //verify wallet_data
        // for(let i = 0; i < wallets.length; i++){
        //     let walletName = wallets[i]
        //     log.info(tag,"walletName: ",walletName)
        //     let fileNameWatch = walletName.replace(".wallet.json",".watch.wallet.json")
        //     let watchWallet = getWalletPublic(fileNameWatch)
        //     if(!watchWallet){
        //         //create watch wallet
        //     } else {
        //         log.info(tag," Watch Only wallet found!")
        //         //load
        //     }
        // }



        //Load wallets if setup
        for(let i = 0; i < wallets.length; i++){
            let walletName = wallets[i]
            log.info(tag,"walletName: ",walletName)
            let walletFile = getWallet(walletName)
            log.info(tag,"walletFile: ",walletFile)
            if(!walletFile.TYPE) walletFile.TYPE = walletFile.type
            if(walletFile.TYPE === 'keepkey'){
                log.info(tag,"Loading keepkey wallet! ")

                if(!walletFile.pubkeys) throw Error("102: invalid keepkey wallet!")
                //if(!walletFile.wallet) throw Error("103: invalid keepkey wallet!")

                //if wallet paths custom load
                log.info(tag,"walletName: ",walletName)
                let fileNameWatch = walletName.replace(".wallet.json",".watch.wallet.json")
                let watchWallet = getWalletPublic(fileNameWatch)
                let walletPaths
                if(watchWallet){
                    walletPaths = watchWallet.paths
                } else {
                    log.info(tag,"walletFile: ",walletFile)
                }

                //load
                let configPioneer = {
                    hardware:true,
                    vendor:"keepkey",
                    blockchains:config.blockchains,
                    pubkeys:walletFile.pubkeys,
                    wallet:walletFile,
                    context:walletName,
                    username:config.username,
                    pioneerApi:true,
                    spec:URL_PIONEER_SPEC,
                    queryKey:config.queryKey,
                    auth:process.env['SHAPESHIFT_AUTH'] || 'lol',
                    authProvider:'bitcoin'
                }
                log.debug(tag,"KEEPKEY init config: ",configPioneer)
                let wallet = new Pioneer('keepkey',configPioneer,isTestnet);
                //init
                let walletInfo = await wallet.init(KEEPKEY)
                log.info(tag,"walletInfo: ",walletInfo)
                WALLETS_LOADED[walletName] = wallet

                //info
                let info = await wallet.getInfo(walletName)
                info.name = walletFile.username
                info.type = 'keepkey'
                output.wallets.push(info)
                log.info(tag,"info: ",info)

                //validate at least 1 pubkey per enabled blockchain
                let pubkeyNetworks =  new Set()
                for(let i = 0; i < info.pubkeys.length; i++){
                    let pubkey = info.pubkeys[i]
                    pubkeyNetworks.add(pubkey.coin)
                }
                log.info(tag,"pubkeyNetworks: ",pubkeyNetworks)

                //TODO iterate over blockchains config and verify

                //else register individual pubkeys until complete


                //write pubkeys
                // let writePathPub = pioneerPath+"/"+info.name+".watch.wallet.json"
                // log.info(tag,"writePathPub: ",writePathPub)
                // let writeSuccessPub = fs.writeFileSync(writePathPub, JSON.stringify(info.public));
                // log.info(tag,"writeSuccessPub: ",writeSuccessPub)

                //global total valueUSD
                TOTAL_VALUE_USD_LOADED = TOTAL_VALUE_USD_LOADED + info.totalValueUsd
                WALLET_VALUE_MAP[walletName] = info.totalValueUsd
            }else if(walletFile.TYPE === 'seedwords'){
                //decrypt
                // @ts-ignore
                globalThis.crypto = new Crypto();
                // @ts-ignore
                const engine = new native.crypto.engines.WebCryptoEngine();
                // @ts-ignore
                const walletCrypto = new native.crypto.EncryptedWallet(engine);

                //if wallet has pw, use it
                if(walletFile.password) config.password = walletFile.password

                const resultOut = await walletCrypto.init(walletFile.username, config.password, walletFile.vault);
                if(!walletFile.vault) throw Error("Wallet vault not found! ")

                let mnemonic = await resultOut.decrypt()

                //Load public wallet file
                //Loads wallet state and custom pathing
                log.info(tag,"walletName: ",walletName)
                let fileNameWatch = walletName.replace(".wallet.json",".watch.wallet.json")
                let watchWallet = getWalletPublic(fileNameWatch)
                let walletPaths
                if(watchWallet){
                    walletPaths = watchWallet.paths
                }

                //TODO validate seed
                if(!mnemonic) throw Error("unable to start wallet! invalid seed!")
                // log.debug(tag,"mnemonic: ",mnemonic)
                //load wallet to global
                let configPioneer:any = {
                    isTestnet,
                    mnemonic,
                    context:walletName,
                    blockchains:config.blockchains,
                    username:config.username,
                    pioneerApi:true,
                    auth:process.env['SHAPESHIFT_AUTH'] || 'lol',
                    authProvider:'shapeshift',
                    spec:URL_PIONEER_SPEC,
                    queryKey:config.queryKey
                }
                if(walletPaths) configPioneer.paths = walletPaths

                log.info(tag,"configPioneer: ",configPioneer)
                log.info(tag,"isTestnet: ",isTestnet)
                let wallet = new Pioneer('pioneer',configPioneer,isTestnet);
                WALLETS_LOADED[walletName] = wallet

                //init
                let walletClient = await wallet.init()

                //info
                let info = await wallet.getInfo(walletName)
                info.name = walletFile.username
                info.type = 'software'
                output.wallets.push(info)
                log.info(tag,"info: ",info)

                let pubkeyNetworks =  new Set()
                for(let i = 0; i < info.pubkeys.length; i++){
                    let pubkey = info.pubkeys[i]
                    pubkeyNetworks.add(pubkey.coin)
                }
                log.info(tag,"pubkeyNetworks: ",pubkeyNetworks)

                let walletInfoPub = {
                    WALLET_ID:walletFile.username,
                    TYPE:'watch',
                    CREATED: new Date().getTime(),
                    VERSION:"0.1.4",
                    WALLET_PUBLIC:info.public,
                    WALLET_PUBKEYS:info.pubkeys
                }

                let writePathPub = walletDataDir+"/"+fileNameWatch
                log.info(tag,"writePathPub: ",writePathPub)
                let writeSuccessPub = fs.writeFileSync(writePathPub, JSON.stringify(walletInfoPub));
                log.info(tag,"writeSuccessPub: ",writeSuccessPub)

                //
                log.info(tag,"info: ",info)

                //global total valueUSD
                TOTAL_VALUE_USD_LOADED = TOTAL_VALUE_USD_LOADED + info.totalValueUsd
                WALLET_VALUE_MAP[walletName] = info.totalValueUsd

            }else{
                throw Error("unhandled wallet type! "+walletFile.TYPE)
            }
        }
        output.TOTAL_VALUE_USD_LOADED = TOTAL_VALUE_USD_LOADED
        output.WALLET_VALUE_MAP = WALLET_VALUE_MAP
        log.debug(tag,"TOTAL_VALUE_USD_LOADED: ",TOTAL_VALUE_USD_LOADED)

        //get remote user info
        let userInfo = await network.instance.User()
        userInfo = userInfo.data
        log.info(tag,"userInfo: ",userInfo)
        log.info(tag,"context: ",userInfo.context)
        WALLET_CONTEXT = userInfo.context

        //after registered start socket
        //sub all to events
        if(!config.username) throw Error("102: config.username not set!")
        if(!config.queryKey) throw Error("103: config.queryKey not set!")

        let configEvents = {
            username:config.username,
            queryKey:config.queryKey,
            wss:URL_PIONEER_SOCKET
        }

        //sub ALL events
        let clientEvents = new Events.Events(configEvents.wss,configEvents)
        await clientEvents.init()
        await clientEvents.subscribeToKey()
        await clientEvents.pair()
        //on blocks update lastBlockHeight

        //on payments update balances

        //on on invocations add to queue
        clientEvents.events.on('message', async (request: any) => {
            log.info(tag,"**** message: ", request)
            //TODO filter invocations by subscribers

            //TODO autonomousOn/Off

            //TODO verify auth to paired keys

            //TODO filter by preferences
                //if swaps allowed (no transfers)
                //verify swap to wallet

                //if transfer / whitelist rules

            //if swap

            //if transfer

            //if liquidity event
                //add/withdrawal

            let signedTx
            switch(request.type) {
                case 'swap':
                    //Note this is ETH only
                    //TODO validate inputs
                    signedTx = await build_swap(request.invocation,request.invocationId)
                    log.info(tag,"txid: ", signedTx.txid)
                    clientEvents.events.emit('broadcast',signedTx)
                    break;
                case 'approve':
                    //Note this is ETH only
                    if(!request.invocationId) throw Error("102: invalid invocation! missing id!")
                    request.invocation.invocationId = request.invocationId
                    signedTx = await send_approval(request.invocation)
                    log.info(tag,"txid: ", signedTx.txid)
                    clientEvents.events.emit('broadcast',signedTx)
                    break;
                case 'transfer':
                    if(!request.invocationId) throw Error("102: invalid invocation! missing id!")
                    request.invocation.invocationId = request.invocationId
                    let unSignedTx = await send_to_address(request.invocation)
                    log.info(tag,"unSignedTx: ", unSignedTx)
                    clientEvents.events.emit('approval',unSignedTx)
                    break;
                case 'context':
                    //switch context
                    if(WALLETS_LOADED[request.context]){
                        log.info(tag,"wallet context is now: ",request.context)
                        if(request.context !== WALLET_CONTEXT){
                            WALLET_CONTEXT = request.context
                        }else{
                            log.error("context already: ",request.context)
                        }
                    } else {
                        log.error(tag,"Failed to switch! invalid context: ",request.context)
                    }
                    break;
                default:
                    log.error("Unknown event: "+request.type)
                    //push error
                    // code block
            }

            //push signed tx to socket
            clientEvents.events.emit('broadcast',signedTx)

            //push txid to invocationId

            //update status on server

            //add to history
        })

        output.events = clientEvents.events
        return output
    } catch (e) {
        if(e.response && e.response.data){
            log.error(tag, "Error: ", e.response.data);
        }else{
            log.error(tag, "Error: ", e);
        }
        throw e;
    }
};
