const TAG = " | ws-client | ";
const log = require("@pioneer-platform/loggerdog")()
const EventEmitter = require('events');
const io = require('socket.io-client');
const wait = require('wait-promise');
const sleep = wait.sleep;

export class Events {
    private wss: string;
    private username: string
    private queryKey: string
    private socket: any
    private events: any
    private isConnected: boolean
    private isTestnet: boolean
    private isPaired: boolean
    private init: () => Promise<boolean>;
    private emitter: any;
    private setUsername: (username:string) => Promise<void>;
    private pair: (username?: string) => Promise<boolean>;
    private disconnect: () => Promise<void>;
    private subscribeToKey: () => Promise<boolean>;
    constructor(wss:string,config:any,isTestnet?:boolean) {
        this.wss = config.wss || 'wss://pioneers.dev'
        this.isConnected = false
        this.isTestnet = false
        this.username = config.username
        this.queryKey = config.queryKey
        this.isPaired = false
        this.events = new EventEmitter();
        this.init = async function () {
            let tag = TAG + " | init_events | "
            try {
                this.socket = io.connect(this.wss, {
                    reconnect: true,
                    rejectUnauthorized: false
                });

                //sub
                this.socket.on('connect', () => {
                    log.info(tag,'Connected to '+this.wss);
                    this.isConnected = true
                });

                this.socket.on('subscribedToUsername', () => {
                    log.info(tag,'subscribed to '+this.username);
                    this.isPaired = true
                });

                this.socket.on('message', (message: any) => {
                    //TODO only emit expected messages?
                    //if(message.type === "payment_request"){}
                    this.events.emit('message',message)
                })

                //sub to errors
                this.socket.on('errorMessage', function (message:any) {
                    log.error(tag,"error: ",message)
                    if(message.code && message.code === 6) throw Error(" Failed to connect!")
                });

                this.socket.on('invocation', (message: any) => {
                    log.info('invocation: ',message);
                    this.events.emit('message',message)
                });

                //dont release to connect
                while(!this.isConnected){
                    await sleep(300)
                }

                return true
            } catch (e) {
                log.error(tag, e)
                throw e
            }
        }
        this.setUsername = async function (username) {
            let tag = TAG + " | startSocket | "
            try {
                this.username = username
            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
        this.subscribeToKey = async function () {
            let tag = TAG + " | subscribeToKey | "
            try {

                //attempt join
                this.socket.emit('join',{
                    queryKey:config.queryKey
                })

                return true
            } catch (e) {
                log.error(tag, "e: ", e)
                throw e
            }
        }
        this.pair = async function (username?:string) {
            let tag = TAG + " | startSocket | "
            try {
                if(username) this.username = username
                if(!this.username) throw Error("103: can not pair without username!")

                //attempt join
                this.socket.emit('join',{
                    username:this.username,
                    queryKey:config.queryKey
                })

                //paired message?

                //release on successful pair
                // while(!this.isPaired){
                //     await sleep(300)
                // }

                return true
            } catch (e) {
                log.error(tag, "e: ", e)
                throw e
            }
        }
        this.disconnect = async function () {
            let tag = TAG + " | disconnect | "
            try {

            } catch (e) {
                log.error(tag, "e: ", e)
            }
        }
    }
}
