const _ = require('lodash');
const chalk = require('chalk');

export interface ILogFunc {
    name: string;
    op: Function;
}

export interface ILogType {
    consoleType: Function;
    tag: String;
    color: Function;
    func: ILogFunc,
};

interface ILogFuncMap {
    [key: string]: ILogFunc;
}

const LOG_TYPES = _.reduce({
    none: {
        color: _.identity,
    },
    info: {
        color: chalk.blue,
        consoleType: console.info,
    },
    success: {
        color: chalk.green,
    },
    warn: {
        color: chalk.keyword('orange'),
        consoleType: console.warn,
    },
    error: {
        color: chalk.red,
        consoleType: console.error,
    },
}, (a: any, v: ILogType, k: string) => {
    const {
        consoleType = console.log,
        tag = k.toUpperCase(),
        color = _.identity,
    }: ILogType = v;
    return {
        ...a,
        [k]: {
            ...v,
            func: {
                name: 'log' + k[0],
                op: (...args: any[]) => (
                    consoleType(
                        color(`[${tag}]`),
                        ...args
                    ), 
                    args
                ),
            }
        },
    }
}, {});

export const getErrorLine = (e: Error) => e.stack?.split('\n')[1] || 'unknown';

// Unpack log functions, which have 
// shape: log<initial-letter> => (...args) => console.log([tag], ...args).
// E.g.: LOG_TYPES.info via `logi('hello', 123)` outputs '[INFO] hello 123' where 123 is var.
export const logFuncs: ILogFuncMap = _.reduce(LOG_TYPES, 
    (a: any, { func }: { func: ILogFunc }) => ({ ...a, [func.name]: func.op }), {}
);