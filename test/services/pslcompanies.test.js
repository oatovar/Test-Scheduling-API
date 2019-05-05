const assert = require('assert');
const app = require('../../src/app');

describe('\'pslcompanies\' service', () => {
  it('registered the service', () => {
    const service = app.service('pslcompanies');

    assert.ok(service, 'Registered the service');
  });
});
