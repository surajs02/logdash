const assert = require('assert');
const _ = require('lodash'); // TODO: Fix global lodash?

import utilLog from '../util/utilLog';

const { logFuncs } = utilLog();

const msg = 'message';
const args = ['string1', 1, true, [1, 2], { a: 1, b: 2, }, null, undefined, 'string2'];

describe('test log funcs', () => {
    describe('test logging message and args', () => {
        _.each(logFuncs, (f: Function, n: string) => {
            it(`should log via [${n}]`, () => assert(
                f(msg, ...args).length, [msg, args].length
            ));
        });
    });

    describe('test logging only args', () => {
        _.each(logFuncs, (f: Function, n: string) => {
            it(`should log via [${n}]`, () => assert(
                f(...args).length, args.length
            ));
        });
    });
});

export {} // Make this file a ts module to keep its scope private.