/*

     Pioneer SDK
        A typescript sdk for integration for native wallets

 */

const TAG = " | Pioneer-sdk | "
const log = require("@pioneer-platform/loggerdog")()

//Pioneer follows OpenAPI spec
const Pioneer = require('openapi-client-axios').default;
// const Events = require("@pioneer-platform/pioneer-events")

let {
    supportedBlockchains,
    supportedAssets,
} = require('@pioneer-platform/pioneer-coins')

//xchain adapter
const XchainClass = require("@pioneer-platform/pioneer-xchain-client")

export interface SendToAddress {
    blockchain:string
    asset:string
    amount:number
    address:string
    memo?:string
    noBroadcast?:boolean
}

export interface config {
    spec:string,
    env:string,
    mode:string,
    username:string,
    addresses?:[]
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

export interface Invocation {
    coin: string;
    addressFrom?: string;
    addressTo: string;
    amount: string;
    memo: string;
    nonce?:number
}


export class SDK {
    private spec: any;
    private pioneerApi: any;
    private init: (blockchains: []) => Promise<any>;
    private config: config;
    private clients: any;
    private createPairingCode: () => Promise<any>;
    private queryKey: string;
    private service: string;
    private getInfo: () => Promise<any>;
    private isTestnet: boolean;
    private getUserParams: () => Promise<{ wallet: string; clients: { ethereum: any; thorchain: any; binance: any; bitcoin: any }; keystore: {}; type: string }>;
    private sendToAddress: (blockchain: string, asset: string, amount: string, memo?: string) => Promise<any>;
    private url: string;
    private events: {};
    private wss: string | undefined;
    private username: string | undefined;
    // private startSocket: () => Promise<any>;
    constructor(spec:string,config:any,isTestnet?:boolean) {
        this.service = config.service || 'unknown'
        this.url = config.url || 'unknown'
        if(isTestnet){
            this.isTestnet = true
        } else {
            this.isTestnet = false
        }
        this.config = config
        this.username = config.username
        this.spec = spec || config.spec
        this.wss = config.wss || 'wss://pioneers.dev'
        this.queryKey = config.queryKey
        this.spec = config.spec
        this.clients = {}
        this.events = {}
        this.init = async function (blockchains?:[]) {
            let tag = TAG + " | init_wallet | "
            try{
                log.info(tag,"blockchains: ",blockchains)
                if(!blockchains) blockchains = []
                if(!this.queryKey) throw Error(" You must create an api key! ")
                this.pioneerApi = new Pioneer({
                    definition:spec,
                    axiosConfigDefaults: {
                        headers: {
                            'Authorization': this.queryKey,
                        },
                    }
                });
                //init blockchains
                for(let i = 0; i < blockchains.length; i++){
                    let blockchain = blockchains[i]
                    if(supportedBlockchains.indexOf(blockchain) < 0){
                        supportedBlockchains.push(blockchain)
                    }
                }

                this.pioneerApi = await this.pioneerApi.init()
                return this.pioneerApi
            }catch(e){
                log.error(tag,e)
                throw e
            }
        }
        // this.startSocket = async function () {
        //     let tag = TAG + " | startSocket | "
        //     try {
        //         if(!this.username)throw Error("102: can not start socket without username!")
        //         let configEvents = {
        //             username:this.username,
        //             queryKey:this.queryKey,
        //             pioneerWs:this.wss
        //         }
        //         //sub to events
        //         this.events = await Events.init(configEvents)
        //         return this.events
        //     } catch (e) {
        //         log.error(tag, "e: ", e)
        //     }
        // }
        this.createPairingCode = async function () {
            let tag = TAG + " | createPairingCode | "
            try {
                //
                let pairingBody:any = {
                    service:this.service,
                    url:this.url
                }
                let result = await this.pioneerApi.CreatePairingCode(null, pairingBody)
                return result.data
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
        this.getInfo = async function () {
            let tag = TAG + " | getInfo | "
            try {
                let result = await this.pioneerApi.Info()

                return result.data
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
        // @ts-ignore
        this.sendToAddress = async function (intent:SendToAddress) {
            let tag = TAG + " | getInfo | "
            try {

                //build a tx
                let txInput:any = {
                    "asset":
                        {
                            "chain":intent.blockchain,
                            "symbol":intent.asset,
                            "ticker":intent.asset
                        },
                    "amount":
                        {
                            "type":"BASE",
                            "decimal":18,
                            amount: function(){
                                return intent.amount
                            }
                        },
                    "recipient":intent.address,
                }
                if(intent.memo) txInput.memo = intent.memo

                //ETH
                if(this.isTestnet && intent.blockchain === 'ETH'){
                    txInput.chainId = 3 //ropsten
                }

                if(intent.noBroadcast){
                    txInput.noBroadcast = true
                }

                let txid = await this.clients[intent.blockchain].transfer(txInput)

                log.info("txid",txid)

                return txid
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
        //X-chain
        this.getUserParams = async function () {
            let tag = TAG + " | getUserParams | "
            try {
                let result = await this.pioneerApi.Info()
                result = result.data

                if(!result.masters.RUNE) throw Error("102: RUNE required asset! ")
                let thorAddress = result.masters.RUNE

                log.info(tag,"this.spec: ",this.spec)
                log.info(tag,"supportedBlockchains: ",supportedBlockchains)
                if(!this.spec) throw Error("103: Pioneer Service required for sdk! ")


                if(supportedBlockchains.indexOf('Binance') >= 0){
                    let binance = new XchainClass(this.spec,{
                        network:'testnet',
                        blockchain:'binance',
                        nativeAsset:'BNB',
                        queryKey:this.queryKey
                    })
                    await binance.init()
                    this.clients['binance'] = binance
                }

                if(supportedBlockchains.indexOf('Bitcoin') >= 0){
                    let bitcoin = new XchainClass(this.spec,{
                        network:'testnet',
                        blockchain:'bitcoin',
                        nativeAsset:'BTC',
                        queryKey:this.queryKey
                    })
                    await bitcoin.init()
                    this.clients['bitcoin'] = bitcoin
                }

                if(supportedBlockchains.indexOf('Thorchain') >= 0){
                    let thorchain = new XchainClass(this.spec,{
                        network:'testnet',
                        blockchain:'thorchain',
                        nativeAsset:'RUNE',
                        queryKey:this.queryKey
                    })
                    await thorchain.init()
                    this.clients['thorchain'] = thorchain
                }

                if(supportedBlockchains.indexOf('Ethereum') >= 0){
                    let ethereum = new XchainClass(this.spec,{
                        network:'testnet',
                        blockchain:'ethereum',
                        nativeAsset:'ETH',
                        queryKey:this.queryKey
                    })
                    await ethereum.init()
                    this.clients['ethereum'] = ethereum
                }

                //TODO
                // if(supportedBlockchains.indexOf('bitcoinCash') >= 0){
                // }





                let output:any = {
                    type: 'pioneer',
                    wallet: thorAddress,
                    keystore:{},
                    clients:this.clients
                }

                return output
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
    }
}

