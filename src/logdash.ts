const _ = require('lodash');
import './util/utilLodashMixins';

import utilLog, { IUtilLogOptions } from './util/utilLog';
import * as utilLogOther from './util/utilLog';

export interface ILogType extends utilLogOther.ILogType {};
export interface ILogTypeMap extends utilLogOther.ILogTypeMap {};
export interface ILogFuncMap extends utilLogOther.ILogFuncMap {};
export interface ILogFunc extends utilLogOther.ILogFunc {};

export interface ILogdashOptions {
    lodashForMixin?: typeof _;
    disableAllLogs?: boolean;
    customizeLogTypes?: (logTypes: ILogTypeMap) => ILogTypeMap;
}

export const mapObjKeys = _.mapObjKeys;
export const mapObjValues = _.mapObjValues;

const reloadUtilLog = (options?: IUtilLogOptions) => utilLog({ ...options,  });

export default (options: ILogdashOptions) => {
    const { lodashForMixin, disableAllLogs = false, customizeLogTypes } = options;

    // TODO: Move this to customizeLogs() which calls reloadLogFuncs in utilLog.
    let logFuncs = reloadUtilLog({ customizeLogTypes }).logFuncs;

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

// TODO:
// - allow customising logs? post-export callback?
// - regroup tests in options?
// - move disable log into utilLog via customizeLogTypes
// - switch between info/debug based on node/client?
