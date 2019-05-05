const assert = require('assert');
const app = require('../../src/app');

describe('\'request-drivers\' service', () => {
  it('registered the service', () => {
    const service = app.service('request-drivers');

    assert.ok(service, 'Registered the service');
  });
});
