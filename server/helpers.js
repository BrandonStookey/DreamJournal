'use strict';

var database = require('./../db/db.js');
var dbConfig = require('./../db/config');

var createPost = function (name, email, postTitle, post, success, fail) {
	console.log('createPost on controller side!');
  var user = new User({
    name: name,
    email: email,
    post: {
    	postTitle: postTitle,
    	post: post
    }
  });

   User.save(function(err, newUser) {
    if(err){
      res.send(500, err);
    } else {
      res.send(200, newUser);
    }
  });
};






////////Great Example how to export all functions from helpers//////////
module.exports = {
	createPost: createPost
};