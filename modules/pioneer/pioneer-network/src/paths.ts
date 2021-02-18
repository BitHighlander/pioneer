


export function getPaths() {
    return [
        {
            note:"Standard bitcoin default path",
            type:"xpub",
            script_type:"p2pkh",
            available_scripts_types:['p2pkh'],
            addressNList: [0x80000000 + 44, 0x80000000 + 0, 0x80000000 + 0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
            coin: 'Bitcoin',
            symbol: 'BTC',
            network: 'BTC',
        },
        {
            note:"Bitcoin account 1",
            coin: 'Bitcoin',
            symbol: 'BTC',
            network: 'BTC',
            script_type:"p2pkh",
            available_scripts_types:['p2pkh'],
            type:"xpub",
            addressNList: [0x80000000 + 44, 0x80000000 + 0, 0x80000000 + 1],
            curve: 'secp256k1',
            showDisplay: true // Not supported by TrezorConnect or Ledger, but KeepKey should do it
        },
        {
            note:"bitcoin segwit bip49",
            coin: 'Bitcoin',
            symbol: 'BTC',
            network: 'BTC',
            script_type:"p2pkh",
            available_scripts_types:['p2pkh'],
            type:"xpub",
            addressNList: [0x80000000 + 49, 0x80000000 + 0, 0x80000000 + 0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
            scriptType: 'p2sh'
        },
        {
            note:"Default litecoin path",
            coin: 'Litecoin',
            symbol: 'LTC',
            network: 'LTC',
            script_type:"p2pkh",
            available_scripts_types:['p2pkh'],
            type:"xpub",
            addressNList: [0x80000000 + 44, 0x80000000 + 2, 0x80000000 + 0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
        },
        {
            note:"Default dogecoin path",
            coin: 'Dogecoin',
            symbol: 'DOGE',
            network: 'DOGE',
            script_type:"p2pkh",
            available_scripts_types:['p2pkh'],
            type:"xpub",
            addressNList: [0x80000000 + 44, 0x80000000 + 3, 0x80000000 + 0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
        },
        {
            note:"Default dash path",
            coin: 'Dash',
            symbol: 'DASH',
            network: 'DASH',
            script_type:"p2pkh",
            available_scripts_types:['p2pkh'],
            type:"xpub",
            addressNList: [0x80000000 + 44, 0x80000000 + 5, 0x80000000 + 0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
        },
        {
            note:" ETH primary (default)",
            symbol: 'ETH',
            network: 'ETH',
            script_type:"eth",
            available_scripts_types:['eth'],
            type:"address",
            addressNList: [0x80000000 + 44, 0x80000000 + 60, 0x80000000 + 0,0,0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
            coin: 'Ethereum'
        },
        // {
        //     note:" ETH primary (ledger)",
        //     symbol: 'ETH',
        //     network: 'ETH',
        //     script_type:"eth",
        //     available_scripts_types:['eth'],
        //     type:"address",
        //     addressNList: [0x80000000 + 44, 0x80000000 + 60, 0],
        //     curve: 'secp256k1',
        //     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
        //     coin: 'Ethereum'
        // },
        {
            note:"Fio primary",
            type:"address",
            script_type:"fio",
            available_scripts_types:['fio'],
            addressNList: [0x80000000 + 44, 0x80000000 + 235, 0x80000000 + 0, 0, 0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
            coin: 'Fio',
            symbol: 'FIO',
            network: 'FIO',
        },
        {
            note:" Default eos path ",
            type:"address",
            script_type:"eos",
            available_scripts_types:['eos'],
            addressNList: [0x80000000 + 44, 0x80000000 + 194, 0x80000000 + 0, 0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
            coin: 'Eos',
            symbol: 'EOS',
            network: 'EOS',
        },
        {
            note:"",
            type:"address",
            script_type:"binance",
            available_scripts_types:['binance'],
            addressNList: [0x80000000 + 44, 0x80000000 + 714, 0x80000000 + 0, 0 , 0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
            coin: 'Binance',
            symbol: 'BNB',
            network: 'BNB',
        },
        {
            note:" Default ATOM path ",
            type:"address",
            script_type:"cosmos",
            available_scripts_types:['cosmos'],
            addressNList: [0x80000000 + 44, 0x80000000 + 118, 0x80000000 + 0, 0, 0],
            curve: 'secp256k1',
            showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
            coin: 'Cosmos',
            symbol: 'ATOM',
            network: 'ATOM',
        },
        // {
        //     note:"",
        //     type:"address",
        //     addressNList: [0x80000000 + 44, 0x80000000 + 118, 0x80000000 + 0, 0x80000000 + 0],
        //     curve: 'secp256k1',
        //     showDisplay: true, // Not supported by TrezorConnect or Ledger, but KeepKey should do it
        //     coin: 'Cardano',
        //     symbol: 'ADA'
        // }

    ]
}
