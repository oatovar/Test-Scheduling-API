/* eslint-disable no-console */
const assert = require('assert');
const app = require('../../src/app');
const request = require('supertest');
const port = app.get('port') || 3030;

describe('\'requests\' service', function() {
  this.slow(6000);
  this.timeout(15000);

  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => {
      console.log('listening');
      done();
    });
  });

  after(function(done) {
    console.log('closing');
    this.server.close(done);
  });

  it('registered the service', async function() {
    const db = await app.get('mongoClient');
    const service = app.service('requests');
    assert.ok(service, 'Registered the service');
    service.Model = db.collection('requests');
    assert.ok(service.Model, 'Requests can now be submitted.');
  });

  describe('Testing Work Request Endpoints', function() {
    it('DELETE /requests', function(done) {
      request(app)
        .delete('/requests/-1')
        .send()
        .expect(404)
        .end(async function (error, result) {
          if (error) {
            assert.ifError(error);
          }
          assert.deepEqual(result.statusCode, 404);
          done();
        });
    });

    it('GET /requests', function(done) {
      request(app)
        .get('/requests?$limit=1')
        .send()
        .expect(200)
        .end(function (error, result) {
          if (error) {
            assert.ifError(error);
          }
          let body = result.body;
          assert.strictEqual(body.limit, 1);
          done();
        });
    });
  });
});
