# install

```bash
npm install named-logs
```

# use in library

```js
import {logs} from 'named-logs';
const console = logs('yourLibraryName');

console.log('whatever you want');
console.error('an error occured');
```

you can also add a decoration option which log renderer can use to add color, etc.. it expect a css string

```js
import {logs} from 'named-logs';
const console = logs('yourLibraryName', 'background: #222; color: #bada55');
```

# use in application

If you use a logging library that support `named-logs` you might not need to do anything else, except importing that lib that will call hook by itself.

For example, with [named-logs-console](https://github.com/wighawag/named-logs-console#readme) you can simply do in your root file (index.js)

```js
import {hookup} from 'named-logs-console';
hookup();
```

And now any library that use `named-logs` will have their log outputted to console but with full control on the app side. See [named-logs-console](https://github.com/wighawag/named-logs-console#readme) for more details.

## Install the factory before anything calls `logs()`

`logs(namespace)` looks for a factory at the moment it is called. If none is installed yet, it returns a no-op logger, and that logger stays a no-op: hooking a factory afterwards does not reach it. This is deliberate. With no factory, a log call is a call to an empty function, so a library pays nothing for logging that nobody asked to see.

Libraries usually call `logs()` once, at the top of a module. So the factory must be installed before any of those modules is EVALUATED, not merely before the first log call:

- ES modules evaluate their imports before their own body. Calling `hook()` (or `hookup()`) in the body of your entry file is too late for every library that file imports. Install the factory in a module of its own and import that module first, or use a `<script>` tag placed before your bundle (see [named-logs-console](https://github.com/wighawag/named-logs-console#readme)).
- Every JavaScript realm has its own `globalThis`, and the factory lives there (`globalThis._logFactory`). A Web Worker, a SharedWorker, a Service Worker, an iframe and a Node `worker_threads` worker each start with no factory, even if the page or main thread that created them has one. Install one in each of them, as the first import of the worker's entry.

## Use it inside your own app too

You can also use `named-logs` for making the logging calls, this way part of your app can be broken up into self contained libary without requiring any logging library expect for `named-logs` facade.

# `named-logs` is a facade

`named-logs` basically act as a minimal facade for logging with minimal overhead while remaining flexible. Perfect for libraries that want to remain agnostic to the logging method used. the esm module weight less than 926 bytes.

you can build your own handler, by doing the following:

```js
import {hook} from 'named-logs';
hook((namespace) => {
  return window.console;
});
```

This is a simple example that will make all log use `window.console`.
namespace will not be used here though. see [named-logs-console](https://github.com/wighawag/named-logs-console#readme) for a logger that supprt `window.console` with namespace/log level filtering.

to have it working with bundler the best way is to inject a script tag, see https://github.com/wighawag/named-logs-console#readme
