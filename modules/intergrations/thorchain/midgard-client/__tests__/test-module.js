require("dotenv").config({path:'../../../.env'})
// require("dotenv").config({path:'../../../../.env'})
// require("dotenv").config({path:'../../../../../.env'})

// const colorize = require('json-colorizer');
let midgard = require("../lib")
// let beautify = require("json-beautify");
// let log = function(tag,obj){
//     try{
//         // console.log(tag, beautify(obj, null, 2, 100));
//         console.log(tag, colorize(beautify(obj, null, 2, 100)));
//     }catch(e){
//         console.error(e)
//     }
// }

let run_test = async function(){
    try{

        // let info = await midgard.getInfo()
        // console.log("info: ",info)

        // let pools = await midgard.getPools()
        // console.log("pools: ",pools)

        //get price
        // let price = await midgard.getPrice("BNB.ETH-D5B")
        // console.log("price: ",price)

        // let poolInfo = await midgard.getPool("BNB.ETH-D5B")
        // console.log("poolInfo: ",poolInfo)

        //compair to
        // let addresses = await midgard.getPoolAddress()
        // console.log("addresses: ",addresses)

        // let addresses = await midgard.getNewAddress()
        // console.log("addresses: ",addresses)

        // let poolInfo = await midgard.getPool("BNB.BULL-BE4")
        // console.log("poolInfo: ",poolInfo)

        //get transactions by address

        //get transaction by txid
        let txid = '2db7788e186f253f1776bf32a5b7b18b9b6ace2bd915c4b7c075c2e1e6207f35'
        //let txid = 'A2BCC716691C2DD4C748456F9BF4C4E862F6A3E7E3D3E820658067B0FA2568DE'
        let txInfo = await midgard.getTransaction(txid)
        console.log("txInfo: ",JSON.stringify(txInfo))

    }catch(e){
        console.error(e)
    }
}

run_test()
