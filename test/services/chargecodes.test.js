const assert = require('assert');
const app = require('../../src/app');

describe('\'chargecodes\' service', () => {
  it('registered the service', () => {
    const service = app.service('chargecodes');

    assert.ok(service, 'Registered the service');
  });
});
