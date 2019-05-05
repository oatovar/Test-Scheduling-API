const assert = require('assert');
const app = require('../../src/app');
const request = require('supertest');
const port = app.get('port') || 3030;

describe('\'search\' service', () => {

  before(function(done) {
    this.server = app.listen(port);

    this.server.once('listening', () => {
      ///console.log('listening');
      done();
    });
  });

  after(function(done) {
    //console.log('closing');
    this.server.close(done);
  });

  it('registered the service', () => {
    const service = app.service('search');

    assert.ok(service, 'Registered the service');
  });

  it('GET /search', function(done) {
    this.slow(6000);
    this.timeout(15000);
    request(app)
      .get('/search?search=a')
      .send()
      .expect(200,done);

  });
});
