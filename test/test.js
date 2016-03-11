var expect = require('chai').expect;
var mongoose = require('mongoose');

var jobController = require('./jobController.js');
var dbURI = 'mongodb://localhost/jobquery';

var clearDB = function (done) {
  mongoose.connection.collections['jobs'].remove(done);
};

describe('Job Controller', function () {

  // Connect to database before any tests
    beforeEach(function (done) {
    clearDB(function () {
      // TODO: Seed database with some jobs to run tests against. You should use the controller you created to add these jobs to the database
      
      var user = {

      }

      jobController.createJob(job, function(result){
        expect(result).to.equal('New Job Saved');
        done(); 
      });
  
        // TODO

    });
  });


}