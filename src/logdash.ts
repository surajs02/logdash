const _ = require('lodash');
import './util/utilLodashMixins';

import { logFuncs, ILogFunc } from './utilLog';

export interface ILogdashOptions {
    lodashForMixin?: typeof _;
    disableAllLogs?: boolean;
}

export default (options: ILogdashOptions) => {
    const { lodashForMixin, disableAllLogs } = options;
    
    const logFuncsBuffer = disableAllLogs
        ? _.mapObjValues(logFuncs, () => _.identity)
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
