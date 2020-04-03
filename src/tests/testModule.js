const assert = require('assert').equal;

const { logi } = require('../../dist/logdash').loadLogdash().logFuncs;

describe('test lodash module in js', () => {
    it('logi should exist and log',  () => {
        assert(logi != null, true);
        logi('test');
    });
});


