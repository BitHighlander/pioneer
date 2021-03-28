/*
        Test Module

 */


require("dotenv").config({path:'./../../.env'})
require("dotenv").config({path:'../../../.env'})
require("dotenv").config({path:'../../../../.env'})

let App = require("../lib")
let Hardware = require("@pioneer-platform/pioneer-hardware")

//CLI tools
const prompt = require('prompt');
const Table = require('cli-table');
prompt.start();


let WALLET_PASSWORD = process.env['WALLET_PASSWORD']
if(!WALLET_PASSWORD) throw Error(".env not found!")

//force
//process.env['URL_PIONEER_SPEC'] = "https://pioneers.dev/spec/swagger.json"
process.env['URL_PIONEER_SPEC'] = "http://127.0.0.1:9001/spec/swagger.json"


let seed_1 = process.env['WALLET_MAINNET_DEV']
let password = process.env['WALLET_PASSWORD']
// let username = process.env['TEST_USERNAME_1']

let username = process.env['TEST_USERNAME_2']
let queryKey = process.env['TEST_QUERY_KEY_2']

//console.log("password: ",password)

let TEST_COINS = [
    'BTC',
    // 'BCH',
    // 'ETH',
    // 'ATOM'
]

let run_test = async function(){
    try{
        //get config
        let config = await App.getConfig()

        //start
        let KEEPKEY = await Hardware.start()
        let lockStatus = await Hardware.isLocked()
        console.log("lockStatus: ",lockStatus)

        //if no config
        if(!config){
            console.log("First time startup")

            if(lockStatus){
                Hardware.displayPin()
                prompt.get(['pin'], async function (err, result) {
                    if (err) { return onErr(err); }
                    console.log('Command-line input received:');
                    console.log('  pin: ' + result.pin);
                    KEEPKEY.sendPin(result.pin)
                });
            }

            let table = new Table({
                colWidths: [5, 5, 5]
            });

            table.push(["1", "2", "3"]);
            table.push(["4", "5", "6"]);
            table.push(["7", "8", "9"]);

            table = table.sort(function (a, b) {
                return b[2] - a[2];
            });
            console.log("\n \n PIN ENTRY \n \n " + table.toString() + "\n \n");

            let wallet = await App.getWallet()
            console.log("*** wallet: ",wallet)

            //blockchains
            let blockchains = [
                'bitcoin',
                'ethereum',
                'thorchain'
            ]

            if(!wallet){
                wallet = await Hardware.getPubkeys(blockchains,true)
            }

            console.log("walletFile: ",JSON.stringify(wallet))
            // console.log("pubkeys: ",JSON.stringify(walletFile.pubkeys))
            // console.log("wallet: ",wallet)

            console.log("features: ",KEEPKEY.features)

            //init
            wallet.hardware = true
            wallet.type = 'keepkey'
            wallet.features = KEEPKEY.features
            console.log("wallet: ",wallet)

            await App.initConfig("english");
            App.updateConfig({isTestnet:true});
            App.updateConfig({username});
            App.updateConfig({temp:password});
            App.updateConfig({created: new Date().getTime()});


            //keepkey
            console.log("**** wallet: ",wallet)
            console.log("**** wallet: ",JSON.stringify(wallet))

            //Mock
            // let wallet = {"pubkeys":[{"note":"Bitcoin account 1","coin":"BTC","long":"BTC","network":"BTC","type":"xpub","script_type":"p2pkh","pubkey":"xpub6C1VWE7DcZSfNMs26UdNnpgNVEbwpoHYoG5GMLa3XChJuPYcoBwUpoBpSU4Gtr7U2DxYt3h7bqSNW4nmSsFhL4n3BZQR4M5zHETHjYZgd6T","xpub":"xpub6C1VWE7DcZSfNMs26UdNnpgNVEbwpoHYoG5GMLa3XChJuPYcoBwUpoBpSU4Gtr7U2DxYt3h7bqSNW4nmSsFhL4n3BZQR4M5zHETHjYZgd6T"}],"wallet":{"WALLET_ID":"keepkey-pubkeys-7469D378DDEF22ACD30F7D0E","TYPE":"watch","CREATED":1616727481382,"VERSION":"0.1.3","WALLET_PUBLIC":{"BTC":{"note":"Bitcoin account 1","coin":"BTC","long":"BTC","network":"BTC","type":"xpub","script_type":"p2pkh","pubkey":"xpub6C1VWE7DcZSfNMs26UdNnpgNVEbwpoHYoG5GMLa3XChJuPYcoBwUpoBpSU4Gtr7U2DxYt3h7bqSNW4nmSsFhL4n3BZQR4M5zHETHjYZgd6T","xpub":"xpub6C1VWE7DcZSfNMs26UdNnpgNVEbwpoHYoG5GMLa3XChJuPYcoBwUpoBpSU4Gtr7U2DxYt3h7bqSNW4nmSsFhL4n3BZQR4M5zHETHjYZgd6T"}},"PATHS":[{"note":"Bitcoin account 1","coin":"Bitcoin","symbol":"BTC","network":"BTC","script_type":"p2pkh","available_scripts_types":["p2pkh"],"type":"xpub","addressNList":[2147483692,2147483648,2147483649],"curve":"secp256k1","showDisplay":true},{"note":" ETH primary (default)","symbol":"ETH","network":"ETH","script_type":"eth","available_scripts_types":["eth"],"type":"address","addressNList":[2147483692,2147483708,2147483648,0,0],"curve":"secp256k1","showDisplay":true,"coin":"Ethereum"},{"note":" Default RUNE path ","type":"address","addressNList":[2147483692,2147484579,2147483648,0,0],"curve":"secp256k1","script_type":"thorchain","showDisplay":true,"coin":"Thorchain","symbol":"RUNE","network":"RUNE"}]},"hardware":true,"type":"keepkey","features":{"vendor":"keepkey.com","majorVersion":6,"minorVersion":1,"patchVersion":0,"deviceId":"7469D378DDEF22ACD30F7D0E","pinProtection":true,"passphraseProtection":false,"language":"english","label":"gen1","coinsList":[],"initialized":true,"revision":"YTM1OWYxMWRhZDg2Zjk5NGIxYTI0NzYzYWZkMmMyZWM4ZDlkMGZlNQ==","bootloaderHash":"5F9Yf7B1M9gyVIQC0OcdjoI0iB2lTYbEtpnCimSCsO4=","imported":false,"pinCached":false,"passphraseCached":false,"policiesList":[{"policyName":"ShapeShift","enabled":true},{"policyName":"Pin Caching","enabled":true},{"policyName":"Experimental","enabled":false},{"policyName":"AdvancedMode","enabled":false}],"model":"K1-14AM","firmwareVariant":"KeepKey","firmwareHash":"Qkb/Dhtxoqaz6J4s/QiC3CB/lrJRZkDWxf/0BsAgl78=","noBackup":false}}
            //
            let success = await App.pairKeepkey(wallet)
            console.log("success: ",success)


        } else {
            //if force keepkey
            let isTestnet = true

            config.password = password
            config.username = username
            config.hardware = true
            let resultInit = await App.init(config,isTestnet)
            //console.log("resultInit: ",resultInit)

            //pair
            try{
                let pairResult = await App.pair("OR5AEK")
                console.log("pairResult: ",pairResult)
            }catch(e){

            }


            //get wallets
            let wallets = await App.getWallets()
            //console.log("wallets: ",wallets)

            let context = wallets[0]
            if(!context) throw Error("No Wallets on startup!")


            //
            let btcBalance = await context.getBalance("BTC")
            console.log("btcBalance: ",btcBalance)

            let btcMaster = await context.getMaster("BTC")
            console.log("btcMaster: ",btcMaster)

            /*
                ETH thorchain swap
             */
            let masterETH = await context.getMaster("ETH")
            console.log("reference: ","0x3f2329C9ADFbcCd9A84f52c906E936A42dA18CB8")
            console.log("masterETH: ",masterETH)

            let balanceETH = await context.getBalance("ETH")
            console.log("balanceETH: ",balanceETH)


            // let asset = {
            //     chain:"ETH",
            //     symbol:"ETH",
            //     ticker:"ETH",
            // }
            //
            // let swap = {
            //     asset,
            //     vaultAddress:"0xa13beb789f721253077faefd9bf604e1929e0e74",
            //     toAddress:"0x3e485e2c7df712ec170c087ecf5c15016a03f93f"
            // }
            //
            // let amount = 0.0001
            // swap.amount = amount

            // let swap = {
            //     inboundAddress: {
            //         chain: 'ETH',
            //         pub_key: 'tthorpub1addwnpepqvuy8vh6yj4h28xp6gfpjsztpj6p46y2rs0763t6uw9f6lkky0ly5uvwla6',
            //         address: '0x36286e570c412531aad366154eea9867b0e71755',
            //         router: '0x9d496De78837f5a2bA64Cb40E62c19FBcB67f55a',
            //         halted: false
            //     },
            //     asset: {
            //         chain: 'ETH',
            //         symbol: 'ETH',
            //         ticker: 'ETH',
            //         iconPath: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/ETH-1C9/logo.png'
            //     },
            //     memo: '=:THOR.RUNE:tthor1veu9u5h4mtdq34fjgu982s8pympp6w87ag58nh',
            //     amount: "0.0123"
            // }
            //
            //
            // let result = await context.buildSwap(swap)
            // console.log("swapResult: ",result)
            //
            // let resultBroadcast = await context.broadcastTransaction('ETH',result)
            // console.log("resultBroadcast: ",resultBroadcast)


        }


    }catch(e){
        console.error(e)
    }
}

run_test()
