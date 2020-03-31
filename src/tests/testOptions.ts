const assert = require('assert');
const _ = require('lodash');

import logdash, { ILogdashOptions } from '../logdash';

const args = ['string1', 1, true, [1, 2], { a: 1, b: 2, }, null, undefined, 'string2'];

const reloadLogdash = (options: ILogdashOptions = {}) => logdash({ lodashForMixin: _,...options });

describe('testing log options via logi', () => {
    before(() => reloadLogdash());

    it(`should log (no lodash chain)`, () => assert(
        _.logi(args).length
        , args.length
    ));

    it(`should log (with lodash chain)`, () => assert(
        _.chain(args)
            .logi()
            .value().length
        , args.length
    ));
    
    it(`should not log`, () => {
        reloadLogdash({ disableAllLogs: true, });
        assert(_.logi(args).length, args.length);
    });

    it(`should log`, () => {
        reloadLogdash({ disableAllLogs: false, });
        assert(_.logi(args).length, args.length);
    });
});

export { } // Make this file a ts module to keep its scope private.