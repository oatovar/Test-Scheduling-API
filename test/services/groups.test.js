const assert = require('assert');
const app = require('../../src/app');

describe('\'groups\' service', () => {
  it('registered the service', () => {
    const service = app.service('groups');

    assert.ok(service, 'Registered the service');
  });

  it('testing groups find method', async () => {
    const service = app.service('groups');

    let result = await service.find();

    assert.strictEqual(true, Array.isArray(result.result), result);
  });
});
