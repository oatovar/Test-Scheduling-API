const assert = require('assert');
const app = require('../../src/app');

describe('\'priorities\' service', () => {
  it('registered the service', () => {
    const service = app.service('priorities');

    assert.ok(service, 'Registered the service');
  });
});
