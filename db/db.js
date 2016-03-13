'use strict';

var db = require('./config.js');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
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


module.exports.User = User;







