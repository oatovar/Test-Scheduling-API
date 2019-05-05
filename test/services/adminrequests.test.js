const assert = require('assert');
const app = require('../../src/app');

describe('\'adminrequests\' service', () => {
  it('registered the service', () => {
    const service = app.service('adminrequests');

    assert.ok(service, 'Registered the service');
  });
});
