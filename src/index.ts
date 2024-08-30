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
  time: noop,
  timeEnd: noop,
  timeLog: noop,
};

let proxies: {[namespace: string]: Logger};
let target: Logger | undefined;

function createProxy() {
  const proxy: Logger = new Proxy(noopLogger, {
    get(t, p, r) {
      return ((target || t) as any)[p];
    },
  });
  return proxy;
}

let _factory: LoggerFactory | undefined;
export function hook(factory: LoggerFactory) {
  if (typeof globalThis !== 'undefined') {
    (globalThis as any)._logFactory = factory;
  } else {
    _factory = factory;
  }
}
export function logs(namespace: string): Logger {
  let logger = proxies[namespace];
  if (!logger) {
    logger = proxies[namespace] = createProxy();
  }
  return logger;
}
