const assert = require('assert');
const _ = require('lodash'); // TODO: Fix global lodash?

const { logFuncs } = require('../util/utilLog');

const msg = 'message';
const args = ['string1', 1, true, [1, 2], { a: 1, b: 2, }, null, undefined, 'string2'];

describe('logs with message and args', () => {
    _.each(logFuncs, (f: Function, n: string) => {
        it(`should log via [${n}] message and args`, () => assert(
            f(msg, ...args).length, args.length + 1
        ));
    })    
});

describe('logs with only args', () => {
    _.each(logFuncs, (f: Function, n: string) => {
        it(`should log via [${n}] args`, () => assert(
            f(...args).length, args.length
        ));
    })
});


export {} // Make this file a ts module to keep its scope private.