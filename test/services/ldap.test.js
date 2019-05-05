const assert = require('assert');
const app = require('../../src/app');

describe('\'ldap\' service', () => {
  it('registered the service', () => {
    const service = app.service('user');

    assert.ok(service, 'Registered the service');
  });

  it('the "find" method will properly bind and return a set of users', () => {
    const service = app.service('user');
    let result = service.find();
    assert.notDeepStrictEqual(result.data, null);
  });

  it('the "get" method is defined', () => {
    const service = app.service('user');
    assert.ok(service.get);
    assert.ok(service.get('id'));
  });
});
