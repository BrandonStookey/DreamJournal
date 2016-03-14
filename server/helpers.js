'use strict';

var db = require('./../db/db');

//==============================================================Add New User to Database================================================================

var createNewUser = function(name, email, callback){
    console.log('createNewUser on helpers called!');

    var user = new db.User({
      email: email,    
      name: name,
    })
    .save(function(err) {
  ////Later check to see what your second parameter is sending back
  ////for example .save(function(err, INFO){}) Will be needed for testing purposes     
      if(err){
        console.log('createNewUser error', err);
        callback(500);
      } else {
        console.log('Added New User!');
        callback(200);
      }
    });  
};

//===============================================================Add New Post To DataBase===========================================================================

var createPostDB = function (name, email, postTitle, post, callback) {

    db.User.findOneAndUpdate( {email: email}, { $push: { post:{postTitle: postTitle, post: post, name: name} } }, function(err, success) {
        if (err) {
          console.log('createPostDB/findOneAndUpdate error ', err);
          callback(500);
        } else {
          console.log('Added New Post!');
          callback(200);
        }   
    });
        
};

//========================================================================Get All Posts========================================================================
var findAllPosts = function(callback){
  db.User.find({}, function(err, posts){
    if(err){
      console.log('findAllPost Error ', err);
    }
    var postMap = [];

    posts.forEach(function(post) {
      console.log('post', post.post[0]);
      for(var i = 0; i < post.post.length; i++){
        if(post.post[i] === undefined){
          break;
        }
        postMap.push(post.post[i]);
        console.log('inside for loop ', post.post[i]);
      }
    });
    console.log(postMap);
    callback(postMap);  

  });
};

//============================================================================Export all helpers===========================================================

module.exports = {
  createNewUser: createNewUser,
	createPostDB: createPostDB,
  findAllPosts: findAllPosts
};







