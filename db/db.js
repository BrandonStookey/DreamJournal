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
  date: { type: Date, default: Date.now },   
  post: {
    type: [{
      postTitle: String,
      postDate: String,
      post: String,
      name: String,
      email: String,
      dreamType: String,
      date: { type: Date, default: Date.now },
      comment: { 
        type: [{
        commentDate: String,  
        userName: String,
        comment: String,
        date: { type: Date, default: Date.now }
      }]},
      like: { 
        type: [{
          userName: String,
          like: Boolean,
          date: { type: Date, default: Date.now }
      }]},
    }],
  },
  friendList:{ 
    type: [{
      userEmail: String
    }]},
});


var User = mongoose.model('User', userSchema);


module.exports.User = User;






