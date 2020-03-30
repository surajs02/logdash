const assert = require('assert');
global._ = require('lodash')

const { logFuncs } = require('./utilLog');

describe('non-chain logs', () => {
    const testText = 'testText';
    const args = ['test', 1, true, [1, 2], { a:1, b:2, }, null, undefined];

    _.each(logFuncs, (f, n) => {
        it(`${n} should log standard text`, () => f('test text', ...args));
    });
});