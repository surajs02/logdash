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

export const mapObj = _.mapObj;
export const mapObjKeys = _.mapObjKeys;
export const mapObjValues = _.mapObjValues;

const reloadUtilLog = (options?: IUtilLogOptions) => utilLog({ ...options, });

export default (options?: ILogdashOptions) => {
    let { lodashForMixin, disableAllLogs = false, customizeLogTypes } = options || {}; 

    let logFuncs = reloadUtilLog({ 
        customizeLogTypes: logTypes => mapObj(
            customizeLogTypes == null ? logTypes : customizeLogTypes(logTypes), // By user.
            (v: ILogType, k: string) => ({ // By logdash.
                [k]: {
                    ...v,
                    enabled: !disableAllLogs,
                }
            }
        )),
    }).logFuncs;

    if (lodashForMixin != null && lodashForMixin.hasOwnProperty('mixin')) {
        lodashForMixin.mixin({
            ...logFuncs,
        });
    }

    return {
        logFuncs,
    };
} ;

// TODO:
// - switch between info/debug based on node/client?
