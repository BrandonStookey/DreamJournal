// var expect = require('chai').expect;
// var mongoose = require('mongoose');
// var Job = require('../models/Job');    ////////////I added this here, since user/model was being require in the usercontroller test
// var dbURI = 'mongodb://localhost/jobquery';

// // The `clearDB` helper function, when invoked, will clear the database
// var clearDB = function (done) {
//   mongoose.connection.collections['jobs'].remove(done);
// };

// describe('Job Controller', function () {

//   // Connect to database before any tests
//   before(function (done) {
//     if (mongoose.connection.db) {
//       return done();
//     }
//     mongoose.connect(dbURI, done);
//   });

//   beforeEach(function (done) {
//     clearDB(function () {
//       // TODO: Seed database with some jobs to run tests against. You should use the controller you created to add these jobs to the database
//       var createJob = function (job, callback) {
//         // TODO

//         var job = new Job({
//           name: name,
//           title: title,
//           description: description,
//           datePosted: datePosted,
//           salary: salary
//         });

//          Job.save(function(err, newJob) {
//           if(err){
//             res.send(500, err);
//           } else {
//             res.send(200, newJob);
//           }
//         });
//       };
//     });
//   });
// ///////////////////
// ////////I tried mimicking the tests in rest-api
// ///////////
//   // TODO: Write your tests for jobController here
//     it('should have a method that adds a new job to the database', function (done) {
//           request(Job) //I am not 100% sure what is suppose to go here, but I think it is Job since it is being required at the top,
//           .get(dbURI)
//           .expect(200, done);
//   });
// });





