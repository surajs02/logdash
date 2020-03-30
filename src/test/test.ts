const assert = require('assert');
const _ = require('lodash'); // Avoid 'find name errors'.
(global as any)._ = _;

const { logFuncs } = require('../utilLog');

const msg = 'message';
const args = ['string1', 1, true, [1, 2], { a: 1, b: 2, }, null, undefined, 'string2'];

describe('logs with message and args', () => {
    _.each(logFuncs, (f: Function, n: string) => {
        it(`should log ${n} message and args`, () => f(msg, ...args));
    });
});

describe('logs with only args', () => {
    _.each(logFuncs, (f: Function, n: string) => {
        it(`should log ${n} args`, () => f(...args));
    });
});

// TODO: Test with lodash.
