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
      postDate: String,
      post: String,
      name: String,
      email: String,
      dreamType: Number, //0 === noDream , 1 === Dream, 2 === nightMare
    }]
  },
});

var User = mongoose.model('User', userSchema);


module.exports.User = User;







