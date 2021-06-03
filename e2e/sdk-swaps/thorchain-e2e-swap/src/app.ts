/*
   *** E2E TEST ***
        App Module


    Init from env vars
    * verify empty env at start
    * verify creation

 */
require("dotenv")
require("dotenv").config({path:'./../../.env'})
require("dotenv").config({path:'../../../.env'})
require("dotenv").config({path:'../../../../.env'})

let assert = require('assert')

//test app
let App = require("@pioneer-platform/pioneer-app")
const log = require("@pioneer-platform/loggerdog")()
const ethCrypto = require("@pioneer-platform/eth-crypto")

//general dev envs
let seed = process.env['WALLET_TEST']
if(!seed) throw Error("Failed to find test seed!")
let password = process.env['WALLET_PASSWORD'] || '123'
let username = process.env['TEST_USERNAME_2'] || 'e2e-user-1'
let queryKey = process.env['TEST_QUERY_KEY_2'] || 'testkey123'
let spec = process.env['URL_PIONEER_SPEC'] || 'https://pioneers.dev/spec/swagger.json'
let wss = process.env['URL_PIONEER_SOCKET'] || 'wss://pioneers.dev'

//Globals
let WALLET_INIT = false
let WALLETS_LOADED:any = []
let WALLETS_NAMES:any = []
let WALLET_CONTEXT = ""
let INVOCATIONS:any = []
let INVOCATIONS_SIGNED:any = []
let blockchains = ['bitcoin','ethereum','thorchain','bitcoincash','litecoin','binance']

export async function startApp() {
    let tag = " | app_assert_env_start | "
    try {

        //assert env correct
        assert(seed)
        assert(password)
        assert(username)
        assert(queryKey)

        //get config
        let config = await App.getConfig()
        assert(config === null)

        let wallet1:any = {
            mnemonic:seed,
            username:username,
            password
        }
        //get master for seed
        let walletEth = await ethCrypto.generateWalletFromSeed(wallet1.mnemonic)
        wallet1.masterAddress = walletEth.masterAddress

        //create wallet files
        let successCreate = await App.createWallet('software',wallet1)
        assert(successCreate)

        await App.initConfig("english");
        App.updateConfig({username});
        App.updateConfig({temp:password});
        App.updateConfig({created: new Date().getTime()});
        assert(spec)
        assert(wss)
        App.updateConfig({blockchains})
        App.updateConfig({spec});
        App.updateConfig({wss});
        //get config
        config = await App.getConfig()
        config.blockchains = ['ethereum','thorchain']
        config.spec = spec
        config.pioneerSocket = wss

        //verify startup
        log.info(tag,"config: ",config)
        let resultInit = await App.init(config)
        let isInit2 = App.isInitialized()
        assert(isInit2)

        //AutonomousOn
        resultInit.events.on('unsignedTx', async (transaction:any) => {
            console.log("\n ****UN-signed transaction received! transaction: ",transaction)
            if(!transaction.invocationId) throw Error("102: invalid transaction invocationId")
            if(!transaction.invocation) throw Error("103: invalid transaction invocation")
            if(!transaction.unsignedTx) throw Error("104: invalid transaction unsignedTx")
            //get invocationId

            //only sign each once (if NOT in array)
            if(INVOCATIONS_SIGNED.indexOf(transaction.invocationId) < 0){
                INVOCATIONS_SIGNED.push(transaction.invocationId)
                INVOCATIONS.push(transaction)
            }
        })

        config.password = password
        config.username = username

        //get wallets
        let wallets = await App.getWallets()
        WALLETS_LOADED = wallets
        let walletNames = await App.getWalletNames()
        WALLETS_NAMES = walletNames

        //get user info
        let userInfo = await App.getUserInfo()
        let context = userInfo.context
        assert(context)
        WALLET_CONTEXT = context
        assert(WALLETS_LOADED[WALLET_CONTEXT])
        return WALLETS_LOADED[WALLET_CONTEXT]
    } catch (e) {
        log.error(e)
        throw e
    }
}

export async function getInvocations() {
    let tag = " | getInvocations | "
    try {
        //get remote?

        return INVOCATIONS
    } catch (e) {
        log.error(e)
        throw e
    }
}

export async function sendPairingCode(code:string) {
    let tag = " | sendPairingCode | "
    try {
        let pairResult = await App.pair(code)
        console.log("pairResult: ",pairResult)

        return true
    } catch (e) {
        log.error(e)
        throw e
    }
}

export async function buildTransaction(transaction:any) {
    let tag = " | buildTransaction | ";
    try {
        log.info(tag,"transaction: ",transaction)
        if(!transaction.invocationId) throw Error("invocationId required!")

        //get invocation

        //TODO validate type and fields

        let invocation = await App.getInvocation(transaction.invocationId)
        log.info(tag,"invocation: ",invocation)

        if(!invocation.type) invocation.type = invocation.invocation.type

        let context
        if(!transaction.context){
            context = WALLET_CONTEXT
        } else {
            context = transaction.context
        }
        if(!context || !WALLETS_LOADED[context]) {
            log.error("context: ",context)
            log.error("Available: ",WALLETS_LOADED)
            throw Error("103: could not find context in WALLETS_LOADED! "+context)
        }
        let walletContext = WALLETS_LOADED[context]
        if(!walletContext.walletId){
            walletContext.walletId = walletContext.context
        }
        if(!walletContext.walletId) throw Error("Invalid wallet! missing walletId!")
        log.info(tag,"walletContext: ",walletContext.walletId)

        let unsignedTx
        switch(invocation.type) {
            case 'transfer':
                console.log(" **** BUILD TRANSACTION ****  invocation: ",invocation.invocation)
                //TODO validate transfer object
                unsignedTx = await walletContext.buildTransfer(invocation.invocation)
                log.debug(" **** RESULT TRANSACTION ****  unsignedTx: ",unsignedTx)

                break
            case 'approve':
                console.log(" **** BUILD Approval ****  invocation: ",invocation.invocation)
                unsignedTx = await walletContext.buildApproval(invocation.invocation)
                console.log(" **** RESULT TRANSACTION ****  approvalUnSigned: ",unsignedTx)
                break
            case 'deposit':
                console.log(" **** BUILD DEPOSIT ****  invocation: ",invocation.invocation)
                unsignedTx = await walletContext.deposit(invocation.invocation)
                console.log(" **** RESULT TRANSACTION ****  depositUnSigned: ",unsignedTx)
                break
            case 'swap':
                console.log(" **** BUILD SWAP ****  invocation: ",invocation.invocation)
                unsignedTx = await walletContext.buildSwap(invocation.invocation)
                console.log(" **** RESULT TRANSACTION ****  swapUnSigned: ",unsignedTx)
                break
            default:
                console.error("Unhandled type: ",invocation.type)
                console.error("Unhandled: ",invocation)
                throw Error("Unhandled type: "+invocation.type)
        }

        //update invocation
        let invocationId = invocation.invocationId
        let updateBody = {
            invocationId,
            invocation,
            unsignedTx
        }

        //update invocation remote
        let resultUpdate = await App.updateInvocation(updateBody)
        log.debug(tag,"resultUpdate: ",resultUpdate)

        return unsignedTx
    } catch (e) {
        console.error(tag, "e: ", e);
        throw e
    }
}

export async function approveTransaction(transaction:any) {
    let tag = " | approveTransaction | ";
    try {
        //get invocation

        let invocation = await App.getInvocation(transaction.invocationId)
        log.info(tag,"invocation: ",invocation)
        if(!invocation.unsignedTx) throw Error("invalid invocation! missing unsignedTx")
        if(!invocation.unsignedTx.HDwalletPayload) throw Error("invalid invocation! invalid unsignedTx missing HDwalletPayload")

        let context
        if(!transaction.context){
            context = WALLET_CONTEXT
        } else {
            context = transaction.context
        }

        if(!context || Object.keys(WALLETS_LOADED).indexOf(context) < 0) {
            log.error("context: ",context)
            log.error("Available: ",Object.keys(WALLETS_LOADED))
            throw Error("103: could not find context in WALLETS_LOADED! "+context)
        }
        let walletContext = WALLETS_LOADED[context]
        if(!walletContext.walletId){
            walletContext.walletId = walletContext.context
        }
        if(!walletContext.walletId) throw Error("Invalid wallet! missing walletId!")
        log.debug(tag,"walletContext: ",walletContext.walletId)

        //TODO kill the coin! field
        // invocation.unsignedTx.HDwalletPayload.coin = invocation.invocation.coin || invocation.invocation.network
        // if(!invocation.unsignedTx.HDwalletPayload.coin){
        //     invocation.unsignedTx.HDwalletPayload.coin = invocation.deposit.network
        // }

        //get
        //if(invocation.unsignedTx.HDwalletPayload.coin === 'BitcoinCash') invocation.unsignedTx.HDwalletPayload.coin = 'BCH'

        //unsinged TX
        log.info(tag,"invocation.unsignedTx: ",JSON.stringify(invocation.unsignedTx))
        log.info(tag,"invocation.unsignedTx: ",invocation.unsignedTx)
        log.info(tag,"invocation.unsignedTx HDwalletPayload: ",JSON.stringify(invocation.unsignedTx.HDwalletPayload))
        let signedTx = await walletContext.signTransaction(invocation.unsignedTx)

        //update invocation
        let invocationId = invocation.invocationId
        let updateBody = {
            invocationId,
            invocation,
            unsignedTx:invocation.unsignedTx,
            signedTx
        }

        //update invocation remote
        let resultUpdate = await App.updateInvocation(updateBody)
        log.debug(tag,"resultUpdate: ",resultUpdate)

        return signedTx
    } catch (e) {
        console.error(tag, "e: ", e);
        throw e
    }
}

export async function broadcastTransaction(transaction:any) {
    let tag = " | broadcastTransaction | ";
    try {
        //get invocation

        let invocation = await App.getInvocation(transaction.invocationId)
        log.info(tag,"invocation: ",invocation)

        //
        if(!invocation.signedTx) throw Error("102: Unable to broadcast transaction! signedTx not found!")

        //
        let context
        if(!transaction.context){
            context = WALLET_CONTEXT
        } else {
            context = transaction.context
        }

        if(!context || Object.keys(WALLETS_LOADED).indexOf(context) < 0) {
            log.error("context: ",context)
            log.error("Available: ",Object.keys(WALLETS_LOADED))
            throw Error("103: could not find context in WALLETS_LOADED! "+context)
        }
        let walletContext = WALLETS_LOADED[context]
        if(!walletContext.walletId){
            walletContext.walletId = walletContext.context
        }
        if(!walletContext.walletId) throw Error("Invalid wallet! missing walletId!")
        log.debug(tag,"walletContext: ",walletContext.walletId)

        //TODO fix tech debt
        //normalize
        if(!invocation.invocation.invocationId) invocation.invocation.invocationId = invocation.invocationId
        if(!invocation.signedTx.invocationId) invocation.signedTx.invocationId = invocation.invocationId
        if(invocation.signedTx && invocation.signedTx.noBroadcast) invocation.signedTx.noBroadcast = true
        if(!invocation.signedTx.network) invocation.signedTx.network = invocation.signedTx.coin

        //force noBroadcast
        // invocation.signedTx.noBroadcast = true
        let broadcastResult = await walletContext.broadcastTransaction(invocation.signedTx.network,invocation.signedTx)
        log.info(tag,"broadcastResult: ",broadcastResult)

        return broadcastResult
    } catch (e) {
        console.error(tag, "e: ", e);
        throw e
    }
}
