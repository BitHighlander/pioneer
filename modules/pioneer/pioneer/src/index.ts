/*

    Pioneer Wallet v2

    Class based wallet development

 */



const TAG = " | Pioneer | "
const log = require("@pioneer-platform/loggerdog")()
//TODO remove this dep
const tokenData = require("@pioneer-platform/pioneer-eth-token-data")
const ripemd160 = require("crypto-js/ripemd160")
const CryptoJS = require("crypto-js")
const sha256 = require("crypto-js/sha256")
const bech32 = require(`bech32`)
const bitcoin = require("bitcoinjs-lib");
const ethUtils = require('ethereumjs-util');
const prettyjson = require('prettyjson');

//All paths
//TODO make paths adjustable!
let {
    getPaths
} = require('@pioneer-platform/pioneer-coins')
let paths = getPaths()


//support
import * as support from './support'
import { numberToHex } from 'web3-utils'
import { FioActionParameters } from "fiosdk-offline";

//Pioneer follows OpenAPI spec
let network = require("@pioneer-platform/pioneer-client")

//pioneer
import {
    bip32ToAddressNList,
} from "@bithighlander/hdwallet-core";

//Highlander fork
const hdwallet = require("@bithighlander/hdwallet-core")
const pioneer = require("@bithighlander/hdwallet-native")
// SS public TODO catch up public repo
// const hdwallet = require("@shapeshiftoss/hdwallet-core")
// const pioneer = require("@shapeshiftoss/hdwallet-native")

//global
const keyring = new hdwallet.Keyring()

let IS_OFFLINE = false
// let WALLET_BALANCES:any = {}
// let WALLET_MODE:any
let WALLET_COINS:any = []


//eth token info
WALLET_COINS.push('ETH')
//TODO support coinlist (coingecko)
for(let i = 0; i < tokenData.tokens.length; i++){
    let token = tokenData.tokens[i]
    WALLET_COINS.push(token)
}

// COINS
WALLET_COINS.push('BNB')
WALLET_COINS.push('ATOM')
WALLET_COINS.push('EOS')
WALLET_COINS.push('FIO')

//TODO BNB tokens

//TODO type paths

export interface config {
    spec:string,
    env:string,
    mode:string,
    hdwallet:HDWALLETS,
    authProvider?:AuthProviders,
    username:string,
    wallet?:any,
    pubkeys?:any,
    auth?:string,
    paths?:any,
    privWallet?:any,
    mnemonic?:string,
    queryKey?:string
    offline?:boolean
    pioneerApi?:boolean
}

export interface Balance {
    total:number
    pending:number
    confirmed:number
}


export enum AuthProviders {
    shapeshift = 'shapeshift',
    bitcoin = 'bitcoin'
}

export enum HDWALLETS {
    'pioneer',
    'trezor',
    'keepkey',
    'ledger'
}

export interface Transaction {
    coin: string;
    addressFrom: string;
    addressTo: string;
    amount: string;
    memo: string;
    nonce?:number
}

export interface CoinInfo {
    coin: string;
    note?: string;
    script_type:string;
    available_scripts_types?:[string]
    long?: string;
    path:string
    master: string;
    network:string;
    pubkey: string;
    curve?: string,
    xpub?: string;
    zpub?: string;
    type?:string
}

interface BroadcastBody {
    coin?:string
    serialized:string
    type?:string
    broadcastBody?:any,
    txid?:string
    dscription?:any
}

function bech32ify(address:any, prefix:string) {
    const words = bech32.toWords(address)
    return bech32.encode(prefix, words)
}

function createBech32Address(publicKey:any,prefix:string) {
    const message = CryptoJS.enc.Hex.parse(publicKey.toString(`hex`))
    const hash = ripemd160(sha256(message)).toString()
    const address = Buffer.from(hash, `hex`)
    const cosmosAddress = bech32ify(address, prefix)
    return cosmosAddress
}

module.exports = class wallet {
    private PUBLIC_WALLET:any = {};
    private PRIVATE_WALLET:any = {};
    private paths: (format: string) => any;
    // private normalizePubkeys: (format: string, pubkeys: any, paths: any) => Promise<any>;
    // // private events: Promise<any>;
    private forget: () => any;
    // private coins: () => any;
    // private getBalanceAudit: (coin: string) => Promise<any>;
    private getBalance: (coin: string, address?:string) => any;
    // private getInfo: (verbosity: string) => Promise<any>;
    private getBalanceRemote: (coin: string, address?:string) => Promise<any>;
    // private getEosPubkey: () => Promise<any>;
    // private getEosAccountsByPubkey: (pubkey: string) => Promise<any>;
    // private validateEosUsername: (username: string) => Promise<any>;
    // private registerEosUsername: (pubkey: string, username: string) => Promise<any>;
    private getFioPubkey: () => Promise<any>;
    private getFioAccountsByPubkey: (pubkey: string) => Promise<void>;
    private getPaymentRequests: (pubkey: string) => Promise<void>;
    private fioEncryptRequestContent: (content: any) => Promise<void>;
    private fioDecryptRequestContent: (content: any) => Promise<void>;
    private getFioAccountInfo: (pubkey: string) => Promise<void>;
    // private validateFioUsername: (username: string) => Promise<void>;
    // private registerFioUsername: (pubkey: string, username: string) => Promise<void>;
    // private getStakes: (coin: string) => Promise<any>;
    // private getBalances: (coin: string) => Promise<any>;
    private getMaster: (coin: string) => Promise<any>;
    private getAddress: (coin: string, account: number, index: number, isChange: boolean) => Promise<any>;
    // private getAddressByPath: (coin: string, path: string) => Promise<any>;
    // private getNewAddress: (coin: string) => Promise<any>;
    // private listSinceLastblock: (coin: string, block: string) => Promise<any>;
    // private getTransaction: (coin: string, txid: string) => Promise<any>;
    // private getTransactions: (coin: string, txid: string) => Promise<any>;
    private buildTx: (transaction: any) => Promise<any>;
    private bip32ToAddressNList: (path: string) => number[];
    // private encrypt: (msg: FioActionParameters.FioRequestContent, payerPubkey: string) => Promise<any>;
    private sendToAddress: (coin: string, address: string, amount: string, param1: string) => Promise<any>;
    private buildTransfer: (transaction: Transaction) => Promise<any>;
    private broadcastTransaction: (coin: string, signedTx: BroadcastBody) => Promise<any>;
    private mode: string;
    private queryKey: string | undefined;
    private username: string;
    private type: HDWALLETS;
    private isTestnet: boolean;
    private init: (type: string, config: config) => Promise<any>;
    private mnemonic: string | undefined;
    private auth: string | undefined;
    private authProvider: AuthProviders | undefined;
    private spec: string;
    private pioneerApi: boolean | undefined;
    private WALLET: any;
    private pubkeys: any;
    private getInfo: (verbosity: string) => any;
    private pioneer: any;
    private pioneerClient: any;
    private WALLET_BALANCES: any;
    constructor(type:HDWALLETS,config:config,isTestnet:boolean) {
        this.isTestnet = isTestnet || false
        this.mode = config.mode
        this.queryKey = config.queryKey
        this.username = config.username
        this.pioneerApi = config.pioneerApi
        this.type = type
        this.spec = config.spec
        this.mnemonic = config.mnemonic
        this.auth = config.auth
        this.authProvider = config.authProvider
        this.bip32ToAddressNList = function (path:string) {
            return bip32ToAddressNList(path);
        }
        this.init = async function () {
            let tag = TAG + " | init_wallet | "
            try{
                log.debug(tag,"checkpoint")
                const pioneerAdapter = pioneer.NativeAdapter.useKeyring(keyring)
                // @ts-ignore
                switch (+HDWALLETS[this.type]) {
                    case HDWALLETS.pioneer:
                        log.debug(tag,"checkpoint"," pioneer wallet detected! ")
                        if(!config.mnemonic && !config.wallet) throw Error("102: mnemonic or wallet file required! ")
                        if(config.mnemonic && config.wallet) throw Error("103: wallet collision! invalid config! ")
                        //TODO load wallet
                        //pair
                        this.WALLET = await pioneerAdapter.pairDevice(config.username)
                        await this.WALLET.loadDevice({ mnemonic: config.mnemonic })
                        this.pubkeys = await this.WALLET.getPublicKeys(paths)
                        log.debug("pubkeys.length ",this.pubkeys.length)
                        log.debug("paths.length ",paths.length)
                        for(let i = 0; i < this.pubkeys.length; i++){
                            let pubkey = this.pubkeys[i]
                            if(!pubkey) throw Error("empty pubkey!")
                            if(!pubkey.coin){
                                log.debug("pubkey: ",pubkey)
                                throw Error("Invalid pubkey!")
                            }
                            this.PUBLIC_WALLET[pubkey.coin] = pubkey
                        }
                        break;
                    case HDWALLETS.keepkey:
                        log.debug(tag," Keepkey mode! ")
                        if(!config.wallet) throw Error("Config is missing watch wallet!")
                        if(!config.wallet.WALLET_PUBLIC) throw Error("Config watch wallet missing WALLET_PUBLIC!")
                        this.PUBLIC_WALLET = config.wallet.WALLET_PUBLIC
                        if(!config.pubkeys) throw Error("Config watch wallet missing pubkeys!")
                        this.pubkeys = config.pubkeys
                        break;
                    default:
                        throw Error("108: WALLET not yet supported! "+type+" valid: "+HDWALLETS)
                        break;
                }
                if(!this.pubkeys) throw Error("103: failed to init wallet! missing pubkeys!")
                if(this.pioneerApi){
                    if(!this.spec) throw Error("102:  Api spec required! ")
                    if(!this.queryKey) throw Error("102:  queryKey required! ")
                    this.pioneer = new network(config.spec,{
                        queryKey:config.queryKey
                    })
                    this.pioneerClient = await this.pioneer.init(config.spec,{
                        queryKey:config.queryKey
                    });
                    log.debug("baseUrl: ",await this.pioneerClient.getBaseURL())
                    //API
                    let register = {
                        username:this.username,
                        data:{
                            pubkeys:this.pubkeys
                        },
                        queryKey:this.queryKey,
                        auth:this.auth,
                        provider:'shapeshift'
                    }
                    log.debug("registerBody: ",register)
                    log.debug("this.pioneerClient: ",this.pioneerClient)
                    let regsiterResponse = await this.pioneerClient.instance.Register(null,register)
                    log.debug("regsiterResponse: ",regsiterResponse)

                    let walletInfo = await this.getInfo('')
                    log.debug("walletInfo: ",walletInfo)

                    this.WALLET_BALANCES = walletInfo.balances
                    //emitter.info = walletInfo

                    //verify if remote is correct
                    if(walletInfo.masters['ETH'] === this.PUBLIC_WALLET['ETH'].master){
                        //
                        log.debug(tag,"Remote and local masters match!")
                    }else{
                        log.error(tag,"remote: ",walletInfo.masters['ETH'])
                        log.error(tag,"local: ",this.PUBLIC_WALLET['ETH'].master)
                        await this.pioneerClient.instance.Forget()
                        throw Error("Clearing pioneer! migration!")
                        // @ts-ignore
                        this.init()
                    }

                    return walletInfo
                } else {
                    log.debug(tag,"Offline mode!")
                }
            }catch(e){
                log.error(tag,e)
                throw e
            }
        }
        this.paths = function (format:string) {
            let tag = TAG + " | get_paths | "
            try {
                let output:any = []
                if(format === 'keepkey'){
                    for(let i = 0; i < paths.length; i++){
                        let path = paths[i]
                        let pathForKeepkey:any = {}
                        //send coin as bitcoin
                        pathForKeepkey.symbol = path.symbol
                        pathForKeepkey.addressNList = path.addressNList
                        //why
                        pathForKeepkey.coin = 'Bitcoin'
                        pathForKeepkey.script_type = 'p2pkh'

                        output.push(pathForKeepkey)
                    }
                } else {
                    output = paths
                }
                return output
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
        // this.normalizePubkeys = function (format:string,pubkeys:any,paths:any) {
        //     return normalize_pubkeys(format,pubkeys,paths)
        // }
        this.forget = function () {
            return this.pioneerClient.instance.Forget();
        }
        // this.coins = function () {
        //     return WALLET_COINS;
        // }
        this.getInfo = async function () {
            let tag = TAG + " | getInfo | "
            try {
                let walletInfo:any = {}
                if(!IS_OFFLINE){
                    //query api
                    walletInfo = await this.pioneerClient.instance.Info()
                    log.debug(tag,"walletInfo: ",walletInfo)
                }
                walletInfo.data.public = this.PUBLIC_WALLET
                walletInfo.data.private = this.PRIVATE_WALLET
                return walletInfo.data
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
        this.getBalance = function (coin:string) {
            return this.WALLET_BALANCES[coin] || 0;
        }
        this.getBalanceRemote = async function (coin:string,address?:string) {
            let tag = TAG + " | getBalanceRemote | "
            try {
                //TODO support address
                if(address) throw Error("102: getBalanceAddress not implented yet")

                log.debug("coin detected: ",coin)
                let output

                let master
                if(coin === "ETH"){
                    log.debug("ETH detected ")
                    master = await this.getMaster('ETH')
                }else if(tokenData.tokens.indexOf(coin) >=0 && coin !== 'EOS'){
                    log.debug("token detected ")
                    master = await this.getMaster('ETH')
                } else {
                    master = await this.getMaster(coin)
                }
                log.debug(tag,"this.pioneer: ",this.pioneerClient)
                if(!address) address = master
                output = await this.pioneerClient.instance.GetAddressBalance({coin,address})
                output = output.data
                return output
            } catch (e) {
                log.error(tag, "e: ", e)
                throw e
            }
        }
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
        FIO commands
         */
        this.getFioPubkey = function () {
            return this.PUBLIC_WALLET['FIO'].pubkey;
        }
        this.getFioAccountInfo = function (username:string) {
            return this.pioneerClient.instance.GetFioAccountInfo(username);
        }
        this.getFioAccountsByPubkey = async function (pubkey:string) {
            let accounts = await this.pioneerClient.instance.AccountsFromFioPubkey(pubkey)
            return accounts.data
        }
        //getPaymentRequests
        this.getPaymentRequests = async function () {
            let accounts = await this.pioneerClient.instance.GetPaymentRequests(this.PUBLIC_WALLET['FIO'].pubkey)
            return accounts.data
        }
        this.fioEncryptRequestContent = async function (content:any) {
            let result = await this.WALLET.fioEncryptRequestContent(content)
            return result
        }
        //fioDecryptRequestContent
        this.fioDecryptRequestContent = async function (content:any) {
            let result = await this.WALLET.fioDecryptRequestContent(content)
            return result
        }
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
        this.getMaster = async function (coin:string) {
            let tag = TAG + " | get_address_master | "
            try {
                if(!coin) throw Error("101: must pass coin!")
                let output = this.PUBLIC_WALLET[coin].address
                return output
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
        this.getAddress = function (coin:string,account:number, index:number, isChange:boolean) {
            let tag = TAG + " | get_address | "
            try {
                let output

                //if token use ETH pubkey
                if(tokenData.tokens.indexOf(coin) >=0 && coin !== 'EOS'){
                    coin = 'ETH'
                }


                //if xpub get next unused
                if(!this.PUBLIC_WALLET[coin]) {
                    log.error(tag,"PUBLIC_WALLET: ",this.PUBLIC_WALLET)
                    throw Error("102: coin not in this.PUBLIC_WALLET! coin:"+coin)
                }
                if(this.PUBLIC_WALLET[coin].type === 'xpub'){

                    //get pubkey at path
                    let publicKey = bitcoin.bip32.fromBase58(this.PUBLIC_WALLET[coin].pubkey).derive(account).derive(index).publicKey
                    log.debug("publicKey: ********* ",publicKey)


                    switch(coin) {
                        case 'ETH':
                            output = ethUtils.bufferToHex(ethUtils.pubToAddress(publicKey,true))
                            break;
                        case 'ATOM':
                            // code block
                            output = createBech32Address(publicKey,'cosmos')
                            break;
                        case 'BNB':
                            // code block
                            output = createBech32Address(publicKey,'bnb')
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
                            log.debug(tag,"pubkey: ",publicKey)

                            let accountFio = this.pioneerClient.instance.GetFioAccount(publicKey)
                            log.debug(tag,"accountFio: ",accountFio)
                            //get accounts for pubkey
                            output = accountFio
                            break;
                        default:
                            throw Error("coin not yet implemented ! ")
                        // code block
                    }

                    log.debug(tag,"output: ",output)

                } else {
                    output = this.PUBLIC_WALLET[coin].master || this.PUBLIC_WALLET[coin].pubkey
                }

                return output
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
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
        //     2 type:
        //         Transfers
        //
        //         non-transfers
        //             Register address
        //             Register Username
        //             staking
        //
        //  */
        this.buildTx = async function (transaction:any) {
            let tag = TAG + " | buildTx | "
            try{
                let rawTx = {}

                //
                if(transaction.coin === 'FIO'){

                    //types
                    let tx:any
                    let signTx:any
                    let res:any
                    switch(transaction.type) {
                        case "fioSignAddPubAddressTx":
                            tx = transaction.tx
                            signTx = {
                                addressNList: bip32ToAddressNList("m/44'/235'/0'/0/0"),
                                actions: [
                                    {
                                        account: FioActionParameters.FioAddPubAddressActionAccount,
                                        name: FioActionParameters.FioAddPubAddressActionName,
                                        data:tx,
                                    },
                                ],
                            }
                            log.debug(tag,"signTx: ",JSON.stringify(signTx))
                            res = await this.WALLET.fioSignTx(signTx);
                            res.coin = "FIO"
                            res.type = transaction.type
                            rawTx = res
                            // code block
                            break;
                        case "fioSignRegisterDomainTx":
                            // code block
                            break;
                        case "fioSignRegisterFioAddressTx":
                            // code block
                            break;
                        case "fioSignNewFundsRequestTx":
                            tx = transaction.tx
                            signTx = {
                                addressNList: bip32ToAddressNList("m/44'/235'/0'/0/0"),
                                actions: [
                                    {
                                        account: FioActionParameters.FioNewFundsRequestActionAccount,
                                        name: FioActionParameters.FioNewFundsRequestActionName,
                                        data:tx,
                                    },
                                ],
                            }
                            log.debug(tag,"signTx: ",JSON.stringify(signTx))
                            res = await this.WALLET.fioSignTx(signTx);
                            res.coin = "FIO"
                            res.type = transaction.type
                            rawTx = res
                            break;
                        default:
                        //code block
                    }


                } else {
                    log.error(tag,"coin not supported! ",transaction.coin)
                }


                return rawTx
            }catch(e){
                log.error(e)
                throw e
            }
        }
        // this.encrypt = function (msg:FioActionParameters.FioRequestContent,payerPubkey:string) {
        //     return encrypt_message(msg,payerPubkey);
        // }
        this.sendToAddress = async function (coin:string,address:string,amount:string,param1:string) {
            let tag = TAG+" | sendToAddress | "
            try{
                let output = {}
                log.debug(tag,"params: ",{coin,address,amount,param1})
                //TODO verify input params

                let addressFrom = await this.getMaster(coin)
                log.debug(tag,"addressFrom: ",addressFrom)

                let transaction:Transaction = {
                    coin,
                    addressTo:address,
                    addressFrom,
                    amount:amount,
                    memo:param1
                }
                log.debug(tag,"transaction: ",transaction)

                //build transfer
                let signedTx = await this.buildTransfer(transaction)
                log.debug(tag,"signedTx: ",signedTx)

                //broadcast
                let broadcastResult = await this.broadcastTransaction(coin,signedTx)
                log.debug(tag,"broadcastResult: ",broadcastResult)

                return broadcastResult
            }catch(e){
                log.error(tag,e)
                throw Error(e)
            }
        }
        this.buildTransfer = async function (transaction:Transaction) {
            let tag = TAG + " | build_transfer | "
            try {

                let coin = transaction.coin.toUpperCase()
                let address = transaction.addressTo
                let amount = transaction.amount
                let memo = transaction.memo
                let addressFrom
                if(transaction.addressFrom){
                    addressFrom = transaction.addressFrom
                } else {
                    addressFrom = await this.getMaster(coin)
                }
                if(!addressFrom) throw Error("102: unable to get master address! ")
                log.debug(tag,"addressFrom: ",addressFrom)

                let rawTx
                if(coin === 'ETH' || tokenData.tokens.indexOf(coin) >=0 && coin !== 'EOS'){
                    log.debug(tag,"checkpoint")
                    let balanceEth = await this.getBalanceRemote('ETH')
                    log.debug(tag,"getBalanceRemote: ",balanceEth)

                    let nonceRemote = await this.pioneerClient.instance.GetNonce(addressFrom)
                    nonceRemote = nonceRemote.data
                    let nonce = transaction.nonce || nonceRemote
                    let gas_limit = 80000 //TODO dynamic gas limit?
                    let gas_price = await this.pioneerClient.instance.GetGasPrice()
                    gas_price = gas_price.data
                    log.debug(tag,"gas_price: ",gas_price)
                    gas_price = parseInt(gas_price)
                    gas_price = gas_price + 1000000000

                    let txParams
                    if(coin === "ETH"){
                        let amountNative = parseFloat(amount) * support.getBase('ETH')
                        amountNative = Number(parseInt(String(amountNative)))
                        txParams = {
                            nonce: nonce,
                            to: address,
                            gasPrice: gas_price,
                            gasLimit : gas_limit,
                            value: amountNative,
                            data:memo
                        }
                        log.debug(tag,"txParams: ",txParams)
                    }else{
                        let knownCoins = tokenData.tokens
                        log.debug(tag,"knownCoins: ",knownCoins)
                        if(knownCoins.indexOf(coin) === -1) throw Error("107: unknown token! "+coin)

                        let balanceToken = await this.getBalanceRemote(coin)

                        //verify token balance
                        if(amount > balanceToken) throw Error("103: Insufficient balance! ")

                        let abiInfo = tokenData.ABI[coin]
                        let metaData = abiInfo.metaData

                        let amountNative = parseFloat(amount) * metaData.BASE
                        amountNative = Number(parseInt(String(amountNative)))

                        log.debug({coin:coin,address, amountNative})
                        let transfer_data = await this.pioneerClient.instance.GetTransferData({coin,address,amount:amountNative})
                        transfer_data = transfer_data.data
                        log.debug(tag,"transfer_data: ",transfer_data)

                        txParams = {
                            nonce: nonce,
                            to: metaData.contractAddress,
                            gasPrice: gas_price,
                            data: transfer_data,
                            gasLimit : gas_limit

                        }
                        log.debug(tag,"txParams: ",txParams)
                    }

                    //send FROM master
                    let masterPathEth  = "m/44'/60'/0'/0/0" //TODO moveme to support

                    log.debug(tag,"txParams: ",txParams)

                    let ethTx = {
                        addressNList: support.bip32ToAddressNList(masterPathEth),
                        nonce: numberToHex(txParams.nonce),
                        gasPrice: numberToHex(txParams.gasPrice),
                        gasLimit: numberToHex(txParams.gasLimit),
                        value: txParams.value,
                        to: txParams.to,
                        data:txParams.data,
                        chainId: 1,
                    }

                    log.debug("unsignedTxETH: ",ethTx)
                    rawTx = await this.WALLET.ethSignTx(ethTx)

                    rawTx.params = txParams
                } else if(coin === 'ATOM'){
                    throw Error ("666: ATOM not supported yet!")
                    //get amount native
                    // let amountNative = ATOM_BASE * parseFloat(amount)
                    // amountNative = parseInt(amountNative.toString())
                    //
                    // //get account number
                    // let masterInfo = await network.getAccountInfo("ATOM",addressFrom)
                    //
                    // log.debug(tag,"masterInfo: ",masterInfo)
                    //
                    // let sequence = masterInfo.result.value.sequence
                    // let account_number = masterInfo.result.value.account_number
                    //
                    // let txType = "cosmos-sdk/MsgSend"
                    // let gas = "100000"
                    // let fee = "1000"
                    // let memo = transaction.memo || ""
                    //
                    // //sign tx
                    // let unsigned = {
                    //     "fee": {
                    //         "amount": [
                    //             {
                    //                 "amount": fee,
                    //                 "denom": "uatom"
                    //             }
                    //         ],
                    //         "gas": gas
                    //     },
                    //     "memo": memo,
                    //     "msg": [
                    //         {
                    //             "type": txType,
                    //             "value": {
                    //                 "amount": [
                    //                     {
                    //                         "amount": amountNative.toString(),
                    //                         "denom": "uatom"
                    //                     }
                    //                 ],
                    //                 "from_address": addressFrom,
                    //                 "to_address": address
                    //             }
                    //         }
                    //     ],
                    //     "signatures": null
                    // }
                    //
                    // let	chain_id = ATOM_CHAIN
                    //
                    // if(!sequence) throw Error("112: Failed to get sequence")
                    // if(!account_number) throw Error("113: Failed to get account_number")
                    //
                    // let res = await WALLET.cosmosSignTx({
                    //     addressNList: bip32ToAddressNList(HD_ATOM_KEYPATH),
                    //     chain_id: "cosmoshub-3",
                    //     account_number: account_number,
                    //     sequence:sequence,
                    //     tx: unsigned,
                    // });
                    //
                    // log.debug("res: ",res)
                    // log.debug("res*****: ",res)
                    //
                    // let txFinal:any
                    // txFinal = res
                    // txFinal.signatures = res.signatures
                    //
                    // log.debug("FINAL: ****** ",txFinal)
                    //
                    // let broadcastString = {
                    //     tx:txFinal,
                    //     type:"cosmos-sdk/StdTx",
                    //     mode:"sync"
                    // }
                    // rawTx = {
                    //     txid:"",
                    //     coin,
                    //     serialized:JSON.stringify(broadcastString)
                    // }
                }else if(coin === "BNB"){
                    //TODO move to tx builder module
                    //get account info
                    log.debug("addressFrom: ",addressFrom)
                    let accountInfo = await this.pioneerClient.instance.GetAccountInfo({coin,address:addressFrom})
                    accountInfo = accountInfo.data
                    log.debug("accountInfo: ",prettyjson.render(accountInfo))
                    let sequence
                    let account_number
                    let pubkey
                    if(!accountInfo.result){
                        //assume new account
                        sequence = "0"
                        account_number = "0"
                        pubkey = null
                    } else {
                        sequence = transaction.nonce || accountInfo.result.sequence
                        account_number = accountInfo.result.account_number
                        pubkey = accountInfo.result.public_key
                    }

                    if(!address) throw Error("Missing TO address! ")
                    //simple transfer
                    //build tx
                    //TODO type from this from hdwallet
                    let bnbTx = {
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
                    }

                    log.debug(tag,"bnbTx: ",prettyjson.render(bnbTx))
                    // log.debug(tag,"bnbTx: ",JSON.stringify(bnbTx))
                    //bip32ToAddressNList(`m/44'/714'/0'/0/0`)

                    //TODO verify addressFrom path
                    const signedTxResponse = await this.WALLET.binanceSignTx({
                        addressNList: bip32ToAddressNList(`m/44'/714'/0'/0/0`),
                        chain_id: "Binance-Chain-Nile",
                        account_number: account_number,
                        sequence: sequence,
                        tx: bnbTx,
                    })
                    log.debug(tag,"**** signedTxResponse: ",signedTxResponse)
                    log.debug(tag,"**** signedTxResponse: ",JSON.stringify(signedTxResponse))

                    // this is undefined at first tx
                    // let pubkeyHex = pubkey.toString('hex')
                    // log.debug(tag,"pubkeyHex: ",pubkeyHex)

                    let pubkeySigHex = signedTxResponse.signatures.pub_key.toString('hex')
                    log.debug(tag,"pubkeySigHex: ",pubkeySigHex)

                    rawTx = {
                        txid:signedTxResponse.txid,
                        serialized:signedTxResponse.serialized
                    }
                }else if(coin === "EOS"){
                    throw Error ("666: EOS not supported yet!")
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
                }else if(coin === "FIO"){
                    throw Error ("666: FIO not supported yet!")
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
                }else  {
                    throw Error("109: coin not yet implemented! coin: "+coin)
                }



                return rawTx
            } catch (e) {
                log.error(tag, "e: ", e)
                throw e
            }
        }
        this.broadcastTransaction = function (coin:string, signedTx:BroadcastBody) {
            signedTx.coin = coin
            return this.pioneerClient.instance.Broadcast(null,signedTx).data;
        }
    }
}

