export type Logger = {
  assert(condition?: boolean, ...data: any[]): void;
  error(...data: any[]): void;
  warn(...data: any[]): void;
  info(...data: any[]): void;
  log(...data: any[]): void;
  debug(...data: any[]): void;
  dir(item?: any, options?: any): void;
  table(tabularData?: any, properties?: string[]): void;
  trace(...data: any[]): void;
};
type LoggerFactory = (namespace: string) => Logger;
const noop = () => undefined;
const noopLogger = {
  assert: noop,
  error: noop,
  warn: noop,
  info: noop,
  log: noop,
  debug: noop,
  dir: noop,
  table: noop,
  trace: noop
};
let func: LoggerFactory = () => noopLogger;
export function hook(factory: LoggerFactory) {
  func = factory;
}
export function logs(namespace: string): Logger {
  return func(namespace)
}
