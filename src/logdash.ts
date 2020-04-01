const _ = require('lodash');
import './util/utilLodashMixins';

import { logFuncs } from './util/utilLog';

export interface ILogdashOptions {
    lodashForMixin?: typeof _;
    disableAllLogs?: boolean;
}

export default (options: ILogdashOptions) => {
    const { lodashForMixin, disableAllLogs = false } = options;
    


    const logFuncsBuffer = disableAllLogs
        ? _.mapObjValues(logFuncs, () => _.identityArgs)
        : logFuncs;

    if (lodashForMixin != null && lodashForMixin.hasOwnProperty('mixin')) {
        lodashForMixin.mixin({
            ...logFuncsBuffer,
        });
    }

    return {
        logFuncs: logFuncsBuffer,
    };
} ;

// TODO: Add options:
// - check re-enabling logs?
// - switch between info/debug based on node/client?
// - allow customising logs? post-export callback?
