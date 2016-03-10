'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');

var mongoURI = process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/dreamjournal';

mongoose.connect(mongoURI, function(err, res) {
  if (err) {
    console.error('Error on Mongo connect:', err);
    return;
  } else {
    console.log('Successfully connected to db');
  }
});

mongoose.connection.once('open', function() {
  console.log('MongoDB Connection Open');
});

var userSchema = mongoose.Schema({
	firstName: {
    type: String,
    unique: false,
    required: true
  },
  lastName:  {
    type: String,
    unique: false,
    required: true
  },
  userName: { //use email for login instead of a specific username
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  post: {
    type: Array
    //It will store messages in an array, an array of string
      //storing an array of objects
      //array of posts
        //blog title, post title, date, post itself
    //Somehow include date if I want to order it by date
  },
  dreams:{
  	type: Number
    //PLACED DREAMS, NIGHTMARE and NODREAMS as a post on POST
    //How can I store objects into an array in mongo 
    //What if I wanted it to be a nightMare
      //might be better to have
      //type on the post
      //a type can be number,0 will be a dream, 1 can be dreams, 2 nightMare
        //user can change it on the post
        //a query can be used to look for posts that are dreams, nightMare or no dreams

  },
  nightMares:{
  	type: Number
  },
  noDreams:{
  	type: Number
  }
});

var User = mongoose.model('User', userSchema);

// Password checking function:
User.comparePassword = function(candidatePassword, savedPassword, callback) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};

// Password hashing function:
userSchema.pre('save', function(next){
  var cipher = bluebird.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash){
      this.password = hash;
      next();
    });
});

module.exports.User = User;







