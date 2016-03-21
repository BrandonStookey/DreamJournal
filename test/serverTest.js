var chai = require('chai')
var app = require('./../server/server');
var expect = chai.expect;
var request = require('supertest');
var helpers = require('./../server/helpers.js');
// I think this will solve my problem
// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/


describe(' ', function () {

  beforeEach(function() {
    
  });

//================================================================Test Add New User To Database=====================================================================

describe('http://localhost:4568/create/new/user', function () {
    describe('POST', function () {
 
      var newUser = {
        name: 'Josh',
        email: 'josh@josh.io'
      };    
      it('responds with a 200 (ok) when a user is created', function (done) {

        request(app)
          .post('/create/new/user')
          .send(newUser)
          .expect(201, done);
      });
  	});
  });

//==================================================================Test Get all Posts Request===================================================================
  describe('http://localhost:4568/get/all/posts', function () {
    
    describe('GET', function () {
    
      it('Retrieve all posts, responds with a 200 (OK)', function (done) {
        request(app)
          .get('/get/all/posts')
          .expect(200, done);
      });
    });
  });


//======================================================================Test Get all User Posts========================================================================

describe('http://localhost:4568/get/all/user/posts', function () {
 
    describe('POST', function () {
  
      it('Retrieves all posts from a single user, responds with a 200 (OK)', function (done) {
        request(app)
          .post('/get/all/user/posts')
          .send('hatter@hatter.com')
          .expect(200, done);
      });
  	});
  });
});

