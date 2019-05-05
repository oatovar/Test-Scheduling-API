const assert = require('assert');
const request = require('supertest');
const app = require('../src/app');
const port = app.get('port') || 3030;

describe('Testing out the custom verifier', function() {
  this.slow(3000);

  before(function(done) {
    this.server = app.listen(port);
    this.server.once('listening', () => {
      done();
    });
  });

  after(function(done) {
    this.server.close(done);
  });

  it('Making sure that a valid password works', () => {
    request(app)
      .post('/authentication')
      .send({
        'strategy': 'local',
        'uid': 'jjones',
        'userPassword': 'password',
      })
      .expect(200)
      .end(async function (error, result) {
        assert.deepEqual(result.statusCode, 200);
      });
  });

  it('Making sure that an invalid password returns an error', () => {
    request(app)
      .post('/authentication')
      .send({
        'strategy': 'local',
        'uid': 'jjones',
        'userPassword': 'passwordd',
      })
      .expect(401)
      .end(async function (error, result) {
        assert.deepEqual(result.statusCode, 401);
      });
  });
});