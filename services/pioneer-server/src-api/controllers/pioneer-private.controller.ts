/*

    Pioneer REST endpoints



 */
let TAG = ' | API | '

const pjson = require('../../package.json');
const log = require('@pioneer-platform/loggerdog')()
const {subscriber, publisher, redis, redisQueue} = require('@pioneer-platform/default-redis')
let connection  = require("@pioneer-platform/default-mongo")
let queue = require("@pioneer-platform/redis-queue")

var randomstring = require("randomstring");


let usersDB = connection.get('users')
let pubkeysDB = connection.get('pubkeys')
let txsDB = connection.get('transactions')
let utxosDB = connection.get('utxo')

usersDB.createIndex({id: 1}, {unique: true})
usersDB.createIndex({username: 1}, {unique: true})
txsDB.createIndex({txid: 1}, {unique: true})
utxosDB.createIndex({txid: 1}, {unique: true})

const axios = require('axios')
const network = require("@pioneer-platform/network")

import { v4 as uuidv4 } from 'uuid';

//globals

//modules
let pioneer = require('../pioneer')

//rest-ts
import { Body, Controller, Get, Post, Route, Tags, SuccessResponse, Query, Request, Response, Header } from 'tsoa';
import * as express from 'express';

enum AuthProviders {
    shapeshift = 'shapeshift',
    bitcoin = 'bitcoin'
}

// TYPES
export interface CoinInfo {
    coin: string;
    note?: string;
    script_type:string;
    available_scripts_types?:any
    long?: string;
    path:string
    master: string;
    network:string;
    pubkey: string;
    curve?: string,
    tpub?: string;
    xpub?: string;
    zpub?: string;
    type?:string
}


interface RegisterBodyData {
    pubkeys: any;
}

// interface RegisterBodyData {
//     pubkeys: CoinInfo[];
// }

interface GetNewAddressBody {
    coin:string
}

interface PairBody {
    code:string
}

interface RegisterEosUsername {
    username:string
    pubkey:string
}

interface TransactionsBody {
    coin:string
    startTime?:number
    endTime?:number
    startBlock?:number
    endBlock?:number
}

//importBody
interface importBody {
    source:string,
    coin:string,
    // pubkeys:Array<Pubkeys> //TODO why this no work
    pubkeys:any
}

interface Pubkeys {
    address: string;
    index: string
}

interface RegisterBody {
    isTestnet?:boolean
    username:string
    data:RegisterBodyData,
    auth:string,
    queryKey?:string,
    provider:AuthProviders
}

interface createApiKeyBody {
    account:string
    data?:any
}

interface createPairingCodeBody {
    service?:string
    url:string
    data?:any
}

const short = require('short-uuid');

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

//route
@Tags('Private Endpoints')
/**
 *  Test

 */
@Route('')
export class pioneerPrivateController extends Controller {

    /**
            Forget Account
                Clear transactions
     */
    @Get('/forget')
    public async forget(@Header('Authorization') authorization: string): Promise<any> {
        let tag = TAG + " | forget | "
        try{
            log.debug(tag,"queryKey: ",authorization)

            let accountInfo = await redis.hgetall(authorization)
            let username = accountInfo.username
            if(!username) throw Error("unknown token! token: "+authorization)
            log.debug(tag,"accountInfo: ",accountInfo)

            //del redis
            redis.del(accountInfo.username+":cache:walletInfo")
            redis.del(authorization)
            redis.del(accountInfo.username)

            //delete mongo
            let userInfo = await usersDB.remove({username})
            if(!userInfo) {
                throw Error("102: unknown user! username: "+username)
            }
            log.debug(tag,"userInfo: ",userInfo)

            return true
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
     Get the balances for a given username

     protect mongo with redis cache

     protect nodes with mongo data

     All events push OUT in production

        nodes ->  mongo -> redis -> (ws) user local db


     */
    @Get('/info')
    public async info(@Header('Authorization') authorization: string): Promise<any> {
        let tag = TAG + " | info | "
        try{
            log.debug(tag,"queryKey: ",authorization)

            let accountInfo = await redis.hgetall(authorization)
            if(!accountInfo) throw Error("unknown token! token:"+authorization)

            if(accountInfo){
                log.info(tag,"accountInfo: ",accountInfo)
                let isTestnet = accountInfo.isTestnet || false
                log.info(tag,"isTestnet: ",isTestnet)
                let username = accountInfo.username
                if(!username){
                    log.error(tag,"invalid accountInfo: ",accountInfo)
                    throw Error("invalid token info! token:"+authorization)
                }
                //get cache
                let walletInfo:any = await redis.get(accountInfo.username+":cache:walletInfo")

                //TODO dont nerf cache! clear when new asset
                if(walletInfo){
                    log.debug(tag,"user info cached!: ")
                    log.info(tag,"user info cached!: ",walletInfo)

                    //push to pubkeys sync?

                    try{
                        walletInfo = JSON.parse(walletInfo)
                        walletInfo.username = username
                        return walletInfo;
                    }catch(e){
                        throw Error("103: invalid cache!")
                    }
                }else{
                    log.debug(tag,"user info cached!: ")
                    log.debug(tag,"username: ",username)
                    //get pubkeys from mongo
                    let userInfo = await usersDB.findOne({username})
                    if(!userInfo) {
                        throw Error("102: unknown user! username: "+username)
                    }
                    log.debug(tag,"userInfo: ",userInfo)

                    //reformat
                    let pubkeys = {}
                    for(let i = 0; i < userInfo.pubkeys.length; i++){
                        let pubkeyInfo = userInfo.pubkeys[i]
                        pubkeys[pubkeyInfo.coin] = pubkeyInfo

                        //TODO dont do this for multi-wallet
                        //validate (migrate)
                        if(!pubkeys[pubkeyInfo.coin].script_type || !pubkeys[pubkeyInfo.coin].network ||!pubkeys[pubkeyInfo.coin].coin){
                            log.error("Invalid pubkey found for user!")
                            //delete
                            await usersDB.remove({username})
                            //generate
                            //save
                        }
                    }

                    //import into wallet
                    log.info(tag,"isTestnet: ",isTestnet)
                    await network.init('full',{
                        pubkeys
                    },isTestnet)
                    //get wallet info
                    walletInfo = await network.getInfo()
                    walletInfo.username = username

                    //apps
                    walletInfo.apps = await redis.smembers(username+":apps")

                    log.info(tag,"walletInfo: ",walletInfo)

                    //write to cache
                    await redis.setex(accountInfo.username+":cache:walletInfo",5,JSON.stringify(walletInfo))
                }

                return walletInfo
            }else{
                return {
                    error:true,
                    message:"101: Token not found! auth: "+authorization
                }
            }

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
        Get the balances for a given username
     */
    @Get('/balance/{coin}')
    public async balance(coin:string,@Header('Authorization') authorization): Promise<any> {
        let tag = TAG + " | balance | "
        try{
            log.debug(tag,"queryKey: ",authorization)
            log.debug(tag,"coin: ",coin)

            let accountInfo = await redis.hgetall(authorization)
            let username = accountInfo.username
            if(!username) throw Error("unknown token! token:"+authorization)

            //get cache
            log.debug(tag,"cache path: ",accountInfo.username+":cache:"+coin+":balance")
            let balance = await redis.get(accountInfo.username+":cache:"+coin+":balance")
            log.debug(tag,"balance: ",balance)
            if(balance){
                return(JSON.parse(balance));
            }else{
                log.debug(tag,"username: ",username)
                //get pubkeys from mongo
                let userInfo = await usersDB.findOne({username})
                if(!userInfo) {
                    throw Error("102: unknown user! username: "+username)
                }
                log.debug(tag,"userInfo: ",userInfo)

                //reformat
                let pubkeys = {}
                for(let i = 0; i < userInfo.pubkeys.length; i++){
                    let pubkeyInfo = userInfo.pubkeys[i]
                    pubkeys[pubkeyInfo.coin] = pubkeyInfo
                }

                //import into wallet
                await network.init('full',{
                    pubkeys
                })
                //get wallet info
                balance = await network.getBalance(coin)

                //write to cache
                await redis.setex(accountInfo.username+":cache:"+coin+":balance",1000 * 5,JSON.stringify(balance))
            }

            return balance
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
     * Pair an sdk with app
     * @param request This is an application pairing submission
     */

    @Post('/pair')
    public async pair(@Body() body: PairBody, @Header() Authorization: any): Promise<any> {
        let tag = TAG + " | pair | "
        try{
            log.info(tag,"account: ",body)
            log.info(tag,"Authorization: ",Authorization)

            // get user info
            let userInfo = await redis.hgetall(Authorization)
            log.info(tag,"userInfo: ",userInfo)
            //if no info throw
            if(!userInfo) throw Error("User not known!")
            if(!userInfo.username) throw Error("invalid user!")

            // get queryKey for code sdk user
            let sdkQueryKey = await redis.hget(body.code,"pairing")
            if(!sdkQueryKey) throw Error("unknown code!")
            log.info(tag,"sdkQueryKey: ",sdkQueryKey)

            // get url
            let url = await redis.hget(body.code,"url")

            // if in whitelist
            let isWhitelisted = await redis.sismember('serviceUrls',url)

            // let app = {
            //     added:new Date().getTime(),
            //     url
            //     //More?
            // }

            //push to username cache
            redis.sadd(userInfo.username+":apps",url)

            //add to userInfo
            let pushAppMongo = await usersDB.update({ username: userInfo.username },
                { $addToSet: { apps: url } })
            log.info(tag,"pushAppMongo: ",pushAppMongo)

            // sdkUser
            let sdkUser = {
                username:userInfo.username,
                paired: new Date().getTime(),
            }

            //save queryKey code
            let saveRedis = await redis.hmset(sdkQueryKey,sdkUser)

            let output = {
                user:sdkUser,
                url,
                saveRedis,
                trusted:isWhitelisted
            }

            return(output);
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
     * Pair an sdk with app
     * @param request This is an application pairing request
     */

    @Post('/createPairingCode')
    public async createPairingCode(@Body() body: createPairingCodeBody, @Header() Authorization: any): Promise<any> {
        let tag = TAG + " | createPairingCode | "
        try{
            log.debug(tag,"account: ",body)
            log.debug(tag,"Authorization: ",Authorization)

            //is key known
            let userInfo = await redis.hgetall(Authorization)
            log.info(tag,"userInfo: ",userInfo)

            // if known return username (already paired)

            // is service known
                //if new service save to db

            //create random code
            let code = randomstring.generate(6)
            code = code.toUpperCase()
            log.info(tag,"code: ",code)

            //save code to key
            let saveRedis = await redis.hset(code,"pairing",Authorization)
            redis.hset(code,"url",body.url)

            let output = {
                code,
                saveRedis
            }

            return(output);
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
     * Create an api key
     * @param request This is a user creation request description
     */

    @Post('/createApiKey')
    public async createApiKey(@Body() body: createApiKeyBody, @Header() Authorization: any): Promise<any> {
        let tag = TAG + " | createApiKey | "
        try{
            log.debug(tag,"account: ",body)
            log.debug(tag,"Authorization: ",Authorization)

            //username
            if(!body.account) throw Error("102: missing account")
            let account = body.account

            //is known account?
            let accountInfo = await redis.hgetall(body.account)
            log.debug(tag,"accountInfo: ",accountInfo)

            //create key
            let newKey = short.generate()
            log.debug(tag,"newKey: ",newKey)

            let isMember = false

            let createdDate = new Date().getTime()
            await redis.hset(newKey,'account',account)
            await redis.hset(newKey,'username',account)
            if(isMember)await redis.hset(newKey,'isMember',"true")
            await redis.hset(newKey,'created',createdDate)


            let output = {
                queryKey:newKey,
                created: createdDate,
                isMember,
                permissions:['READ','SUBSCRIBE']
            }

            return(output);
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
     * get utxos
     * @param request This is a users unspent txs
     */

    @Post('/utxos')
    public async getUtxos(@Body() body: any, @Header() Authorization: any): Promise<any> {
        let tag = TAG + " | getUtxos | "
        try{
            log.debug(tag,"account: ",body)
            log.debug(tag,"Authorization: ",Authorization)

            let accountInfo = await redis.hgetall(Authorization)
            log.debug(tag,"accountInfo: ",accountInfo)

           if(accountInfo){
               //TODO filter by coin

               let utxos = await utxosDB.find({accounts:{ $all: [accountInfo.username]}})
               log.info(tag,"utxos: ",utxos)

               return(utxos);
           } else {
               throw Error("user not found!")
           }
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
     * Get transaction history
     *
     * start block
     * end block
     * coin
     *
     */
    @Post('/transactions')
    public async transactions(@Header('Authorization') authorization: string,@Body() body: TransactionsBody): Promise<any> {
        let tag = TAG + " | transactions | "
        try{
            log.debug("************************** CHECKPOINT *******************88 ")
            log.debug(tag,"body: ",body)
            log.debug(tag,"queryKey: ",authorization)
            //
            let accountInfo = await redis.hgetall(authorization)
            if(Object.keys(accountInfo).length === 0) throw Error("102: Unknown Api key! ")
            log.debug(tag,"accountInfo: ",accountInfo)

            let username = accountInfo.username
            let coin = body.coin
            let startBlock = body.startBlock
            if(!startBlock) startBlock = 0

            let query = {
                $and:[
                    {asset:coin},
                    {height:{ $gt: startBlock }},
                    {accounts:username}
                ]
            }

            /*
                How to do range
                db.users.count({
                    marks: {$elemMatch: {$gte: 20, $lt: 30}}
                })
             */

            log.debug(tag,"query: ",JSON.stringify(query))
            //get transactions
            let txs = await txsDB.find(query,{limit:300,maxTimeMS:30 * 1000})

            log.debug("txs: ",txs)

            let output = []


            for(let i = 0; i < txs.length; i++){
                //TODO DOUP CODE
                // move to audit?
                // link main.ts (socket events)
                let tx = txs[i]
                let type
                let from
                let to
                let amount
                let fee
                log.debug(tag,"tx: ",tx)
                for(let j = 0; j < tx.events.length; j++){

                    let event = tx.events[j]
                    log.debug(tag,"event: ",event)
                    let addressInfo = await redis.smembers(event.address+":accounts")

                    if(addressInfo.indexOf(username) >= 0 && event.type === 'debit'){
                        type = 'send'
                    }
                    if(addressInfo.indexOf(username) >= 0 && event.type === 'credit'){
                        type = 'receive'
                    }

                    if(event.type === 'debit' && !event.fee){
                        from = event.address
                    }
                    if(event.type === 'debit' && event.fee){
                        fee = {
                            asset:tx.asset
                        }
                    }
                    if(event.type === 'credit'){
                        to = event.address
                        amount = event.amount
                    }
                }

                //default (TODO dont do this)
                if(!fee){
                    fee = {
                        "amount": 0.0002,
                        "asset": "ETH"
                    }
                }

                let summary = {
                    type,
                    asset:tx.asset,
                    from,
                    to,
                    amount,
                    fee,
                    txid:tx.txid,
                    height:tx.height,
                    time:tx.time
                }

                output.push(summary)
            }



            return(output);
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
     *  Create a user account on Pioneer
     *
     *  Auth providers
     *
     *     * Shapeshift
     *
     *     * Keypair
     *
     *
     *
     *
     *  NOTE:
     *
     *  Any already REGISTERED user may use this name to register additional coins
     *
     *
     *  Output:
     *      QueryToken: (SUBSCRIBE/INFO permissions)
     *          Blockchain and payment info
     *
     *  Auth providers may issue/revoke Query tokens
     *
     * @param request This is a user creation
     */

    @Post('/register')
    public async register(@Header('Authorization') authorization: string, @Body() body: RegisterBody): Promise<any> {
        let tag = TAG + " | register | "
        try{
            let output:any = {}
            let newKey
            log.debug(tag,"body: ",body)

            //if auth found in redis
            const authInfo = await redis.hgetall(authorization)
            log.info(tag,"authInfo: ",authInfo)
            let isTestnet = authInfo.isTestnet || false
            if(body.isTestnet && Object.keys(authInfo).length != 0 && !isTestnet) throw Error(" Username already registerd on mainnet! please create a new")
            log.debug(tag,"authInfo: ",authInfo)

            //isTestnet
            if(body.isTestnet){
                isTestnet = true
            }

            let username
            if(Object.keys(authInfo).length > 0){
                log.debug(tag,"checkpoint 1 auth key known")

                username = authInfo.username
                if(!username) throw Error("102: invalid auth data!")

                //does username match register request
                if(username !== body.username){
                    //is username taken?
                    let userInfo = await redis.hgetall(body.username)
                    if(Object.keys(userInfo).length > 0){
                        throw Error("103: unable create new user, username taken!")
                    } else {
                        log.error(tag,"authInfo.username: ",authInfo.username)
                        log.error(tag,"username: ",body.username)
                        throw Error("104: username transfers on tokens not supported! owned username:"+username)
                    }
                } else {
                    log.info("username available! checkpoint 1a")
                }
            } else {
                log.info(tag,"checkpoint 1a auth key NOT known")
                newKey = true
            }
            if(!username) username = body.username

            let userInfoMongo = await usersDB.findOne({username})
            log.info(tag,"userInfoMongo: ",userInfoMongo)

            log.info("checkpoint 2 post mongo query!")
            if(!userInfoMongo || newKey || true){ //TODO wtf with true?
                log.info("checkpoint 2a no mongo info!")
                //TODO if newKey
                //verify auth!

                //is available on fio?
                // let isAvailable = await networks['FIO'].isAvailable(username)
                // if(!isAvailable) throw Error("username not available!")

                //register fio pubkey

                //register all supported chains

                let registered = new Date().getTime()
                if(!body.data.pubkeys) throw Error("105: missing pubkeys!")
                log.debug(tag,"pubkeys: ",body.data.pubkeys)

                let coins = Object.keys(body.data.pubkeys)
                let pubkeys = []

                for(let i = 0; i < coins.length; i++){
                    let coin = coins[i]
                    let pubkey = body.data.pubkeys[coin]
                    log.debug(tag,"pubkey: ",body.data.pubkeys[coin])

                    //validate pubkey
                    if(!pubkey.coin) throw Error("Invalid pubkey required field: coin")
                    if(!pubkey.script_type) throw Error("Invalid pubkey required field: script_type coin:"+pubkey.coin)
                    if(!pubkey.network) throw Error("Invalid pubkey required field: network coin:"+pubkey.coin)

                    pubkeys.push(pubkey)
                }
                //pubkey index
                let pubkeyIndex = pubkeys.length

                //coin index
                let coinIndex = coins.length

                //register username
                let userInfo:any = {
                    registered,
                    id:uuidv4(),
                    username:body.username,
                    verified:true,
                    pubkeys,
                    coins,
                    ssInfo:{},
                    pubkeyIndex,
                    coinIndex
                }
                if(isTestnet) userInfo.isTestnet = true //NOTE: this saves as string if false
                //save to mongo
                log.info(tag,"userInfo: ",userInfo)

                try{
                    let mongoSuccess =  await usersDB.insert(userInfo)
                    log.info(tag,"mongoSuccess: ",mongoSuccess)
                }catch(e){
                    log.error(tag,"mongo: ",e)
                }

                //save to redis
                delete userInfo.ssInfo
                delete userInfo.pubkeys
                delete userInfo.pubkeys
                delete userInfo.coins

                let redisSuccess = await redis.hmset(body.username,userInfo)
                log.info(tag,"redisSuccess: ",redisSuccess)

                let redisSuccessAuth = await redis.hmset(body.auth,userInfo)
                log.info(tag,"redisSuccessAuth: ",redisSuccessAuth)

                let redisSuccessKey = await redis.hmset(authorization,userInfo)
                log.info(tag,"redisSuccessKey: ",redisSuccessKey)

                let result = await pioneer.register(body.username, pubkeys)
                log.debug(tag,"result: ",result)

                //push

            } else {
                //TODO
                log.info("user found... not doing anything")

                //get pubkeys in body

                //compair with register request

                //add new keys

                //update conflicts?
            }
            log.info("checkpoint 3")
            let userInfoRedis = await redis.hgetall(username)
            log.info(tag,"userInfoRedis: ",userInfoRedis)
            log.info("checkpoint 4 final ")

            output.success = true
            //data
            //output.result = result
            output.userInfo = userInfoRedis

            return output
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
     *  Import Pubkeys
     *
     *  Bulk add address's to be tracked under a username
     *
     */

    @Post('/import')
    public async import(@Header('Authorization') authorization: string, @Body() body: importBody): Promise<any> {
        let tag = TAG + " | register | "
        try{
            let output:any = {}
            let newKey
            log.debug(tag,"body: ",body)

            //if auth found in redis
            const authInfo = await redis.hgetall(authorization)
            log.debug(tag,"authInfo: ",authInfo)

            let username
            if(Object.keys(authInfo).length > 0){
                log.debug(tag,"checkpoint 1 auth key known")

                username = authInfo.username
                if(!username) throw Error("102: invalid auth data!")
            } else {
                log.info(tag,"checkpoint 1a auth key NOT known")
                newKey = true
            }
            if(!username) throw Error("104: unable to find username!")

            let userInfoMongo = await usersDB.findOne({username})
            log.info(tag,"userInfoMongo: ",userInfoMongo)

            log.info("checkpoint 2 post mongo query!")
            if(!userInfoMongo || newKey){
                log.info("checkpoint 2a no mongo info!")
                throw Error("unable to import until AFTER registered!")

            } else {

                let saveActions = []
                //bulk update mongo
                for(let i = 0; i < body.pubkeys.length; i++){
                    let pubkeyInfo:any = body.pubkeys[i]
                    log.debug(tag,"pubkey: ",pubkeyInfo)

                    let entry = {
                        coin:body.coin,
                        path:pubkeyInfo.path,
                        created:new Date().getTime(),
                        tags:[body.source,username],
                        pubkey:pubkeyInfo.address
                    }

                    //add to address ingester
                    let work = {
                        address:pubkeyInfo.address,
                        account:username
                    }
                    queue.createWork(body.coin+":address:queue:ingest",work)

                    //save all
                    saveActions.push({insertOne:entry})

                }
                output.count = saveActions.length
                try{
                    output.resultSaveDB = await pubkeysDB.bulkWrite(saveActions)
                }catch(e){
                    output.resultSaveDB = e
                }


                //TODO bulkwrite to postgress finance
            }

            log.info("checkpoint 3")
            let userInfoRedis = await redis.hgetall(username)
            log.info(tag,"userInfoRedis: ",userInfoRedis)
            log.info("checkpoint 4 final ")

            output.success = true
            output.userInfo = userInfoRedis

            return output
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
