type Logger = {
  assert(condition?: boolean, ...data: any[]): void;
  debug(...data: any[]): void;
  error(...data: any[]): void;
  info(...data: any[]): void;
  log(...data: any[]): void;
  trace(...data: any[]): void;
  warn(...data: any[]): void;
};
type LoggerFactory = (namespace: string) => Logger;
const noop = () => undefined;
const noopLogger = {
  assert: noop,
  debug: noop,
  error: noop,
  info: noop,
  log: noop,
  trace: noop,
  warn: noop,
};
let func: LoggerFactory = () => noopLogger;
export function hook(factory: LoggerFactory) {
  func = factory;
}
export function logs(namespace: string): Logger {
  return func(namespace)
}
