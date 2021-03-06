/*
    E2E testing
        k8  "job" pattern

    load test seed

    verify empty

    request deposit from faucet

    watch till confirmed

    send back to faucet

    report



    SDK Arch pattern ***


        Start and configure app

        verify socket connection


    Use sdk to

        * check balances
        * check tx history
        * request faucet addresses
        * send x into faucet
        * request withdrawalf rom faucet
        * verify payment

 */

require("dotenv").config()
require('dotenv').config({path:"../../.env"});
require("dotenv").config({path:'../../../.env'})
require("dotenv").config({path:'../../../../.env'})
require("dotenv").config({path:'../../../../../.env'})
const TAG  = " | e2e-test | "
const log = require("@pioneer-platform/loggerdog")()

let assert = require('assert')
import {v4 as uuidv4} from 'uuid';
let SDK = require('@pioneer-platform/pioneer-sdk')
let wait = require('wait-promise');
let sleep = wait.sleep;

const {
    startApp,
    sendPairingCode
} = require('./app')

let BLOCKCHAIN = 'ethereum'
let ASSET = 'ETH'
let MIN_BALANCE = process.env['MIN_BALANCE_ETH'] || 0.0002
let TEST_AMOUNT = process.env['TEST_AMOUNT'] || 0.0001
let spec = process.env['URL_PIONEER_SPEC']
let NO_BROADCAST = process.env['E2E_NO_BROADCAST'] || null
let wss = process.env['URL_PIONEER_SOCKET']

const test_service = async function () {
    let tag = TAG + " | test_service | "
    try {

        //start app and get wallet
        let wallet = await startApp()
        let username = wallet.username
        assert(username)

        let balance = wallet.WALLET_BALANCES[ASSET]
        assert(balance)

        //assert balance local
        //log.info(tag,"wallet: ",wallet)
        log.debug(tag,"wallet: ",wallet.WALLET_BALANCES)
        if(balance < MIN_BALANCE){
            log.error(tag," Test wallet low! amount: "+balance+" target: "+MIN_BALANCE+" Send moneies to "+ASSET+": "+await wallet.getMaster(ASSET))
            throw Error("101: Low funds!")
        } else {
            log.info(tag," Attempting e2e test "+ASSET+" balance: ",balance)
        }

        //generate new key
        const queryKey = uuidv4();
        assert(queryKey)

        let config = {
            queryKey,
            spec,
            wss
        }

        /*
            Common Error()
                if you pass a username before paired, the subscribe will failed!
         */

        let app = new SDK.SDK(spec,config)

        let events = await app.startSocket()

        let eventPairReceived = false
        events.on('message', async (request:any) => {
            log.info(tag,"message: ",request)
            assert(request.queryKey)
            assert(request.username)
            assert(request.url)
            eventPairReceived = true
        })

        let seedChains = ['ethereum']
        await app.init(seedChains)

        //pair sdk
        let code = await app.createPairingCode()
        code = code.code
        log.info("code: ",code)
        assert(code)

        //
        let pairSuccess = await sendPairingCode(code)
        log.info("pairSuccess: ",pairSuccess)
        assert(pairSuccess)

        //dont release till pair event
        while(!eventPairReceived){
            await sleep(300)
        }
        //get user
        let userInfo = await app.getUserInfo()
        log.info(tag,"userInfo: ",userInfo)
        assert(userInfo)
        assert(userInfo.context)
        app.context = userInfo.context
        let context = userInfo.context

        //get context
        //TODO I want this set!
        // let context = await app.context
        // log.info(tag,"context: ",context)
        // assert(context)


        //get pubkeys for context

        //get info for context

        //assert sdk user
        //get user
        let user = await app.getUserParams()
        log.info("user: ",user)

        //intergration test asgard-exchange
        let blockchains = Object.keys(user.clients)
        log.info("blockchains: ",blockchains)

        let client = user.clients['ethereum']
        let balanceSdk = await client.getBalance()
        log.info(" balanceSdk: ",balanceSdk[0].amount.amount().toString())

        //get address from faucet
        //TODO get this from api
        let address = "0xc3affff54122658b89c31183cec4f15514f34624"

        //view invocation
        let invocationsRemote = await app.getInvocations()
        log.info(tag,"invocationsRemote: ",invocationsRemote)

        //if >


        //get estimate on invocation
        //send to faucet
        let sendPayload:any = {
            blockchain:BLOCKCHAIN,
            asset:'ETH',
            amount:TEST_AMOUNT,
            address,
        }
        sendPayload.noBroadcast = true

        //check invocation

        //if valid

        //invoke

        //get invocationId

        //validate invocation

        //build invocation

        //validate invocation

        //broadcast tranaction

        //validate invocation

        //get eta on confirmation

        //replace transaction



        //wait till confirmed
        // let confirmed = false
        // while(!confirmed){
        //
        //     //get transaction
        //
        //     //wait
        //     await sleep(1000)
        // }
        //TODO request return from faucet

        //expect event

        //process
        process.exit(0)
    } catch (e) {
        log.error(e)
        //process
        process.exit(666)
    }
}
test_service()
