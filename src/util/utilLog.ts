const _ = require('lodash');
import chalk from 'chalk';
import { identityArgs } from './utilLoop';

export interface ILogFunc {
    name: string;
    op: Function;
}

export interface ILogType {
    color: Function;
    consoleType?: Function;
    tag?: String;
    func?: ILogFunc;
    enabled?: boolean; 
};

export interface ILogTypeMap {
    [key: string]: ILogType;
}

export interface ILogFuncMap {
    [key: string]: Function;
}

export interface IUtilLogOptions {
    customizeLogTypes?: (logFuncs: ILogTypeMap) => ILogTypeMap;
}

const LOG_TYPES = {
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
};

const processLogTypes = (logTypes: ILogTypeMap) => _.reduce(
    logTypes, (a: any, v: ILogType, k: string) => {
        const {
            consoleType = console.log,
            tag = k.toUpperCase(),
            color = _.noop,
            enabled = true,
        }: ILogType = v;
        return {
            ...a,
            [k]: {
                ...v,
                func: {
                    name: 'log' + k[0],
                    op: (...args: any[]): any[] => {
                        if (enabled) consoleType(color(`[${tag}]`), ...args);
                        return identityArgs(...args);
                    },
                }
            },
        }
    }, {}
);

const getErrorLine = (e: Error) => e.stack?.split('\n')[1] || 'unknown';

// Unpack log functions, which have 
// shape: log<initial-letter> => (...args) => console.log([tag], ...args).
// E.g.: LOG_TYPES.info via `logi('hello', 123)` outputs '[INFO] hello 123' where 123 is var.
const logTypesToFuncs = (logTypes: ILogTypeMap): ILogFuncMap => _.reduce(logTypes, 
    (a: any, { func }: { func: ILogFunc }) => ({ ...a, [func.name]: func.op }), {}
);

export default (options?: IUtilLogOptions) => {
    const { customizeLogTypes = null } = options || {};


    const logTypesBuffer: ILogTypeMap = (customizeLogTypes != null)
        ? customizeLogTypes(LOG_TYPES)
        : LOG_TYPES;

    return {
        getErrorLine,
        logFuncs: logTypesToFuncs(processLogTypes(logTypesBuffer)),
    };
}