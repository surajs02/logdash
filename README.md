# logdash

<div align="center">
  <a href="https://user-images.githubusercontent.com/11654341/78821329-36a30300-79d1-11ea-8a12-ad7368f426a6.png">
    <img src="https://user-images.githubusercontent.com/11654341/78821329-36a30300-79d1-11ea-8a12-ad7368f426a6.png" width="50%"/>
  </a>
</div>

Simple and customizable log functions that can integrate with `lodash`.

## Features
- 5 pre-defined log functions:
    - `logn`: Prints uncolored `[NONE]` tag via `console.log`
    - `logi`: Prints blue `[INFO]` tag via `console.info`
    - `logs`: Prints green `[SUCCESS]` tag via `console.log`
    - `logw`: Prints orange `[WARN]` tag via `console.warn`
    - `loge`: Prints red `[ERROR]` tag via `console.error`
- Add and customize logs by color, console, tag, and more
- Use log functions directly or easily integrate for lodash chain logging
- Toggle log functions on/off
- Helper functions for easily mapping over and customizing log type objects

## Install

```bash
npm install @surajs02/logdash
```

## Basic Usage

All log functions can be used directly (i.e., without `lodash` integration)
```ts
import { loadLogdash } from '@surajs02/logdash'; // TypeScript
// const { loadLogdash } = require('logdash'); // JavaScript.

const { logn, logi, logs, logw, loge } = loadLogdash().logFuncs;

logn('A standard log');
logi('This might be useful');
logs('That went well');
logw('There may be a problem...');
loge('There was an error');
```

The above logs would be styled and displayed with a colored tag:

![all-logs](https://user-images.githubusercontent.com/11654341/78821388-533f3b00-79d1-11ea-80f6-1b94a8768db1.png)

All log functions support multiple arguments:
```ts
logn('String1', 1, true, [1], { a: 1 }, null, undefined);
```

## Integrating with `lodash`

Pass a `lodash` instance as a `lodashForMixin` option to make log functions available via `lodash`:
```ts
const _ = require('lodash');

loadLogdash({ lodashForMixin: _, });

_.logn('Logging directly via logdash');
```

Log functions can be used indirectly in `lodash` chains:
```ts
const doubled = _.chain([1, 2, 3])
    .logi() // Prints [1, 2, 3].
    .map(n => n * 2)
    .logi() // Prints [2, 4, 8].
    .value();

_.logi(doubled.length); // Prints 3.
```

## Customization

All log functions are enabled by default but can be disabled via the `disableAllLogs` option:
```ts
const { logi } = loadLogdash({ disableAllLogs: true, }).logFuncs;
_.logi("This won't be printed");
```

Log types are customized via the `customizeLogTypes` option, which is a function that 
accepts a `ILogTypeMap` to return a new `ILogTypeMap`:
```ts
interface ILogTypeMap {
    [key: string]: ILogType;
}
```

`ILogTypeMap` maps log type names to `ILogType` values:
```ts
interface ILogType {
    color?: Function;
    consoleType?: Function;
    tag?: String;
    func?: ILogFunc;
    enabled?: boolean; 
}
```

New log types can be added and accessed via `log<initial-letter-of-log-type>`:
```ts
const { loga } = loadLogdash({
    customizeLogTypes: (logTypes: ILogTypeMap) => ({
        ...logTypes,
        added: { color: chalk.cyan }, // `added` will become `loga`.
    }),
}).logFuncs;
loga('This will print in cyan!');
```

Existing log types can be customized easily via the `mapObjValues` helper:
```ts
import { loadLogdash, mapObjValues, ILogType } from '@surajs02/logdash';
const { logi } = loadLogdash({
    customizeLogTypes: (logTypes: ILogTypeMap) => mapObjValues(
        logTypes, (t: ILogType) => ({...logTypes, color: chalk.magenta }),
    }),
}).logFuncs;
logi('This and other log functions will now print in magenta!');
```

## Testing

Setup
```bash
git clone https://github.com/surajs02/logdash.git && cd logdash && npm install
```

Run all tests
```bash
npm run test
```

Test only log functions
```bash
npm run testLogFuncs
```

Test only `logdash` options (e.g., `lodash` integration)
```bash
npm run testOptions
```