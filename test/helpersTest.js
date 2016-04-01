var chai = require('chai')
var expect = chai.expect;
var mongoose = require('mongoose');
var helpers = require('./../server/helpers.js');
var db = require('./../db/db');
var dbURI = 'mongodb://localhost/dreamjournal';

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
      var users = [
        {
          name: 'Alice',
          email: 'alice@alice.com',
          image:'https://gentwenty.com/wp-content/uploads/2014/02/Alice-in-Wonderland.jpg',
          post:[{
            image:'https://gentwenty.com/wp-content/uploads/2014/02/Alice-in-Wonderland.jpg',
            postTitle: 'Not the Real Alice',
            post: 'I am the real Alice',
            email: 'alice@alice.com',
            name: 'Alice'
          }]
        },               
        {
          name: 'White Rabbit',
          email: 'whiterabbit@whiterabbit.com',
          image: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=185171',
          post:[{
            image: 'http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=185171',
            postTitle: 'Running late',
            post: 'I am always running late!',
            email: 'whiterabbit@whiterabbit.com',
            name: 'White Rabbit'
          }]
        },
        {
          name: 'Queen of Hearts',
          email: 'hearts@hearts.com',
          image: 'http://vignette3.wikia.nocookie.net/disney/images/f/f5/OffWithHerHead-SW.png/revision/latest?cb=20160221131038',
          post:[{
            image: 'http://vignette3.wikia.nocookie.net/disney/images/f/f5/OffWithHerHead-SW.png/revision/latest?cb=20160221131038',
            postTitle: 'Headless',
            post: 'Off with their heads!',
            email: 'hearts@hearts.com',
            name: 'Queen of Hearts'
          }]
        },
        {
          name: 'Chesshire Cat',
          email: 'chesshire@chesshire.com',
          image: 'https://katzenworld.files.wordpress.com/2016/02/cheshire-cat-5.jpg',
          post:[{
            image: 'https://katzenworld.files.wordpress.com/2016/02/cheshire-cat-5.jpg',
            postTitle: 'Inspirational Quote',
            post: '“Alice asked the Cheshire Cat, who was sitting in a tree, “What road do I take?” The cat asked, “Where do you want to go?” “I don’t know,” Alice answered. “Then,” said the cat, “it really doesn’t matter, does it?”',
            email: 'chesshire@chesshire.com',
            name: 'Chesshire Cat'
          }]
        },
        {
          name: 'The Mad Hatter',
          email: 'hatter@hatter.com',
          image: 'http://images2.fanpop.com/image/photos/12700000/Awsome-painting-of-JOHNNY-DEPP-as-Madd-Hatter-from-Alice-and-Wonderland-by-artist-Justin-Pok-madhatter-alice-fanclub-12755902-1400-696.jpg',
          post:[{
            image: 'http://anitasnotebook.com/wp-content/uploads/2013/11/Mad-Hatter-True-Story-Disney.jpg',
            postTitle: 'I am a little mad',
            post: 'Have I gone made? I\'m afraid so, You\'re Entirely Bonkers. But I\'ll tell you a secrete. All the best People are.',
            email: 'hatter@hatter.com',
            name: 'The Mad Hatter'
          }]
        }
      ];

      // See http://mongoosejs.com/docs/models.html for details on the `create` method
      db.User.create(users, done);
    });
  });

//==============================================================Add New User to Database================================================================

  it('should create a new user', function (done) {
      helpers.createNewUser ('Caterpillar', 'caterpillar@caterpillar.com', 'https://s-media-cache-ak0.pinimg.com/736x/c2/1b/8d/c21b8dc05932594c10adca97cf08da52.jpg', function(err, result){
          if(err){
            console.log(err);
          }
          console.log('result')
          expect(result.name).to.equal('Caterpillar');
          done(); 
      });
  });
  

//========================================================================Get All Posts========================================================================

  it('should have a method that retrieves all posts from the database at once', function (done) {
      helpers.findAllPosts(function(err, result){
          if(err){
            console.log(err);
          }
          expect(result.length).to.equal(5);
          done(); 
      });
  });

//==========================================================================Find All User Posts=======================================================================

  it('should have a method that retrieves all posts from a single user', function (done) {
      helpers.findAllUserPosts('hatter@hatter.com',function(err, result){
          if(err){
            console.log(err);
          }
          expect(result.length).to.equal(1);
          done(); 
      });
  });

});

