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
    type: [{
      postTitle: String,
      postDate: Date,
      post: String,
      dream: String,
      nightmare: String,
      noDream: String

    }]
  },
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







