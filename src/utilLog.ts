const chalk = require('chalk');

// For reference purposes: Old version of log coloring.
// const LOG_COLORER = {
//     non: _.identity,
//     success: chalk.green,
//     warn: chalk.keyword('orange'),
//     danger: chalk.red,
//     info: chalk.grey,
// };
// const logWithColor = (logColorer, ...args) => console.log(logColorer(args[0]), ...args.slice(1));
// const logi = (...args) => logWithColor(LOG_COLORER.info, ...args);
// const logs = (...args) => logWithColor(LOG_COLORER.success, ...args);

interface LogFunction {
    name: string;
    op: Function;
}

interface LogType {
    consoleType: Function;
    tag: String;
    color: Function;
    func: LogFunction,
};

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
}, (a: any, v: LogType, k: string) => {
    const {
        consoleType = console.log,
        tag = k.toUpperCase(),
        color = _.identity,
    }: LogType = v;
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

module.exports = {
    getErrorLine: (e: Error) => e.stack?.split('\n')[1],

    // Unpack log functions, which have 
    // shape: log<initial> => (...args) => console.log(<tag>: args[0], ...args.slice(1)).
    // E.g.: LOG_TYPES.info used as `logi('hello', 123)` to give `INFO: hello 123` where 123 is var.
    logFuncs: _.reduce(LOG_TYPES, (a: any, { func }: { func: LogFunction }) => (
        { ...a, [func.name]: func.op }
    ), {}),
};