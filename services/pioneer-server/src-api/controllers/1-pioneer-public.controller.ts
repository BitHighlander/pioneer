/*

    Pioneer REST endpoints



 */
let TAG = ' | API | '

const pjson = require('../../package.json');
const log = require('@pioneer-platform/loggerdog')()
const {subscriber, publisher, redis, redisQueue} = require('@pioneer-platform/default-redis')
// let connection  = require("@pioneer-platform/mongo-default-env")
const tokenData = require("@pioneer-platform/pioneer-eth-token-data")
// let usersDB = connection.get('users')
// let txsDB = connection.get('transactions')
// let txsRawDB = connection.get('transactions-raw')
// const axios = require('axios')
// const network = require("@pioneer-platform/network")

const networks:any = {
    'ETH' : require('@pioneer-platform/eth-network'),
    'ATOM': require('@pioneer-platform/cosmos-network'),
    // 'BNB' : require('@pioneer-platform/bnb-network'),
    'RUNE' : require('@pioneer-platform/thor-network'),
    // 'EOS' : require('@pioneer-platform/eos-network'),
    'FIO' : require('@pioneer-platform/fio-network'),
    'ANY' : require('@pioneer-platform/utxo-network'),
}
// networks.ANY.init('full')
// networks.ETH.init()
// usersDB.createIndex({id: 1}, {unique: true})
// txsDB.createIndex({txid: 1}, {unique: true})
// txsRawDB.createIndex({txhash: 1}, {unique: true})


//modules
// let pioneer = require('../pioneer')

//Cache time
let CACHE_TIME = 1000 * 60 * 1
let CACHE_OVERRIDE = true
//rest-ts
import { Body, Controller, Get, Post, Route, Tags, SuccessResponse, Query, Request, Response, Header } from 'tsoa';
// import * as express from 'express';

//import { User, UserCreateRequest, UserUpdateRequest } from '../models/user';

interface Asset {
    chain:string,
    symbol:string,
    ticker:string,
}

interface ThorchainMemoEncodedBody {
    asset:Asset,
    vaultAddress:string,
    toAddress:string
}

interface BroadcastBody {
    coin?:string
    isTestnet?:boolean,
    serialized:string
    signature?:string
    type?:string
    txid?:string
    broadcastBody?:any
    dscription?:any
    invocationId?:string
}

//types
interface Error {
    success:boolean
    tag:string
    e:any
}

export class ApiError extends Error {
    private statusCode: number;
    constructor(name: string, statusCode: number, message?: string) {
        super(message);
        this.name = name;
        this.statusCode = statusCode;
    }
}

interface Recipient{
    address:string
    amount:string,
    sendMax:boolean
}

interface GetFeesWithMemoBody{
    coin:string
    memo:string,
}

interface EstimateFeeBody{
    coin:string
    amount:string,
    contract:string,
    recipient:string,
    memo:string
}

interface Input{
    network:string
    xpub:string,
    account_address_n:[number]
    script_type:string
}

interface UnsignedUtxoRequest {
    network:string
    recipients:any
    include_txs:boolean
    include_hex:boolean
    effort:number
    inputs:any
}

//TODO move this to coins module!
let UTXO_COINS = [
    'BTC',
    'BCH',
    'LTC',
    'TEST'
]

//route
@Tags('Public Endpoints')
@Route('')
export class pioneerPublicController extends Controller {

    /*
     * globals
     * */
    @Get('/globals')
    public async globals() {
        let tag = TAG + " | globals | "
        try{
            let globals = await redis.hgetall('globals')
            return(globals)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    @Get('/online')
    public async online() {
        let tag = TAG + " | online | "
        try{
            let online = await redis.smembers('online')
            return(online)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    @Get('/coins')
    public async coins() {
        let tag = TAG + " | coins | "
        try{
            let coins = await redis.smembers("pioneer:ASSETS:live")
            return(coins)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /*
     *
     * */
    @Get('/blockHeights')
    public async blockHeights() {
        let tag = TAG + " | blockHeights | "
        try{

            let output:any = await redis.hgetall("blockHeights")

            return(output)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /*
     *     Get block count
     * */
    @Get('/blockHeight/{coin}')
    public async blockHeight(coin:string) {
        let tag = TAG + " | blockHeights | "
        try{
            if(!networks[coin]) throw Error("102: network not supported! ")
            let output:any = await networks[coin].getBlockHeight()

            return(output)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /*
    *
    * */
    @Get('/blocks/{coin}/{height}')
    public async getBlockHash(coin:string,height:number) {
        let tag = TAG + " | blockHeights | "
        try{
            if(!networks[coin]) throw Error("102: network not supported! ")
            let output:any = await networks[coin].getBlockHash(height)

            return(output)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  get public user info
     * @param account
     */
    @Get('/user/{username}')
    public async user(username:string) {
        let tag = TAG + " | getAccount | "
        try{
            let output:any = {}
            if(!username) throw Error("102: address required! ")

            //get from cache
            let accountInfo = await redis.hgetall(username)
            log.info(tag,"cache info:",accountInfo)

            if(Object.keys(accountInfo).length === 0){
                //pioneer domain
                try{
                    let domain = "@scatter"
                    let isAvailable = await networks['FIO'].isAvailable(username+domain)
                    //TODO opt out fio

                    output.available = isAvailable
                    output.username = username
                }catch(e){
                    output.isValid = false
                    output.username = username
                }

            } else if (accountInfo.isPublic){
                output.accountInfo = accountInfo
            } else {
                output.isTaken = true
                output.created = accountInfo.created
                output.isPrivate = true
            }

            return(output)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  get balance of an address
     */
    @Get('/getAddressBalance/{coin}/{address}')
    public async getAddressBalance(coin:string,address:string) {
        let tag = TAG + " | getAddressBalance | "
        try{

            let output = await redis.get("cache:balance:"+address+":"+coin)
            networks.ETH.init({testnet:true})
            if(!output || CACHE_OVERRIDE){
                //if coin = token, network = ETH
                if(tokenData.tokens.indexOf(coin) >=0 && coin !== 'EOS'){
                    output = await networks['ETH'].getBalanceToken(address,coin)
                } else if(coin === 'ETH'){
                    output = await networks['ETH'].getBalanceAddress(address)
                } else {
                    if(!networks[coin]) {
                        throw Error("109: coin not supported! coin: "+coin)
                    } else {
                        output = await networks[coin].getBalance(address)
                    }
                }
                redis.setex("cache:balance:"+address+":"+coin,CACHE_TIME,JSON.stringify(output))
            }

            return(output)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  Cosmos getTransaction
     */
    @Get('{coin}/getTransaction/{txid}')
    public async getTransaction(coin:string,txid:string) {
        let tag = TAG + " | getTransaction | "
        try{
            if(!txid) throw Error("102: txid required! ")

            log.info(tag,"coin: ",coin)
            log.info(tag,"txid: ",txid)

            let output = await networks[coin].getTransaction(txid)
            log.debug("getTxid: output:",output)

            return(output)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    @Get('/getFeeInfo/{coin}')
    public async getFeeInfo(coin:string) {
        let tag = TAG + " | getFee | "
        try{
            let output
            if(UTXO_COINS.indexOf(coin) >= 0){
                //TODO supported assets
                output = await networks['ANY'].getFee(coin)
                log.debug("output:",output)
                //else error
            }else{
                output = await networks[coin].getFee(coin)
            }

            return(output)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }



    /**
     *  Cosmos getValidators
     */
    @Get('/getValidators/')
    public async getValidators() {
        let tag = TAG + " | getValidators | "
        try{

            //TODO supported assets
            let output = await networks['ATOM'].getValidators()
            log.debug("getValidators: output:",output)
            //else error

            return(output)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  Retrieve account info
     */
    @Get('/listUnspent/{coin}/{xpub}')
    public async listUnspent(coin:string,xpub:string) {
        let tag = TAG + " | listUnspent | "
        try{
            let output:any = []
            //TODO if UTXO coin else error
            //TODO does this scale on large xpubs?
            log.info(tag,"coin: ",coin)
            log.info(tag,"xpub: ",xpub)
            //log.info("networks: ",networks)
            //log.info("networks: ",networks.ANY)
            let inputs = await networks.ANY.utxosByXpub(coin,xpub)

            //for each get hex
            for(let i = 0; i < inputs.length; i++){
                let input = inputs[i]
                log.info(tag,"input: ",input)
                //get hex info
                let rawInfo = await networks.ANY.getTransaction(coin,input.txid)
                log.info(tag,"rawInfo: ",rawInfo)
                input.hex = rawInfo.hex
                input.coin = coin
                output.push(input)
            }

            return inputs
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  Retrieve account info
     */
    @Get('/getAccountInfo/{coin}/{address}')
    public async getAccountInfo(coin:string,address:string) {
        let tag = TAG + " | accountsFromPubkey | "
        try{
            log.info(tag,"coin: ",coin)
            log.info(tag,"address: ",address)
            log.info(tag,"networks: ",networks)
            let accounts = await networks[coin].getAccount(address)
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  Retrieve accounts for EOS pubkey
     */
    @Get('/eos/accountsFromPubkey/{pubkey}')
    public async accountsFromEosPubkey(pubkey:string) {
        let tag = TAG + " | accountsFromEosPubkey | "
        try{
            let accounts = await networks['FIO'].getAccountsFromPubkey(pubkey)
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  Retrieve public user info
     */
    @Get('/eos/accountInfo/{username}')
    public async eosAccountInfo(username:string) {
        let tag = TAG + " | eosAccountInfo* | "
        try{
            let accounts = await networks['EOS'].getAccount(username)
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  Tokens balance check
     */
    @Get('/eth/getBalanceToken/{address}/{token}')
    public async getBalanceToken(address:string,token:string) {
        let tag = TAG + " | getBalanceToken | "
        try{
            let accounts = await networks['ETH'].getBalanceToken(token,address)
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  ETH nonce check
     */
    @Get('/eth/getNonce/{address}')
    public async getNonce(address:string) {
        let tag = TAG + " | getNonce | "
        try{
            //if cached
            //get last tx index
            console.log("networks['ETH']: ",networks['ETH'])
            console.log("address: ",address)
            let accounts = await networks['ETH'].getNonce(address)
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  ETH getGasPrice
     */
    @Get('/eth/getGasPrice')
    public async getGasPrice() {
        let tag = TAG + " | getGasPrice | "
        try{
            let accounts = await networks['ETH'].getGasPrice()
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  ETH getTransferData
     */
    @Get('/eth/getTransferData/{coin}/{address}/{amount}')
    public async getTransferData(coin:string,address:string,amount:number) {
        let tag = TAG + " | getGasPrice | "
        try{
            let accounts = await networks['ETH'].getTransferData(coin,address,amount)
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  ETH get token balance and info
     */
    @Get('/eth/getTokens/{address}')
    public async getTokenInfo(address:string) {
        let tag = TAG + " | getGasPrice | "
        try{
            let accounts = await networks['ETH'].getTokenInfo(address)
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  EOS get token balance and info
     */
    @Get('/eos/validateEosUsername/{username}')
    public async validateEosUsername(username:string) {
        let tag = TAG + " | validateEosUsername | "
        try{
            let accounts = await networks['EOS'].getAccount(username)
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    /**
     *  EOS get token balance and info
     */
    @Get('/eos/getEosAccountsByPubkey/{pubkey}')
    public async getEosAccountsByPubkey(pubkey:string) {
        let tag = TAG + " | getEosAccountsByPubkey | "
        try{
            let accounts = await networks['EOS'].getAccountsFromPubkey(pubkey)
            return accounts
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    //TODO
    /**
     * Mempool intake (blocknative)
     *
     */

    //multi chain
    @Post('/getFee')
    public async getFee(@Body() body: any): Promise<any> {
        let tag = TAG + " | getFee | "
        try{
            log.info(tag,"mempool tx: ",body)

            //TODO filter by body.asset.chain
            //if()

            let feeResult = networks['ETH'].getFees(body)

            //save to mongo


            return(feeResult);
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    //ETH only
    @Post('/estimateFeesWithGasPricesAndLimits')
    public async estimateFeesWithGasPricesAndLimits(@Body() body: any): Promise<any> {
        let tag = TAG + " | getFee | "
        try{
            log.info(tag,"mempool tx: ",body)

            //TODO filter by body.asset.chain
            //if()

            //TODO handle mainnet/testnet switch
            networks.ETH.init({testnet:true})

            console.log("networks['ETH']: ",networks['ETH'])
            let feeResult = networks['ETH'].getFees(body)

            //save to mongo


            return(feeResult);
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    @Post('/estimateFee')
    public async estimateFee(@Body() body: EstimateFeeBody): Promise<any> {
        let tag = TAG + " | estimateFee | "
        try{
            let output:any = {}
            log.info(tag,"body: ",body)

            let asset = {
                chain:"ETH",
                symbol:"ETH",
                ticker:"ETH",
            }
            let params = [
                body.contract,
                "0x0000000000000000000000000000000000000000",
                body.amount,
                body.memo
            ]


            //TODO if not eth
            networks.ETH.init({testnet:true})
            let response = await networks['ETH'].estimateFee(asset,params)

            return(response.data)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    @Post('/getThorchainMemoEncoded')
    public async getThorchainMemoEncoded(@Body() body: any): Promise<any> {
        let tag = TAG + " | getFee | "
        try{
            let asset = {
                chain:"ETH",
                symbol:"ETH",
                ticker:"ETH",
            }

            let swap = {
                asset,
                vaultAddress:"0xa13beb789f721253077faefd9bf604e1929e0e74",
                toAddress:"0x3e485e2c7df712ec170c087ecf5c15016a03f93f"
            }
            networks.ETH.init({testnet:true})
            console.log("networks['ETH']: ",networks['ETH'])

            let resp = await networks['ETH'].getMemoEncoded(swap)
            resp = resp
            log.info("resp:",resp)

            return(resp)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    @Post('/getFeesWithMemo')
    public async getFeesWithMemo(@Body() body: GetFeesWithMemoBody): Promise<any> {
        let tag = TAG + " | getFee | "
        try{
            let output:any = {}
            log.info(tag,"body: ",body)

            if(UTXO_COINS.indexOf(body.coin) >= 0){
                //TODO supported assets
                let resp = await networks['ANY'].getFeesWithRates(body.coin,body.memo)
                log.info("resp:",resp)
                //else error
                output = resp
            }else{
                //not supported
                throw Error("coin not supported! coin: "+body.coin)
            }

            return(output)
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    @Post('/pushTx')
    public async pushTx(@Body() body: any): Promise<any> {
        let tag = TAG + " | pushTx | "
        try{
            log.info(tag,"mempool tx: ",body)

            //push to redis
            publisher.publish("mempool",JSON.stringify(body))

            //save to mongo


            return(true);
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }

    //TODO
    // /**
    //  * UTXO Tooles
    //  *
    //  *
    //  *
    //  * Create Unsigned Transaction
    //  *
    //  */
    //
    // @Post('/createUnsignedTransaction')
    // public async createUnsignedTransaction(@Body() body: UnsignedUtxoRequest): Promise<any> {
    //     let tag = TAG + " | createUnsignedTransaction | "
    //     try{
    //         log.info(tag,"")
    //
    //         let result = await network.createUnsignedTransaction(body)
    //
    //         return(result);
    //     }catch(e){
    //         let errorResp:Error = {
    //             success:false,
    //             tag,
    //             e
    //         }
    //         log.error(tag,"e: ",{errorResp})
    //         throw new ApiError("error",503,"error: "+e.toString());
    //     }
    // }

    /**
     * BroadCast a signed transaction
     */
    @Post('/broadcast')
    public async broadcast(@Body() body: BroadcastBody): Promise<any> {
        let tag = TAG + " | transactions | "
        try{
            log.info("************************** CHECKPOINT *******************88 ")
            log.info(tag,"body: ",body)
            let coin = body.coin
            let isTestnet = false
            if(body.isTestnet){
                isTestnet = true
            }
            //if(!networks[coin]) throw Error("102: unknown network coin:"+coin)

            //if
            if(body.invocationId){
                if(!body.txid) throw Error("102 txid required for interactive hook!")
                log.info(tag,"Release InvocationId: ",body.invocationId)
                log.info(tag,"Release body.txid: ",body.txid)
                redis.lpush(body.invocationId,body.txid)
            }

            //broadcast
            let result
            if(coin === 'EOS'){
                result = await networks[coin].broadcast(body.broadcastBody)
            } else if(coin === 'FIO'){
                let broadcast = {
                    signatures:
                        [ body.signature ],
                    compression: "none",
                    packed_context_free_data: '',
                    packed_trx:
                    body.serialized
                }
                if(!body.type) {
                    log.error(tag,"invalid payload!: ",broadcast)
                    throw Error("Fio txs require type!")
                }

                //broadcast based on tx
                switch(body.type) {
                    case "fioSignAddPubAddressTx":
                        log.info(tag,"checkpoint: fioSignAddPubAddressTx ")
                        log.info(tag,"broadcast: ",broadcast)
                        result = await networks[coin].broadcastAddPubAddressTx(broadcast)
                        break;
                    case "fioSignRegisterDomainTx":
                        //TODO
                        break;
                    case "fioSignRegisterFioAddressTx":
                        //TODO
                        break;
                    case "fioSignNewFundsRequestTx":
                        log.info(tag,"checkpoint: broadcastNewFundsRequestTx ")
                        log.info(tag,"broadcast: ",broadcast)
                        result = await networks[coin].broadcastNewFundsRequestTx(broadcast)
                        break;
                    default:
                        throw Error("Type not supported! "+body.type)
                }
            } else if(UTXO_COINS.indexOf(coin) >= 0){
                //normal broadcast
                await networks.ANY.init('full',{isTestnet},isTestnet)
                result = await networks['ANY'].broadcast(coin,body.serialized)
            } else {
                //normal broadcast
                await networks[coin].init({testnet:true},isTestnet)
                result = await networks[coin].broadcast(body.serialized)
            }

            return(result);
        }catch(e){
            let errorResp:Error = {
                success:false,
                tag,
                e
            }
            log.error(tag,"e: ",{errorResp})
            throw new ApiError("error",503,"error: "+e.toString());
        }
    }
}