const assert = require('assert');
const app = require('../../src/app');

describe('\'requestors\' service', () => {
  it('registered the service', () => {
    const service = app.service('requestors');

    assert.ok(service, 'Registered the service');
  });
});
