const { logFuncs } = require('./utilLog');

interface ILogdashOptions {
    lodashForMixin?: any;
}

module.exports = (options: ILogdashOptions) => {
    const { lodashForMixin } = options;
    if (lodashForMixin != null && lodashForMixin.hasOwnProperty('mixin')) {
        lodashForMixin.mixin({
            ...logFuncs,
        })
    }

    return {
        logFuncs,
    };
}

// TODO: Add options:
// - turn on/off all logs
// - switch between info/debug based on node/client?
// - allow customising logs? post-export callback?

export { }
