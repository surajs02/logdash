import { equal as assert } from 'assert';
import chalk from 'chalk';
const _ = require('lodash'); // TODO: Non-typed import as using lodash mixins, fix name not found?

import logdash, 
    { ILogdashOptions, ILogType, ILogTypeMap, ILogFunc, mapObjKeys, mapObjValues} from '../logdash';

const args = ['string1', 1, true, [1, 2], { a: 1, b: 2, }, null, undefined, 'string2'];

const reloadLogdash = (options?: ILogdashOptions) => logdash({ lodashForMixin: _, ...options });

describe('test log options', () => {

    describe('test logs via lodash', () => {
        before(() => reloadLogdash());

        it(`should log (no lodash chain)`, () => assert(
            _.logi(...args).length
            , args.length
        ));
        it(`should log (with lodash chain)`, () => assert(
            _.chain(args)
                .logi()
                .value().length
            , args.length
        ));
    });

    describe('test disabling logs', () => {
        _.each(reloadLogdash({ disableAllLogs: true, }).logFuncs, (f: Function, n: string) => {
            it(`should not log via ${n}`, () => {
                assert(f(...args).length, args.length);
            });
        });
        _.each(reloadLogdash({ disableAllLogs: false, }).logFuncs, (f: Function, n: string) => {
            it(`should log via ${n}`, () => {
                assert(f(...args).length, args.length);
            });
        });
    });

    describe('test customizing logs', () => {
        it(`should add and log via cyan added log (loga)`, () => {
            const loga = reloadLogdash({
                customizeLogTypes: (logTypes: ILogTypeMap) => ({
                    ...logTypes,
                    added: { color: chalk.cyan },
                }),
            }).logFuncs.loga;
            assert(loga(...args).length, args.length);
        });
        _.each(
            reloadLogdash({
                customizeLogTypes: (logTypes: ILogTypeMap) => mapObjValues(
                    logTypes, (t: ILogType) => ({ ...t, color: chalk.magenta })
                ),
            }).logFuncs,
            (f: Function, n: string) => {
                it(`should change log colors to magenta via ${n}`, () => {
                    assert(f(...args).length, args.length);
                });
            });
        _.each(
            reloadLogdash({
                customizeLogTypes: (logTypes: ILogTypeMap) => mapObjKeys(
                    logTypes, (k: string) => k + 'New'
                ),
            }).logFuncs,
            (f: Function, n: string) => {
                it(`should append 'NEW' to log tags and log via ${n}`, () => {
                    assert(f(...args).length, args.length);
                });
            });
    });
});

export {} // Make this file a ts module to keep its scope private.