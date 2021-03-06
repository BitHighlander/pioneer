/*
   *** E2E TEST ***
        App Module


    Init from env vars
    * verify empty env at start
    * verify creation

 */

require("dotenv").config({path:'./../../.env'})
require("dotenv").config({path:'../../../.env'})
require("dotenv").config({path:'../../../../.env'})

let assert = require('assert')

//test app
let App = require("@pioneer-platform/pioneer-app")
const log = require("@pioneer-platform/loggerdog")()
const ethCrypto = require("@pioneer-platform/eth-crypto")

//general dev envs
let seed = process.env['WALLET_MAINNET_DEV_OLD']
let password = process.env['WALLET_PASSWORD']
let username = process.env['TEST_USERNAME_2']
let queryKey = process.env['TEST_QUERY_KEY_2']
let spec = process.env['URL_PIONEER_SPEC']
let wss = process.env['URL_PIONEER_SOCKET']

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
        log.info(tag,"successCreate: ",successCreate)
        //assert(successCreate)

        await App.initConfig("english");
        // App.updateConfig({isTestnet:true});
        App.updateConfig({username});
        App.updateConfig({temp:password});
        App.updateConfig({created: new Date().getTime()});

        //get config
        config = await App.getConfig()

        config.blockchains = ['ethereum']
        config.spec = spec
        config.pioneerSocket = wss
        //verify startup
        //let isTestnet = null
        log.info(tag,"config: ",config)
        let resultInit = await App.init(config)
        assert(resultInit)

        config.password = password
        config.username = username

        resultInit.events.on('message', async (request:any) => {
            switch(request.type) {
                case 'transfer':
                    log.info(tag," **** PROCESS EVENT ****  request: ",request)
                    break
                default:
                    console.log("Unhandled type: ",request.type)
            }
        })

            //get wallets
        let wallets = await App.getWallets()

        //assert only 1
        let context = wallets[await App.context()]

        return context
    } catch (e) {
        log.error(e)
        throw e
    }
}

export async function approveTransaction(invocationId:string) {
    let tag = " | sendPairingCode | "
    try {

        let signedTx = await App.approveTransaction(App.context(),invocationId)
        log.info(tag," ***  signedTx: ",signedTx)

        return signedTx
    } catch (e) {
        log.error(e)
        throw e
    }
}

export async function sendPairingCode(code:string) {
    let tag = " | sendPairingCode | "
    try {
        let pairResult = await App.pair(code)
        //console.log("pairResult: ",pairResult.data)

        return true
    } catch (e) {
        log.error(e)
        throw e
    }
}
