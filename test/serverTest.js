var express = require('express');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var app = require('../server/server.js');

var helpers = require('../server/helpers.js');

var db = require('../db/config');

var User = require('../db/db');

var dbURI = 'mongodb://localhost/jobquery';

var clearDB = function (done) {
  mongoose.connection.collections['users'].remove(done);
};

describe('User Controller', function () {

  // Connect to database before any tests
  before(function (done) {
    if (mongoose.connection.db) {
      return done();
    }
    mongoose.connect(dbURI, done);
  });

  // Clear database before each test and then seed it with example `users` so that you can run tests
  beforeEach(function (done) {
    clearDB(function () {
      // See http://mongoosejs.com/docs/models.html for details on the `create` method
      helpers.createNewUser('Magee','magee@magee.com', done);
    });
  });


  it('should have a method that given the name of a user, retrieves their record from the database', function (done) {
    // TODO: Write test(s) for a method exported by `userController` that behaves as described one line above
        helpers.findSinglePost('magee@magee.com', function(result){
        	console.log('result ', result);
          expect(result.email).to.equal('{email: magee@magee.com}');
        });
        done();
  });

  // it('should have a method that given the name of a user, updates their `email` property', function (done) {
  //   // TODO: Write test(s) for a method exported by `userController` that behaves as described one line above
  //   // HINT: The `done` passed in is quite important...
  //       // userController.updateEmailByName('Zach', 'ZachsNewEmail@zach.com');
  //       //   done(); 
  //       userController.updateEmailByName('Zach', 'ZachsNewEmail@zach.com',function(result){
  //         expect(result).to.equal('User successfully updated!');
  //         done(); 
  //     });
  // });

  // it('should have a method that reads all users from the database at once', function (done) {
  //   // TODO: Write test(s) for a method exported by `userController` that behaves as described one line above
  //     userController.readAllUsers(function(result){
  //         expect(result.length).to.equal(5);
  //         done(); 
  //     });
  // });
});

