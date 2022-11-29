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
  trace: noop,
  write: noop,
};

export function hook(factory: LoggerFactory) {
  (globalThis as any)._logFactory = factory;
}
export function logs(namespace: string): Logger {
  return (globalThis as any)._logFactory ? (globalThis as any)._logFactory(namespace) : noopLogger;
}
