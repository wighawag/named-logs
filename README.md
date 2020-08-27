# install

```bash
npm install named-logs
```

# use in library

```js
import {logs} from 'named-logs';
const console = logs('yourLibraryName`);

console.log('whatever you want');
console.error('an error occured');
```

# use in application

If you use a logging library that support `named-logs` you might not need to do anything else, except importing that lib that will call hook by itself

Else, you can do as follow to for example hook up the console :
```js
import {hook} from 'named-logs';
hook((namespace) => {
    return window.console;
});
```
This will make all call using window.console.
namespace will not be used but all line will be shown in the console
