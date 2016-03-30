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

describe('http://localhost:4568/user', function () {
    describe('POST', function () {
 
      var newUser = {
        name: 'Caterpillar',
        email: 'caterpillar@caterpillar.com',
        image: 'https://s-media-cache-ak0.pinimg.com/736x/c2/1b/8d/c21b8dc05932594c10adca97cf08da52.jpg'
      };    
      it('responds with a 201 (ok) when a user is created', function (done) {

        request(app)
          .post('/user')
          .send(newUser)
          .expect(200, done);
      });
  	});
  });

//==================================================================Test Get all Posts Request===================================================================
  describe('http://localhost:4568/post', function () {
    
    describe('GET', function () {
    
      it('Retrieve all posts, responds with a 200 (OK)', function (done) {
        request(app)
          .get('/post')
          .expect(200, done);
      });
    });
  });


//======================================================================Test Get all User Posts========================================================================

describe('http://localhost:4568/user/:email', function () {
 
    describe('POST', function () {
  
      it('Retrieves all posts from a single user, responds with a 200 (OK)', function (done) {
        request(app)
          .get('/user/:email')
          .send('hatter@hatter.com')
          .expect(200, done);
      });
  	});
  });
});

