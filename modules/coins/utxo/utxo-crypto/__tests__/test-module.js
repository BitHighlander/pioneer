/*
    Thorchain
 */

require("dotenv").config({path:'../../../.env'})
require("dotenv").config({path:'../../../../.env'})
require("dotenv").config({path:'../../../../../.env'})
let crypto = require("../lib/index")


// let seed = crypto.generateSeed()
// console.log("seed: ",seed)

let test_seed = "alcohol woman abuse must during monitor noble actual mixed trade anger aisle"
//
//let test_seed = process.env['WALLET_TESTNET_DEV']
// let test_seed = process.env['WALLET_MAINNET_DEV_OLD']
console.log("test_seed: ",test_seed)

let isTestnet = null

// crypto.generateWalletFromSeed(test_seed,isTestnet)
//     .then(function(resp){
//         //console.log("resp: ",resp)
//         console.log("resp    : ",resp.coins.BTC.master)
//         //console.log("expected: ","bc1q85quh55075pr02jyxk9t8qy5essqetwsg7gxag")
//         //console.log("expected: ","zpub6rLj8yHs3mXRYSGNBSbajrkwghwLtpZLJf16q8bETA2mhZsMQdcPhXE4QQJAkQMAv8wpVeZYWqm3V45zzyAYS7exCugndVv8F8PmGfBTC5i")
//     })

//expected
//zpub6rLj8yHs3mXRYSGNBSbajrkwghwLtpZLJf16q8bETA2mhZsMQdcPhXE4QQJAkQMAv8wpVeZYWqm3V45zzyAYS7exCugndVv8F8PmGfBTC5i

//xpub6CbHtkFXTk5sJtSGShj48f3pWpqe1XXdnrFQusS4JC5WHSjong83E2Mm37zrZkMVMJcx7K5ACodZUQGqepGy6Fbu5DNRN3m3HWcHnT44dRD

let pubkey = "xpub6CqACLchVFzXdgKnuWrEun6oC65wmmC1XJy22xb9NSXFPDmb3gcECi17SVptNujJ1uqN8iY8JpWkhpzXxGSMokYjf3UEYjq5GGqrVqbgjfr"
let scriptType = "p2pkh"
let coin = "LTC"
let account = 0
let index = 0
// let isTestnet = true

// let xpub = "xpub6CbHtkFXTk5sJtSGShj48f3pWpqe1XXdnrFQusS4JC5WHSjong83E2Mm37zrZkMVMJcx7K5ACodZUQGqepGy6Fbu5DNRN3m3HWcHnT44dRD"
// //convert
// let zpub = crypto.xpubConvert(xpub,'zpub')
// console.log("zpub: ",zpub)
//
// let pubkey = zpub
// let scriptType = "bech32"
// let coin = "BTC"
// let account = 0
// let index = 0
// // let isTestnet = true

// let xpub = "xpub6D1weXBcFAo8CqBbpP4TbH5sxQH8ZkqC5pDEvJ95rNNBZC9zrKmZP2fXMuve7ZRBe18pWQQsGg68jkq24mZchHwYENd8cCiSb71u3KD4AFH"
// let pubkey = '02b9f9fabea9aaba811781d3cbf728dabe9502485d56031570bc49442a47dd057d'
// let scriptType = "p2pkh"
// let coin = "BTC"
// let account = 0
// let index = 0
// let isTestnet = true

crypto.generateAddress(coin,pubkey,scriptType)
    .then(function(resp){
        console.log("resp: ",resp)
    })
