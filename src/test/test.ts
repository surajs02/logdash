const assert = require('assert');
const _ = require('lodash');
(global as any)._ = _;

const { logFuncs } = require('../utilLog');

describe('non-chain logs', () => {
    const testText = 'testText';
    const args = ['test', 1, true, [1, 2], { a:1, b:2, }, null, undefined];

    _.each(logFuncs, (f: Function, n: string) => {
        it(`${n} should log standard text`, () => f('test text', ...args));
    });
});