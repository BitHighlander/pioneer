export interface config {
    isTestnet?: boolean;
    spec: string;
    env: string;
    mode: string;
    hdwallet: HDWALLETS;
    authProvider?: AuthProviders;
    username: string;
    wallet?: any;
    pubkeys?: any;
    auth?: string;
    paths?: any;
    privWallet?: any;
    mnemonic?: string;
    queryKey?: string;
    offline?: boolean;
    pioneerApi?: boolean;
}
export interface Balance {
    total: number;
    pending: number;
    confirmed: number;
}
export declare enum AuthProviders {
    shapeshift = "shapeshift",
    bitcoin = "bitcoin"
}
export declare enum HDWALLETS {
    'pioneer' = 0,
    'trezor' = 1,
    'keepkey' = 2,
    'ledger' = 3,
    'metamask' = 4
}
export interface Transaction {
    coin: string;
    addressFrom: string;
    addressTo: string;
    amount: string;
    memo: string;
    nonce?: number;
}
export interface CoinInfo {
    coin: string;
    note?: string;
    script_type: string;
    available_scripts_types?: [string];
    long?: string;
    path: string;
    master: string;
    network: string;
    pubkey: string;
    curve?: string;
    xpub?: string;
    zpub?: string;
    type?: string;
}
