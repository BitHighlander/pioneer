/*
    Thorchain
 */

require("dotenv").config({path:'./../../.env'})
require("dotenv").config({path:'../../../../.env'})
require("dotenv").config({path:'../../../../../.env'})
let network = require("../lib/index")


// network.info()
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })

// let address = "terra1jhv0vuygfazfvfu5ws6m80puw0f80kk66vn7hd"
// network.getBalance(address)
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })


let address = "terra1jhv0vuygfazfvfu5ws6m80puw0f80kk66vn7hd"
network.getBalance(address)
    .then(function(resp){
        console.log("resp: ",resp)
    })

// let tx = '{"msg":[{"type":"bank/MsgSend","value":{"from_address":"terra1jhv0vuygfazfvfu5ws6m80puw0f80kk66vn7hd","to_address":"terra1lqk43hvysuzymrgg08q45234z6jzth32wsx6y3","amount":[{"denom":"uluna","amount":"100000"}]}}],"fee":{"gas":"79695","amount":[{"denom":"uluna","amount":"404"}]},"signatures":[{"signature":"MKweMoRVIjftymHyXP/3Enmims5Ab48/ZsuSn22omfwoFgv/SPpmAR0FLeWBgARLPa5mpChz8BPL5zUJmInx6w==","pub_key":{"type":"tendermint/PubKeySecp256k1","value":"Ag3RSURmEJLUFtvw6xG3GUWgXB6EvrwEKSHuV0tZTwvE"}}],"memo":"testmemo"}'
//
// network.broadcast(tx)
//     .then(function(resp){
//         console.log("resp: ",resp)
//     })
