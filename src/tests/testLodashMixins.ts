const assert = require('assert');
const _ = require('lodash');

require('../logdash')({ lodashForMixin: _, });

const args = ['string1', 1, true, [1, 2], { a: 1, b: 2, }, null, undefined, 'string2'];

export { } // Make this file a ts module to keep its scope private.

describe('logs in lodash chain', () => {
    it(`should log via first logFunc (logi)`, () => assert(
        _.chain(args)
            .logi()
            .value().length
        , args.length
    ));
});

export {  }