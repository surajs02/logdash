const assert = require('assert');
const _ = require('lodash'); // TODO: Fix global lodash?

const { logFuncs } = require('../utilLog');

const msg = 'message';
const args = ['string1', 1, true, [1, 2], { a: 1, b: 2, }, null, undefined, 'string2'];

describe('logs with message and args', () => {
    _.each(logFuncs, (f: Function, n: string) => {
        it(`should log via [${n}] message and args`, () => f(msg, ...args));
    });
});

describe('logs with only args', () => {
    _.each(logFuncs, (f: Function, n: string) => {
        it(`should log via [${n}] args`, () => f(...args));
    });
});


export { } // Make this file a ts module to keep its scope private.