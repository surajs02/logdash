import { equal as assert } from 'assert';
import chalk from 'chalk';
const _ = require('lodash'); // TODO: Non-typed import as using lodash mixins, fix name not found?

import logdash, 
    { ILogdashOptions, ILogType, ILogTypeMap, ILogFunc, mapObjKeys, mapObjValues} from '../logdash';

const args = ['string1', 1, true, [1, 2], { a: 1, b: 2, }, null, undefined, 'string2'];

const reloadLogdash = (options?: ILogdashOptions) => logdash({ lodashForMixin: _, ...options });

// _.each(
//     reloadLogdash({
//         customizeLogTypes: (logTypes: ILogTypeMap) => {
//             const a = mapObjKeys(logTypes, (k: string) => k + 'NEW');
//             // console.log('dsfdasfasdfadfasdfasdf', a)
//             return a;
//         }
//     }).logFuncs,
//     (f: Function, n: string) => {
//         console.log('name ->', n)
//         // f(...args)
//     });

describe('testing log options via logi', () => {
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

        // _.each(
        //     reloadLogdash({ 
        //         customizeLogTypes: (logTypes: ILogTypeMap) => {
        //             const a = mapObjValues(logTypes, (t: ILogType) => {
        //                 return { ...t, color: 'hello there'}
        //             });
        //             return a;
        //         }
        //     }).logFuncs, 
        //     (f: Function, n: string) => {
        //         it(`should change log color to none via ${n}`, () => {
        //         assert(f(...args).length, args.length);
        //     });
        // });
        // _.each(
        //     reloadLogdash({ 
        //         customizeLogTypes: (logTypes: ILogTypeMap) => {
        //             const a = mapObjValues(logTypes, (t: ILogType) => {
        //                 return { ...t, color: chalk.magenta}
        //             });
        //             console.log('dsfdasfasdfadfasdfasdf', a)
        //             return a;
        //         }
        //     }).logFuncs, 
        //     (f: Function, n: string) => {
        //         it(`should change log colors to magenta via ${n}`, () => {
        //         assert(f(...args).length, args.length);
        //     });
        // });
        _.each(
            reloadLogdash({ 
                customizeLogTypes: (logTypes: ILogTypeMap) => {
                    const a = mapObjKeys(logTypes, (k: string) => k+'NEW');
                    console.log('dsfdasfasdfadfasdfasdf', a)
                    return a;
                }
            }).logFuncs, 
            (f: Function, n: string) => {
                it(`should change log tags to 'VERY NEW' via ${n}`, () => {
                assert(f(...args).length, args.length);
            });
        });
});

export {} // Make this file a ts module to keep its scope private.