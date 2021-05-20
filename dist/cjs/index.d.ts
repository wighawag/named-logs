export declare type Logger = {
    readonly assert: (condition?: boolean, ...data: any[]) => void;
    readonly error: (...data: any[]) => void;
    readonly warn: (...data: any[]) => void;
    readonly info: (...data: any[]) => void;
    readonly log: (...data: any[]) => void;
    readonly debug: (...data: any[]) => void;
    readonly dir: (item?: any, options?: any) => void;
    readonly table: (tabularData?: any, properties?: string[]) => void;
    readonly trace: (...data: any[]) => void;
};
declare type LoggerFactory = (namespace: string) => Logger;
export declare function hook(factory: LoggerFactory): void;
export declare function logs(namespace: string): Logger;
export {};
//# sourceMappingURL=index.d.ts.map