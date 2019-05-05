const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const uniqueId = require('../../src/hooks/unique-id');
const uniqid = require('uniqid');

describe('\'unique ID\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(data) {
        return data;
      }
    });

    app.service('dummy').hooks({
      before: uniqueId({name: 'John'}),
    });
  });

  it('runs the hook', async () => {
    let mockContextData = {
      name: 'John',
    };
    let id = uniqid('John').toUpperCase();

    const result = await app.service('dummy').create(mockContextData);

    assert.notEqual(result, {name: 'John', id });
  });
});
