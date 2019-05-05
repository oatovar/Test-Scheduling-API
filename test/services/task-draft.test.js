const assert = require('assert');
const app = require('../../src/app');

const port = app.get('port') || 3030;

describe('\'taskDraft\' service', () => {
  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => done());
  });
  
  after(function(done) {
    this.server.close(done);
  });
  
  it('registered the service', () => {
    const service = app.service('task-draft');

    assert.ok(service, 'Registered the service');
  });

});
