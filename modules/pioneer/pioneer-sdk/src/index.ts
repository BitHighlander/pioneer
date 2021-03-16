/*

     Pioneer SDK
        A typescript sdk for integration for native wallets

 */

const TAG = " | Pioneer-sdk | "
const log = require("@pioneer-platform/loggerdog")()

//Pioneer follows OpenAPI spec
const Pioneer = require('openapi-client-axios').default;

let {
    supportedBlockchains,
    supportedAssets,
} = require('@pioneer-platform/pioneer-coins')

//xchain adapter
const XchainClass = require("@pioneer-platform/pioneer-xchain-client")

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

export class SDK {
    private spec: any;
    private pioneerApi: any;
    private init: (blockchains: []) => Promise<any>;
    private config: config;
    private createPairingCode: () => Promise<any>;
    private queryKey: string;
    private service: string;
    private getInfo: () => Promise<any>;
    private isTestnet: boolean;
    private getUserParams: () => Promise<{ wallet: string; clients: { ethereum: any; thorchain: any; binance: any; bitcoin: any }; keystore: {}; type: string }>;
    constructor(spec:string,config:any,isTestnet?:boolean) {
        this.service = config.service || 'unknown'
        if(isTestnet){
            this.isTestnet = true
        } else {
            this.isTestnet = false
        }
        this.config = config
        this.spec = spec || config.spec
        this.queryKey = config.queryKey
        this.spec = config.spec
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
        this.createPairingCode = async function () {
            let tag = TAG + " | createPairingCode | "
            try {
                //
                let pairingBody:any = {
                    service:this.service
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

                let clients:any = {}

                if(supportedBlockchains.indexOf('Binance') >= 0){
                    let binance = new XchainClass(this.spec,{
                        network:'testnet',
                        blockchain:'binance',
                        nativeAsset:'BNB',
                        queryKey:this.queryKey
                    })
                    await binance.init()
                    clients['binance'] = binance
                }

                if(supportedBlockchains.indexOf('Bitcoin') >= 0){
                    let bitcoin = new XchainClass(this.spec,{
                        network:'testnet',
                        blockchain:'bitcoin',
                        nativeAsset:'BTC',
                        queryKey:this.queryKey
                    })
                    await bitcoin.init()
                    clients['bitcoin'] = bitcoin
                }

                if(supportedBlockchains.indexOf('Thorchain') >= 0){
                    let thorchain = new XchainClass(this.spec,{
                        network:'testnet',
                        blockchain:'thorchain',
                        nativeAsset:'RUNE',
                        queryKey:this.queryKey
                    })
                    await thorchain.init()
                    clients['thorchain'] = thorchain
                }

                if(supportedBlockchains.indexOf('Ethereum') >= 0){
                    let ethereum = new XchainClass(this.spec,{
                        network:'testnet',
                        blockchain:'ethereum',
                        nativeAsset:'ETH',
                        queryKey:this.queryKey
                    })
                    await ethereum.init()
                    clients['ethereum'] = ethereum
                }

                //TODO
                // if(supportedBlockchains.indexOf('bitcoinCash') >= 0){
                // }





                let output:any = {
                    type: 'pioneer',
                    wallet: thorAddress,
                    keystore:{},
                    clients
                }

                return output
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
    }
}

