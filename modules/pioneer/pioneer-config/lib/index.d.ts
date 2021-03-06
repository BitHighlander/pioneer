export declare const pioneerConfig: string;
export declare const configPath: string;
export declare const keepkeyWatchPath: string;
export declare const seedDir: string;
export declare const walletDataDir: string;
export declare const pioneerPath: string;
export declare const modelDir: string;
export declare const backtestDir: string;
export declare const appDir: string;
export declare const backupDir: string;
export declare const logDir: string;
export declare const watchOnlyDir: string;
export declare function innitConfig(languageSelected: string): Promise<{} | undefined>;
export declare function initApps(): Promise<any>;
export declare function getApps(): Promise<any>;
export declare function initWallet(wallet: any): Promise<any>;
export declare function deleteConfig(): Promise<any>;
export declare function deleteWallet(walletName: string): Promise<any>;
export declare function backupWallet(walletName: string, path?: string): Promise<any>;
export declare function checkConfigs(walletName: string): any;
export declare function getKeepkeyWatch(path?: string): any;
export declare function getWallets(): Promise<any>;
export declare function getWalletsPublic(): Promise<any>;
export declare function getWallet(walletName?: string): any;
export declare function getWalletPublic(walletName?: string): any;
export declare function getConfig(): any;
export declare function setConfig(options: any): any;
export declare function updateConfig(options: any): void;
export declare const logLevel = "debug";
