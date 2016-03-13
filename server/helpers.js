'use strict';

var db = require('./../db/db');

var createPostDB = function (name, email, postTitle, post, callback) {
	console.log('createPost on helpers side! side!');
  console.log('helpers name ', name);
  console.log('helpers email ', email);
  console.log('helpers postTitle ', postTitle);            
  console.log('helpers post ', post);


  var user = new db.User({
    name: name,
    email: email,
    post: {
    	postTitle: postTitle,
    	post: post
    }
  })
  .save(function(err) {
    if(err){
      console.log('ERROR!', err);
      callback(500);
    } else {
      console.log('SUCCESS!');
      callback(200);
    }
  });
  /////Later check to see what your second parameter is sending back
  //for example .save(function(err, INFO){})
};






////////Great Example how to export all functions from helpers//////////
module.exports = {
	createPostDB: createPostDB
};