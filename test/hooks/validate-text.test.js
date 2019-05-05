/* eslint-disable no-console */
const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const validateText = require('../../src/hooks/validate-text');

describe('\'validateText\' hook', () => {
  let app;
  let requestorError = 'Requestor is invalid';
  let descriptionError = 'Description is invalid';
  let chargecodeError = 'Charge Code is invalid';
  let taskError = 'Tasks is invalid';

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async create(request) {
        return request;
      }
    });

    app.service('dummy').hooks({
      before: validateText()
    });
  });

  describe('runs the hook', async () => {
    let workRequest = {
      'requestor': 'John Doe',
      'chargecode': 1,
      'description': 'This is a description',
      'tasks': ['Do something'],
    };
    let result;

    it('Testing if hook allows for successful requests to go through', async () => {
      result = await app.service('dummy').create(workRequest);
      assert.deepEqual(result, workRequest);
    });
    /*
     * For the following tests, we will need a try catch statement to test
     * the branches of the validate-text hook. Essentially, the catch statement will catch the
     * error thrown by the hook on error and then assert if the message is what we expected.
     */
    it('Testing if hook errors on invalid requestor.', async () => {
      try {
        workRequest.requestor = '';
        result = await app.service('dummy').create(workRequest);
      } catch (error) {
        assert.equal(error.errors.requestor, requestorError);
      }
    });

    it('Testing if hook errors on invalid description.', async () => {
      try {
        workRequest.requestor = 'John Doe';
        workRequest.description = 1;
        result = await app.service('dummy').create(workRequest);
      } catch (error) {
        assert.equal(error.errors.description, descriptionError);
      }
    });

    it('Testing if hook errors on invalid charge code.', async () => {
      try {
        workRequest.tool = 'Tool A';
        workRequest.chargecode = null;
        result = await app.service('dummy').create(workRequest);
      } catch (error) {
        assert.equal(error.errors.chargecode, chargecodeError);
      }
    });

    it('Testing if hook errors on no task.', async () => {
      try {
        workRequest.chargecode = 1;
        workRequest.tasks = null;
        result = await app.service('dummy').create(workRequest);
      } catch (error) {
        assert.equal(error.errors.task, taskError);
      }
    });
  });
});
