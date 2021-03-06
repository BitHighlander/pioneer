
require("dotenv").config({path:'./../../.env'})
require("dotenv").config({path:'../../../.env'})
require("dotenv").config({path:'../../../../.env'})

// import * as config ""
let {
    supportedBlockchains,
    supportedAssets,
    baseAmountToNative,
    nativeToBaseAmount,
    getPaths,
    get_address_from_xpub,
    normalize_pubkeys,
    getNativeAssetForBlockchain
} = require('../lib/index.js')



let amountNative = 12000
// console.log("base: ",baseAmountToNative("BTC",amountNative))
// console.log("base: ",nativeToBaseAmount("BTC",amountNative))

let paths = getPaths(['bitcoin','ethereum','thorchain','bitcoincash','litecoin','binance'])
console.log("paths: ",paths)
//
// console.log("supportedAssets: ",supportedAssets)
//console.log("supportedBlockchains: ",supportedBlockchains)

//console.log(getPaths())

//get
let result = [
    {
        xpub: 'xpub6CbHtkFXTk5sJtSGShj48f3pWpqe1XXdnrFQusS4JC5WHSjong83E2Mm37zrZkMVMJcx7K5ACodZUQGqepGy6Fbu5DNRN3m3HWcHnT44dRD'
    },
    {
        xpub: 'xpub6Bf8Sx3kwr64FNcVPdX3hXnSqUpTgMRKdy8DmXqH6ucF8tJXq3bQfQC2HtxSxqgnePuGQ3LYFHt5imw9V2Wnc5ypPYxTeAYKa2Y3WuWcByj'
    },
    {
        xpub: 'xpub6G5eZd31CkbSBC9ZTD8zrSiBjyHiPM23rejNV37iBHnuGzYWiv94f9LgZyVHm7ysVeHPWmZWSWScHiVSCyBc6ebcogCivss8Tys8LPtmvGv'
    },
    {
        xpub: 'xpub6FjMZmNXj8meezdSUWudQ3WSUfRNwfN9Eodu9h8ijz7p1FKhg1UxxPdbAYAS1Se3ybG5pfEGAUukRkV1mubLH3819jQqhjM14qnymNCAhDi'
    },
    {
        xpub: 'xpub6BtH1WStaVrzUC3mfoxy1F7MkJ9Tx5fjmMAn2RKaHSeYRNFYiQZWHchbWY7edcXwj4Un9cF1qMuA8tkEpkkcDc5WKgenPD5ZfXvpErPNx2K'
    },
    {
        xpub: 'xpub6CqACLchVFzXdgKnuWrEun6oC65wmmC1XJy22xb9NSXFPDmb3gcECi17SVptNujJ1uqN8iY8JpWkhpzXxGSMokYjf3UEYjq5GGqrVqbgjfr'
    }
]

let run_test = async function(){
    try{
        let pubkeys = await normalize_pubkeys('keepkey',result,paths)

        console.log("pubkeys: ",pubkeys)
    }catch(e){
        console.error(e)
    }
}
run_test()


// let xpub = "xpub6D1weXBcFAo8CqBbpP4TbH5sxQH8ZkqC5pDEvJ95rNNBZC9zrKmZP2fXMuve7ZRBe18pWQQsGg68jkq24mZchHwYENd8cCiSb71u3KD4AFH"
// let scriptType = "p2pkh"
// let coin = "BTC"
// let account = 0
// let index = 0
// let isTestnet = true
//
// get_address_from_xpub(xpub,scriptType,coin,account,index,false,isTestnet)
//     .then(function(address){
//         console.log("address: ",address)
//     })


