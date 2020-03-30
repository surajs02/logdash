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

const LOG_TYPES = _.reduce({
    none: {
        color: _.identity,
        tag: '',
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
}, (a, v, k) => {
    const {
        consoleType = console.log,
        tag = k.toUpperCase(),
        color = _.identity,
    } = v;
    return {
        ...a,
        [k]: {
            ...v,
            func: {
                name: 'log' + k[0],
                op: (...args) => consoleType(
                    color(
                        `${tag}: ${args[0]}` // First arg is message.
                    ), ...args.slice(1) // Remaining args.
                ),
            }
        },
    }
}, {});

module.exports = {
    getErrorLine: e => e.stack.split('\n')[1],

    // Unpack log functions, which have 
    // shape: log<initial> => (...args) => console.log(<tag>: args[0], ...args.slice(1)).
    // E.g.: LOG_TYPES.info used as `logi('hello', 123)` to give `INFO: hello 123` where 123 is var.
    logFuncs: _.reduce(LOG_TYPES, (a, { func }, k) => ({ ...a, [func.name]: func.op }), {}),
};