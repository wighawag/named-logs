export type Logger = {
    readonly assert: (condition?: boolean, ...data: any[]) => void;
    readonly error: (...data: any[]) => void;
    readonly warn: (...data: any[]) => void;
    readonly info: (...data: any[]) => void;
    readonly log: (...data: any[]) => void;
    readonly debug: (...data: any[]) => void;
    readonly dir: (item?: any, options?: any) => void;
    readonly table: (tabularData?: any, properties?: string[]) => void;
    readonly trace: (...data: any[]) => void;
    readonly write: (msg: string) => void;
    readonly time: (label: string) => void;
    readonly timeEnd: (label: string) => void;
    readonly timeLog: (label?: string) => void;
};
export type TypedLogger<LoggerType extends Logger> = LoggerType;
type LoggerFactory = <LoggerType extends Logger = Logger>(namespace: string) => TypedLogger<LoggerType>;
export declare function hook(factory: LoggerFactory): void;
export declare function logs(namespace: string, options?: {
    fallbackOnProxy?: boolean | string;
}): Logger;
export {};
//# sourceMappingURL=index.d.ts.map