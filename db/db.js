'use strict';

var db = require('./config.js');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
  },  
  post: {
    type: [{
      postTitle: String,
      postDate: Date,
      post: String,
      name: String,
      dream: String,
      nightmare: String,
      noDream: String

    }]
  },
});

var User = mongoose.model('User', userSchema);


module.exports.User = User;







