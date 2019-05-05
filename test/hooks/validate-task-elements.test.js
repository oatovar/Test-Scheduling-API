/* eslint-disable no-console */
const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const validateTaskElement = require('../../src/hooks/validate-task-elements');

describe('\'validateTaskElements\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();
    
    app.use('/dummy', {
      async create(request) {
        return request;
      }
    });
    
    app.service('dummy').hooks({
      before: validateTaskElement()
    });
  });

  describe('runs the hook', async () => {
    let taskRequest = {
      'taskid': '0123c',
      'testresource': 'Need something',
      'startdate': new Date(),
      'enddate': new Date(),
      'schedule': '4 days',
      'testdata': 'must do something',
      'testlog': 'begin at 2/15/2019',
      'link': 'www.test.com'
    };

    let result;

    it('Testing if hook allows for successful requests to go through', async () => {
      try {
        result = await app.service('dummy').create(taskRequest);
        assert.deepEqual(result, taskRequest);
      } catch (error) {
        console.log(error.errors);
      }
    });

    it('Testing if hook errors on invalid taskId.', async () => {
      try {
        taskRequest.taskid = '';
        result = await app.service('dummy').create(taskRequest);
      } catch (error) {
        assert.equal(error.errors.taskid, 'TaskId is invalid');
      }
    });

    it('Testing if hook errors on invalid test resource.', async () => {
      try {
        taskRequest.taskid = '0123c';
        taskRequest.testresource = 1;
        result = await app.service('dummy').create(taskRequest);
      } catch (error) {
        assert.equal(error.errors.testresource, 'Test resource is invalid');
      }
    });

    it('Testing if hook errors on invalid startdate.', async () => {
      try {
        taskRequest.testresource = 'Need something';
        taskRequest.startdate = 2;
        result = await app.service('dummy').create(taskRequest);
      } catch (error) {
        assert.equal(error.errors.startdate, 'Start date must be a timestamp');
      }
    });

    it('Testing if hook errors on invalid enddate.', async () => {
      try {
        taskRequest.startdate = 2/15/2019;
        taskRequest.enddate = 'xyz';
        result = await app.service('dummy').create(taskRequest);
      } catch (error) {
        assert.equal(error.errors.enddate, 'End date must be a timestamp');
      }
    });

    it('Testing if hook errors on invalid schedule.', async () => {
      try {
        taskRequest.enddate = 2/15/2019;
        taskRequest.schedule = 1;
        result = await app.service('dummy').create(taskRequest);
      } catch (error) {
        assert.equal(error.errors.schedule, 'Schedule is invalid');
      }
    });

    it('Testing if hook errors on invalid test data.', async () => {
      try {
        taskRequest.schedule = '4 days';
        taskRequest.testdata = '';
        result = await app.service('dummy').create(taskRequest);
      } catch (error) {
        assert.equal(error.errors.testdata, 'Test data is invalid');
      }
    });

    it('Testing if hook errors on invalid test log.', async () => {
      try {
        taskRequest.testdata = 'must do something';
        taskRequest.testlog = 1;
        result = await app.service('dummy').create(taskRequest);
      } catch (error) {
        assert.equal(error.errors.testlog, 'Test log is invalid');
      }
    });

    it('Testing if hook errors on invalid links.', async () => {
      try {
        taskRequest.testlog = 'begin at 2/15/2019';
        taskRequest.link = '';
        result = await app.service('dummy').create(taskRequest);
      } catch (error) {
        assert.equal(error.errors.link, 'Link is invalid');
      }
    });
  });
});





