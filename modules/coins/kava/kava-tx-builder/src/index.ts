/*
    TX builder
        Normalizing tx building

 */

const TAG = " | kava-tx-builder | "

const cosmosjs = require("@cosmostation/cosmosjs");


const log = require('@pioneer-platform/loggerdog')()

module.exports = {
    signTx:function (to:string,from:string,amount:number,memo:string,seed:string) {
        return sign_transaction(to,from,amount,memo,seed)
    }
}

/**********************************
 // Lib
 //**********************************/

let sign_transaction = async function(to:string,from:string,amount:number,memo:string,seed:string){
    let tag = TAG + " | sign_transaction | "
    try{

        const chainId = "kava-6";
        // Please install and use rest server separately. (https://hub.cosmos.network/master/resources/service-providers.html#setting-up-the-rest-server)
        const kava = cosmosjs.network("https://lcd-kava.keplr.app", chainId);
        kava.setBech32MainPrefix("kava");
        kava.setPath("m/44'/459'/0'/0/0"); 		// new: m/44'/459'/0'/0/0, legacy: m/44'/118'/0'/0/0
        const address = kava.getAddress(seed);

        log.info(tag,"address: ",address)

        const ecpairPriv = kava.getECPairPriv(seed);

        log.info(tag,"ecpairPriv: ",ecpairPriv)

        let accountInfo = await kava.getAccounts(address)

        let stdSignMsg = kava.newStdMsg({
            msgs: [
                {
                    type: "cosmos-sdk/MsgSend",
                    value: {
                        amount: [
                            {
                                amount: String(100000), 	// 6 decimal places (1000000 ukava = 1 KAVA)
                                denom: "ukava"
                            }
                        ],
                        from_address: address,
                        to_address: to
                    }
                }
            ],
            chain_id: chainId,
            fee: { amount: [ { amount: String(5000), denom: "ukava" } ], gas: String(200000) },
            memo: "",
            account_number: String(accountInfo.result.value.account_number),		// If the address is a vesting account, use account_number of base_vesting_account
            sequence: String(accountInfo.result.value.sequence)					// If the address is a vesting account, use sequence of base_vesting_account
        });

        //log.info(tag,"stdSignMsg: ",stdSignMsg)

        const signedTx = kava.sign(stdSignMsg, ecpairPriv);
        log.info(tag,"signedTx: ",signedTx)
        log.info(tag,"signedTx: ",JSON.stringify(signedTx))

        return signedTx
    }catch(e){
        throw Error(e)
    }
}
