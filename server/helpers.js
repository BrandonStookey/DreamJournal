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
        console.log(500);
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
          console.log('createPostDB error ', err);
           console.log(500);
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
      console.log('findAllPosts Error ', err);
       callback(err);
    }
    var postMap = [];

    posts.forEach(function(post) {
      for(var i = 0; i < post.post.length; i++){
        if(post.post[i] === undefined){
          break;
        }
        postMap.push(post.post[i]);
      }
    });

    callback(postMap);  
  });
};

//==========================================================================Find All User Posts=======================================================================

var findAllUserPosts = function(email, callback){
  db.User.find({ email: email }, function(err, posts){

    if(err){
      console.log('findAllUserPosts Error ', err);
       console.log(404);
    }

    var postMap = [];

    posts.forEach(function(post) {
      for(var i = 0; i < post.post.length; i++){
        if(post.post[i] === undefined){
          break;
        }
        postMap.push(post.post[i]);
      }
    });

    callback(postMap);  
  });
};

//==============================================================================Find Single Post=================================================================

var findSinglePost = function(postID, callback){

  db.User.find({}, function(err, posts){
    if(err){
      console.log('findSinglePost Error ', err);
       console.log(404);
    }   
    
    posts.forEach(function(post) {
      for(var i = 0; i < post.post.length; i++){
        if(post.post[i] === undefined){
          break;
        }

        if(post.post[i]._id == postID){
          callback(post.post[i]);
          break;
        }  
      }
    });
  });   

};

//==========================================================================Delete Single Post================================================================

var deleteSinglePost = function(postID, callback){
  console.log('helpers delete SINGLE post request!'); 

   db.User.find({}, function(err, posts){
    if(err){
      console.log('deleteSinglePost Error ', err);
       console.log(404);
    }   
    
    posts.forEach(function(post) {
      for(var i = 0; i < post.post.length; i++){
        if(post.post[i] === undefined){
          break;
        }

        if(post.post[i]._id == postID){
          console.log('helpers !! posts', post.post[i]);
          console.log('inside if, inside for loop');
          post.post[i].remove(function(err){
            if(err){
              console.log('deleteSinglePost error', err);
            }
            console.log('Post Deleted!');
            // callback('Post Deleted');
          })
        }  
      }
    });
  });   
};

//============================================================================Export all helpers===========================================================

module.exports = {
  createNewUser: createNewUser,
	createPostDB: createPostDB,
  findAllPosts: findAllPosts,
  findAllUserPosts: findAllUserPosts,
  findSinglePost: findSinglePost,
  deleteSinglePost: deleteSinglePost
};







