// var chai = require('chai')
// var expect = chai.expect;
// var mongoose = require('mongoose');
// var helpers = require('./../server/helpers.js');
// var db = require('./../db/db');
// var dbURI = 'mongodb://localhost/jobquery';

// var clearDB = function (done) {
//   mongoose.connection.collections['users'].remove(done);
// };

// describe('User Controller', function () {

//   // Connect to database before any tests
//   before(function (done) {
//     if (mongoose.connection.db) {
//       return done();
//     }
//     mongoose.connect(dbURI, done);
//   });

//   // Clear database before each test and then seed it with example `users` so that you can run tests
// beforeEach(function (done) {
//     clearDB(function () {
//       var users = [
//         {
//           name: 'Alice',
//           email: 'alice@alice.com',
//           post:[{
//             postTitle: 'Not the Real Alice',
//             post: 'I am the real Alice',
//             name: 'Alice'
//           }]
//         },
//         {
//           name: 'White Rabbit',
//           email: 'whiterabbit@whiterabbit.com',
//           post:[{
//             postTitle: 'Running late',
//             post: 'I am always running late!',
//             name: 'White Rabbit'
//           }]
//         },
//         {
//           name: 'Queen of Hearts',
//           email: 'hearts@hearts.com',
//           post:[{
//             postTitle: 'Headless',
//             post: 'Off with their heads!',
//             name: 'Queen of Hearts'
//           }]
//         },
//         {
//           name: 'Chesshire Cat',
//           email: 'chesshire@chesshire.com',
//           post:[{
//             postTitle: 'Inspirational Quote',
//             post: '“Alice asked the Cheshire Cat, who was sitting in a tree, “What road do I take?” The cat asked, “Where do you want to go?” “I don’t know,” Alice answered. “Then,” said the cat, “it really doesn’t matter, does it?”',
//             name: 'Chesshire Cat'
//           }]
//         },
//         {
//           name: 'The Mad Hatter',
//           email: 'hatter@hatter.com',
//           post:[{
//             postTitle: 'I am a little mad',
//             post: 'Have I gone made? I\'m afraid so, You\'re Entirely Bonkers. But I\'ll tell you a secrete. All the best People are.',
//             name: 'The Mad Hatter'
//           }]
//         }
//       ];

//       // See http://mongoosejs.com/docs/models.html for details on the `create` method
//       db.User.create(users, done);
//     });
//   });

// //==============================================================Add New User to Database================================================================

//   it('should create a new user', function (done) {
//       helpers.createNewUser ('Jason', 'jason@jason.com',function(err, result){
//           if(err){
//             console.log(err);
//           }
//           console.log('result')
//           expect(result.name).to.equal('Jason');
//           done(); 
//       });
//   });
  

// //========================================================================Get All Posts========================================================================

//   it('should have a method that retrieves all posts from the database at once', function (done) {
//       helpers.findAllPosts(function(err, result){
//           if(err){
//             console.log(err);
//           }
//           expect(result.length).to.equal(5);
//           done(); 
//       });
//   });

// //==========================================================================Find All User Posts=======================================================================

//   it('should have a method that retrieves all posts from a single user', function (done) {
//       helpers.findAllUserPosts('hatter@hatter.com',function(err, result){
//           if(err){
//             console.log(err);
//           }
//           expect(result.length).to.equal(1);
//           done(); 
//       });
//   });

// });

