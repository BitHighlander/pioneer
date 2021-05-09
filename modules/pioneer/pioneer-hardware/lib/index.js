"use strict";
/*
      Keepkey Hardware Module
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var TAG = " | pioneer-hardware | ";
var request = require('request');
var hdwallet_core_1 = require("@shapeshiftoss/hdwallet-core");
var NodeWebUSBKeepKeyAdapter = require('@shapeshiftoss/hdwallet-keepkey-nodewebusb').NodeWebUSBKeepKeyAdapter;
// const { WebUSBKeepKeyAdapter } = require('@shapeshiftoss/hdwallet-keepkey-webusb')
// import { TCPKeepKeyAdapter } from "@shapeshiftoss/hdwallet-keepkey-tcp";
// import { create as createHIDKeepKey } from "@bithighlander/hdwallet-keepkey";
var log = require("@pioneer-platform/loggerdog")();
var EventEmitter = require('events');
var emitter = new EventEmitter();
var wait = require('wait-promise');
var sleep = wait.sleep;
// const usbDetect = require('@bithighlander/usb-detection');
// const usbDetect = require('usb-detection');
//usb
var usb = require('usb');
var _a = require('@pioneer-platform/pioneer-coins'), getPaths = _a.getPaths, normalize_pubkeys = _a.normalize_pubkeys, getNativeAssetForBlockchain = _a.getNativeAssetForBlockchain;
// import * as util from "./hardware"
//keepkey
var keyring = new hdwallet_core_1.Keyring;
//let webUsbAdapter: { clearDevices: () => void; pairDevice: () => any; }, hidAdapter
//
var FIRMWARE_BASE_URL = "https://static.shapeshift.com/firmware/";
//globals
var KEEPKEY_WALLET = {};
var autoButton = true;
var IS_CONNECTED = false;
//TODO for the love of god dont do this
//coins? from device? anything
var KEEPKEY_SUPPORT = [
    'BTC',
    'LTC',
    'BCH',
    'DOGE',
    'RUNE',
    'ETH'
];
/*
    Keepkey States
    0 unknown

    1 No devices connected
    2 Already claimed
    3 locked
    4 unlocked
 */
var KEEPKEY_STATE = {
    state: 0,
    msg: "unknown"
};
module.exports = {
    allDevices: function () {
        return get_all_usb_devices();
    },
    listKeepKeys: function () {
        return get_keepKey_usb_devices();
    },
    start: function () {
        return start_hardware();
    },
    state: function () {
        return KEEPKEY_STATE;
    },
    info: function () {
        return hardware_info();
    },
    getPubkeys: function (blockchains, isTestnet) {
        return get_pubkeys(blockchains, isTestnet);
    },
    isLocked: function () {
        return get_lock_status();
    },
    //This ugly because HOW i request keepkey to display pin
    //FIXME plz
    unlock: function (blockchains) {
        return get_pubkeys(blockchains);
    },
    displayPin: function (blockchains) {
        return display_pin(blockchains);
    },
    enterPin: function (pin) {
        return enter_keepkey_pin(pin);
    },
    wipe: function () {
        return KEEPKEY_WALLET.wipe();
    },
    load: function (mnemonic) {
        //TODO validate mnemonic
        return KEEPKEY_WALLET.loadDevice({ mnemonic: mnemonic });
    },
};
var get_keepKey_usb_devices = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, devices, i, device, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = " | get_keepKey_usb_devices | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    output = [];
                    return [4 /*yield*/, usb.getDeviceList()];
                case 2:
                    devices = _a.sent();
                    log.debug(tag, "devices: ", devices);
                    for (i = 0; i < devices.length; i++) {
                        device = devices[i];
                        log.debug(tag, "device: ", device);
                        if (device.deviceName === 'KeepKey') {
                            output.push(device);
                        }
                        //TODO device id's?
                        //TODO validation authentic?
                        //TODO list emulators?
                    }
                    return [2 /*return*/, output];
                case 3:
                    e_1 = _a.sent();
                    log.error(e_1);
                    throw e_1;
                case 4: return [2 /*return*/];
            }
        });
    });
};
var get_all_usb_devices = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, devices, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = " | get_all_usb_devices | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, usb.getDeviceList()];
                case 2:
                    devices = _a.sent();
                    log.debug(tag, "devices: ", devices);
                    return [2 /*return*/, devices];
                case 3:
                    e_2 = _a.sent();
                    log.error(e_2);
                    throw e_2;
                case 4: return [2 /*return*/];
            }
        });
    });
};
var hardware_info = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, assetsSupported;
        return __generator(this, function (_a) {
            tag = " | hardware_info | ";
            try {
                output = {};
                if (KEEPKEY_STATE.state > 2) {
                    output = KEEPKEY_STATE;
                }
                else {
                    assetsSupported = [];
                    log.debug(tag, "KEEPKEY_WALLET: ", KEEPKEY_WALLET);
                    //asset support
                    if (KEEPKEY_WALLET._supportsETH)
                        assetsSupported.push('ETH');
                    if (KEEPKEY_WALLET._supportsBTC)
                        assetsSupported.push('BTC');
                    if (KEEPKEY_WALLET._supportsCosmos)
                        assetsSupported.push('ATOM');
                    if (KEEPKEY_WALLET._supportsRipple)
                        assetsSupported.push('XRP');
                    if (KEEPKEY_WALLET._supportsBinance)
                        assetsSupported.push('BNB');
                    if (KEEPKEY_WALLET._supportsEos)
                        assetsSupported.push('EOS');
                    if (KEEPKEY_WALLET._supportsFio)
                        assetsSupported.push('FIO');
                    output.assets = assetsSupported;
                    //device
                    //TODO convert to json
                    //output.keepkey = KEEPKEY_WALLET.transport.usbDevice
                    //features
                    output.features = KEEPKEY_WALLET.features;
                }
                return [2 /*return*/, output];
            }
            catch (e) {
                log.error(e);
                throw e;
            }
            return [2 /*return*/];
        });
    });
};
var get_lock_status = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = " | get_lock_status | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    output = {
                        connected: false,
                        locked: false
                    };
                    if (!(KEEPKEY_STATE.state > 2)) return [3 /*break*/, 3];
                    return [4 /*yield*/, KEEPKEY_WALLET.isLocked()];
                case 2:
                    output = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    true;
                    _a.label = 4;
                case 4: return [2 /*return*/, output];
                case 5:
                    e_3 = _a.sent();
                    log.error(e_3);
                    throw e_3;
                case 6: return [2 /*return*/];
            }
        });
    });
};
var display_pin = function (blockchains) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = " | display_pin | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    output = {};
                    log.debug("KEEPKEY_WALLET: ", KEEPKEY_WALLET);
                    //TODO HACK, better way to display then request pubkey?
                    return [4 /*yield*/, get_pubkeys(blockchains)
                        // let paths = getPaths()
                        // paths = [paths[0]]
                        // const result = await KEEPKEY_WALLET.getPublicKeys(paths)
                    ];
                case 2:
                    //TODO HACK, better way to display then request pubkey?
                    _a.sent();
                    return [4 /*yield*/, KEEPKEY_WALLET.ping("hello")];
                case 3:
                    // let paths = getPaths()
                    // paths = [paths[0]]
                    // const result = await KEEPKEY_WALLET.getPublicKeys(paths)
                    output = _a.sent();
                    return [2 /*return*/, output];
                case 4:
                    e_4 = _a.sent();
                    log.error(e_4);
                    throw e_4;
                case 5: return [2 /*return*/];
            }
        });
    });
};
// async function getEmulator(keyring: Keyring) {
//     try {
//         const tcpAdapter = TCPKeepKeyAdapter.useKeyring(keyring);
//         let wallet = await tcpAdapter.pairDevice("http://localhost:5000");
//         if (wallet) console.log("Using KeepKey Emulator for tests");
//         return wallet;
//     } catch (e) {}
//     return undefined;
// }
var enter_keepkey_pin = function (pin) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output;
        return __generator(this, function (_a) {
            tag = " | enter_keepkey_pin | ";
            try {
                output = {};
                KEEPKEY_WALLET.sendPin(pin);
                return [2 /*return*/, output];
            }
            catch (e) {
                log.error(e);
                throw e;
            }
            return [2 /*return*/];
        });
    });
};
var get_pubkeys = function (blockchains, isTestnet) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, paths, _loop_1, i, pathsKeepkey, i, path, pathForKeepkey, result, pubkeys, keyedWallet, i, pubkey, _loop_2, i, features, walletId, watchWallet, e_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = " | get_pubkeys | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    if (!blockchains)
                        throw Error("Blockchains specify required!");
                    output = {};
                    log.debug(tag, "blockchains: ", blockchains);
                    paths = getPaths(blockchains);
                    log.debug(tag, "getPaths: ", paths);
                    _loop_1 = function (i) {
                        var blockchain = blockchains[i];
                        var symbol = getNativeAssetForBlockchain(blockchain);
                        log.debug(tag, "symbol: ", symbol);
                        //find in pubkeys
                        var isFound = paths.find(function (path) {
                            return path.blockchain === blockchain;
                        });
                        if (!isFound) {
                            throw Error("Failed to find path for blockchain: " + blockchain);
                        }
                    };
                    //verify paths
                    for (i = 0; i < blockchains.length; i++) {
                        _loop_1(i);
                    }
                    pathsKeepkey = [];
                    for (i = 0; i < paths.length; i++) {
                        path = paths[i];
                        pathForKeepkey = {};
                        //send coin as bitcoin
                        pathForKeepkey.symbol = path.symbol;
                        pathForKeepkey.addressNList = path.addressNList;
                        //why
                        pathForKeepkey.coin = 'Bitcoin';
                        pathForKeepkey.script_type = 'p2pkh';
                        //showDisplay
                        pathForKeepkey.showDisplay = false;
                        pathsKeepkey.push(pathForKeepkey);
                    }
                    log.debug("***** paths IN: ", pathsKeepkey.length);
                    return [4 /*yield*/, KEEPKEY_WALLET.getPublicKeys(pathsKeepkey)];
                case 2:
                    result = _a.sent();
                    log.debug("***** pubkeys OUT: ", result.length);
                    if (pathsKeepkey.length !== result.length) {
                        log.error(tag, { pathsKeepkey: pathsKeepkey });
                        log.error(tag, { result: result });
                        throw Error("Device unable to get path!");
                    }
                    log.debug("rawResult: ", result);
                    log.debug("rawResult: ", JSON.stringify(result));
                    //rebuild
                    log.debug(tag, "isTestnet: ", isTestnet);
                    return [4 /*yield*/, normalize_pubkeys('keepkey', result, paths)];
                case 3:
                    pubkeys = _a.sent();
                    output.pubkeys = pubkeys;
                    if (pubkeys.length !== result.length) {
                        log.error(tag, { pathsKeepkey: pathsKeepkey });
                        log.error(tag, { result: result });
                        throw Error("Failed to Normalize pubkeys!");
                    }
                    log.debug(tag, "pubkeys: (normalized) ", pubkeys.length);
                    log.debug(tag, "pubkeys: (normalized) ", pubkeys);
                    keyedWallet = {};
                    for (i = 0; i < pubkeys.length; i++) {
                        pubkey = pubkeys[i];
                        if (!keyedWallet[pubkey.symbol]) {
                            keyedWallet[pubkey.symbol] = pubkey;
                        }
                        else {
                            if (!keyedWallet['available'])
                                keyedWallet['available'] = [];
                            //add to secondary pubkeys
                            keyedWallet['available'].push(pubkey);
                        }
                    }
                    _loop_2 = function (i) {
                        var blockchain = blockchains[i];
                        var symbol = getNativeAssetForBlockchain(blockchain);
                        log.debug(tag, "symbol: ", symbol);
                        //find in pubkeys
                        var isFound = pubkeys.find(function (path) {
                            return path.blockchain === blockchain;
                        });
                        if (!isFound) {
                            throw Error("Failed to find pubkey for blockchain: " + blockchain);
                        }
                    };
                    //verify pubkeys
                    for (i = 0; i < blockchains.length; i++) {
                        _loop_2(i);
                    }
                    return [4 /*yield*/, KEEPKEY_WALLET.features];
                case 4:
                    features = _a.sent();
                    log.debug(tag, "vender: ", features);
                    log.debug(tag, "vender: ", features.deviceId);
                    walletId = "keepkey-pubkeys-" + features.deviceId;
                    watchWallet = {
                        "WALLET_ID": walletId,
                        "TYPE": "watch",
                        "CREATED": new Date().getTime(),
                        "VERSION": "0.1.3",
                        "BLOCKCHAINS: ": blockchains,
                        "PUBKEYS": pubkeys,
                        "WALLET_PUBLIC": keyedWallet,
                        "PATHS": paths
                    };
                    log.debug(tag, "writePathPub: ", watchWallet);
                    output.wallet = watchWallet;
                    return [2 /*return*/, output];
                case 5:
                    e_5 = _a.sent();
                    log.error(e_5);
                    throw e_5;
                case 6: return [2 /*return*/];
            }
        });
    });
};
var get_keepkey_info = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, output, vender, e_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = " | get_keepkey_info | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    log.debug(tag, "checkpoint");
                    output = {};
                    return [4 /*yield*/, KEEPKEY_WALLET.getVendor()];
                case 2:
                    vender = _a.sent();
                    output.vender = vender;
                    log.debug(tag, "vender: ", vender);
                    return [2 /*return*/, output];
                case 3:
                    e_6 = _a.sent();
                    log.error(e_6);
                    throw e_6;
                case 4: return [2 /*return*/];
            }
        });
    });
};
var start_hardware = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, walletFound, startReponse, lockStatus, e_7;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = " | start_hardware | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    walletFound = false;
                    return [4 /*yield*/, getDevice(keyring)];
                case 2:
                    startReponse = _a.sent();
                    log.debug(tag, "startReponse: ", startReponse);
                    if (!startReponse.error) return [3 /*break*/, 3];
                    switch (startReponse.errorCode) {
                        case 1:
                            KEEPKEY_STATE = {
                                state: 1,
                                msg: "no devices detected!"
                            };
                            break;
                        case -1:
                            KEEPKEY_STATE = {
                                state: -1,
                                msg: "unable to claim!"
                            };
                            break;
                        default:
                            console.error(tag, startReponse);
                            throw Error("Unknown Error!");
                    }
                    return [3 /*break*/, 6];
                case 3:
                    if (!startReponse) return [3 /*break*/, 6];
                    return [4 /*yield*/, createWallet()];
                case 4:
                    KEEPKEY_WALLET = _a.sent();
                    log.debug(tag, "KEEPKEY_WALLET: ", KEEPKEY_WALLET);
                    return [4 /*yield*/, KEEPKEY_WALLET.isLocked()];
                case 5:
                    lockStatus = _a.sent();
                    if (lockStatus) {
                        KEEPKEY_STATE = {
                            state: 3,
                            msg: "device locked!"
                        };
                    }
                    else {
                        KEEPKEY_STATE = {
                            state: 4,
                            msg: "unlocked"
                        };
                    }
                    _a.label = 6;
                case 6:
                    if (!walletFound) return [3 /*break*/, 8];
                    log.debug(tag, "wallet found on startup!");
                    return [4 /*yield*/, createWallet()];
                case 7:
                    KEEPKEY_WALLET = _a.sent();
                    log.debug(tag, "KEEPKEY_WALLET: ", KEEPKEY_WALLET);
                    _a.label = 8;
                case 8:
                    usb.on('attach', function (device) {
                        console.log("attach device: ", device);
                    });
                    usb.on('detach', function (device) {
                        console.log("detach device: ", device);
                    });
                    // usbDetect.on('add:11044:1', async function(device:any) {
                    //     emitter.emit('event',{event:"connect",msg:"add Keepkey!",code:'add:11044:1'})
                    //     log.debug(tag,"add:11044:1 device: ",device)
                    //
                    //     // TODO BUG no devices found!?
                    //     // KEEPKEY_WALLET = await createWallet()
                    //
                    // });
                    //
                    // usbDetect.on('remove:11044:1', function(device:any) {
                    //     emitter.emit('event',{event:"disconnect",msg:"removeing Keepkey!",code:'remove:11044:1'})
                    //     keyring.removeAll()
                    //     log.debug("shutting down connection")
                    //     process.exit(1)
                    // });
                    //
                    // usbDetect.on('add:11044:2', async function(device:any) {
                    //     log.debug("Connecting to Keepkey!")
                    //     emitter.emit('event',{event:"connect",msg:"Connecting to Keepkey!",code:'add:11044:2'})
                    //     await sleep(300)
                    //     KEEPKEY_WALLET =  await createWallet()
                    //     log.debug(tag,"KEEPKEY_WALLET: ",KEEPKEY_WALLET)
                    //
                    //     //get lock status
                    //     if(KEEPKEY_WALLET){
                    //         let lockStatus = await KEEPKEY_WALLET.isLocked()
                    //         if(lockStatus){
                    //             KEEPKEY_STATE = {
                    //                 state:3,
                    //                 msg:"device locked!"
                    //             }
                    //         } else {
                    //             KEEPKEY_STATE = {
                    //                 state:4,
                    //                 msg:"unlocked"
                    //             }
                    //         }
                    //     }
                    // });
                    //
                    // usbDetect.on('remove:11044:2', async function(device:any) {
                    //     log.debug("Keepkey Disconnected!")
                    //     emitter.emit('event',{event:"disconnect",msg:"Keepkey Disconnected!"})
                    //     KEEPKEY_STATE = {
                    //         state:0,
                    //         msg:"unable to claim device!"
                    //     }
                    //     //disconnect
                    //     // const wallet:any = Object.values(keyring.wallets)[0]
                    //     // if (!!wallet) { // @ts-ignore
                    //     //     wallet.transport.disconnect()
                    //     // }
                    //     await keyring.removeAll()
                    //     //webUsbAdapter.clearDevices()
                    // });
                    //get current state
                    //currently connected
                    //is usb available?
                    //
                    KEEPKEY_WALLET.events = emitter;
                    return [2 /*return*/, KEEPKEY_WALLET];
                case 9:
                    e_7 = _a.sent();
                    //if claim interface
                    log.error(tag, "e: ", e_7);
                    log.error(tag, "message: ", e_7.message);
                    if (e_7.message.indexOf("claimInterface")) {
                        //
                        return [2 /*return*/, KEEPKEY_WALLET];
                    }
                    else {
                        //unhandled
                        log.error(tag, "Error: ", e_7);
                        throw e_7;
                    }
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
};
var getLatestFirmwareData = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                request(FIRMWARE_BASE_URL + "releases.json", function (err, response, body) {
                    if (err)
                        return reject(err);
                    resolve(JSON.parse(body).latest);
                });
            })];
    });
}); };
// @ts-ignore
// let createWebUsbWallet = async function (attempts:any = 0) {
//     let tag = " | createWebUsbWallet | ";
//     try {
//
//         webUsbAdapter = await NodeWebUSBKeepKeyAdapter.useKeyring(keyring)
//         KEEPKEY_WALLET = await webUsbAdapter.pairDevice()
//
//         log.debug("wallet: ",KEEPKEY_WALLET)
//
//     } catch (error) {
//         if (attempts < 10) {
//             await sleep(500)
//             return await createWebUsbWallet(attempts + 1)
//         }
//         console.log('error creating WebUSB wallet: ', error)
//         return null
//     }
// };
// let getDevice = async function(keyring: Keyring) {
//     let tag = TAG + " | getDevice | "
//     try {
//         const keepkeyAdapter = WebUSBKeepKeyAdapter.useKeyring(keyring);
//         let wallet = await keepkeyAdapter.pairDevice(undefined, true);
//         if (wallet) {
//             log.debug(tag,"Device found!")
//             log.debug(tag,"wallet: ",wallet)
//         }
//         return wallet;
//     } catch (e) {
//         log.error(tag,"e: ",e)
//         throw Error(e)
//     }
// }
var getDevice = function (keyring) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, keepkeyAdapter, wallet, e_8;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = TAG + " | getDevice | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    keepkeyAdapter = NodeWebUSBKeepKeyAdapter.useKeyring(keyring);
                    return [4 /*yield*/, keepkeyAdapter.pairDevice(undefined, true)];
                case 2:
                    wallet = _a.sent();
                    if (wallet) {
                        log.debug(tag, "Device found!");
                        log.debug(tag, "wallet: ", wallet);
                    }
                    return [2 /*return*/, wallet];
                case 3:
                    e_8 = _a.sent();
                    //log.error(tag,"*** e: ",e.toString())
                    log.info("failed to get device: ", e_8.message);
                    if (e_8.message.indexOf("no devices found") >= 0) {
                        return [2 /*return*/, {
                                error: true,
                                errorCode: 1,
                                errorMessage: "No devices"
                            }];
                    }
                    else if (e_8.message.indexOf("claimInterface") >= 0) {
                        return [2 /*return*/, {
                                error: true,
                                errorCode: -1,
                                errorMessage: "Unable to claim!"
                            }];
                    }
                    else {
                        return [2 /*return*/, {
                                error: true,
                                errorMessage: e_8
                            }];
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
};
// async function createWallet(): Promise<HDWallet> {
//     const keyring = new Keyring();
//
//     let wallet = (await getDevice(keyring));
//
//     if (!wallet) throw new Error("No KeepKey found");
//
//     wallet.transport.on(Events.BUTTON_REQUEST, async () => {
//         // if (autoButton && supportsDebugLink(wallet)) {
//         //     await wallet.pressYes();
//         // }
//         emitter.emit('event',{event:"buttonRequest",msg:"Accept event on KeepKey to continue!"})
//     });
//
//     wallet.transport.onAny((event: string[], ...values: any[]) => {
//         console.info(event, ...values)
//         emitter.emit('event',{event:"hardwareEvent",msg:"hardware event occurred!",values})
//     });
//
//     return wallet;
// }
//fuck polling
var createWallet = function () {
    return __awaiter(this, void 0, void 0, function () {
        var tag, keyring_1, wallet, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = " | createWallet | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    keyring_1 = new hdwallet_core_1.Keyring();
                    return [4 /*yield*/, getDevice(keyring_1)];
                case 2:
                    wallet = _a.sent();
                    if (!wallet.error) {
                        wallet.transport.on(hdwallet_core_1.Events.BUTTON_REQUEST, function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                // if (autoButton && supportsDebugLink(wallet)) {
                                //     await wallet.pressYes();
                                // }
                                emitter.emit('event', { event: "buttonRequest", msg: "Accept event on KeepKey to continue!" });
                                return [2 /*return*/];
                            });
                        }); });
                        wallet.transport.onAny(function (event) {
                            var values = [];
                            for (var _i = 1; _i < arguments.length; _i++) {
                                values[_i - 1] = arguments[_i];
                            }
                            console.info.apply(console, __spreadArrays([event], values));
                            emitter.emit('event', { event: "hardwareEvent", msg: "hardware event occurred!", values: values });
                        });
                        return [2 /*return*/, wallet];
                    }
                    else {
                        log.info(tag, " Device not able to claim yet");
                        return [2 /*return*/, null];
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    log.error(tag, "failed to createWallet!");
                    throw Error(error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
};
// let createWallet = async function (attempts:any = 0) {
//     let tag = " | createWallet | ";
//     try {
//
//         const keyring = new Keyring();
//
//
//         let wallet
//         //wait for connect
//         let isConnected = false
//         while(!isConnected){
//             try{
//                 wallet = await getDevice(keyring);
//                 isConnected = true
//             }catch(e){
//                 log.debug("No devices connected!")
//             }
//             await sleep(300)
//         }
//
//         if (wallet) {
//
//             wallet.transport.on(Events.BUTTON_REQUEST, async () => {
//                 // if (autoButton && supportsDebugLink(wallet)) {
//                 //     await wallet.pressYes();
//                 // }
//                 emitter.emit('event',{event:"buttonRequest",msg:"Accept event on KeepKey to continue!"})
//             });
//
//             wallet.transport.onAny((event: string[], ...values: any[]) => {
//                 console.info(event, ...values)
//                 emitter.emit('event',{event:"hardwareEvent",msg:"hardware event occurred!",values})
//             });
//
//             return wallet;
//         } else {
//             //no wallet connected yet!
//             return null
//         }
//     } catch (error) {
//         log.error(tag,"failed to createWallet!")
//         throw Error(error)
//     }
// };
// @ts-ignore
// let createHidWallet = async function (attempts:any = 0) {
//     let tag = " | createHidWallet | ";
//     try {
//
//
//     } catch (error) {
//         if (attempts < 10) {
//             await sleep(500)
//             return await createHidWallet(attempts + 1)
//         }
//         console.log('error creating HID wallet: ', error)
//         return null
//     }
// };
// @ts-ignore
var uploadToDevice = function (binary) {
    return __awaiter(this, void 0, void 0, function () {
        var tag, wallet, uploadResult, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tag = " | createHidWallet | ";
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    wallet = Object.values(keyring.wallets)[0];
                    if (!wallet)
                        return [2 /*return*/, null
                            // @ts-ignore
                        ];
                    // @ts-ignore
                    return [4 /*yield*/, wallet.firmwareErase()
                        // @ts-ignore
                    ];
                case 2:
                    // @ts-ignore
                    _a.sent();
                    return [4 /*yield*/, wallet.firmwareUpload(binary)];
                case 3:
                    uploadResult = _a.sent();
                    return [2 /*return*/, uploadResult];
                case 4:
                    error_2 = _a.sent();
                    log.error('error uploading to device: ', error_2);
                    return [2 /*return*/, false];
                case 5: return [2 /*return*/];
            }
        });
    });
};
