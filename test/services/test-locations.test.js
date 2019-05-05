const assert = require('assert');
const app = require('../../src/app');

describe('\'test-locations\' service', () => {
  it('registered the service', () => {
    const service = app.service('test-locations');

    assert.ok(service, 'Registered the service');
  });
});
