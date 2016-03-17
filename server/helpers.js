'use strict';

var db = require('./../db/db');
var moment = require ('moment');

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

var createPostDB = function (name, email, postTitle, post, dreamType, callback) {
    var date = moment().format('llll');
    console.log('createPostDB Date', date);

    db.User.findOneAndUpdate( {email: email}, { $push: { post:{ postTitle: postTitle, post: post, name: name, postDate: date, dreamType: dreamType } } }, function(err, success) {
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
        postMap.unshift(post.post[i]);
      }
    });
    postMap.sort(function(p1, p2) {return p1.date - p2.date });

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

var deleteSinglePost = function(postTitle, callback){
  console.log('helpers delete SINGLE post request!'); 
  console.log('helpers postTitle ', postTitle);
  db.User.update({}, 
                { $pull: { post: { postTitle: postTitle } } },{multi:true}, function(err, posts){
                  console.log('helpers error ', err);
                  console.log('helpers posts ', posts);
                });
    callback(200);
};

//========================================================================Get all Dreams and all Nightmares for Graph==============================================

var findAllDreamsNightmares = function(email, dreamType, callback){
  console.log('helpers for graph being called!');   
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
        if(post.post[i].dreamType === dreamType){
          postMap.push(post.post[i]);
        }
      }
    });

    callback(postMap);  
  });
};

//============================================================================Export all helpers===========================================================

module.exports = {
  createNewUser: createNewUser,
	createPostDB: createPostDB,
  findAllPosts: findAllPosts,
  findAllUserPosts: findAllUserPosts,
  findSinglePost: findSinglePost,
  deleteSinglePost: deleteSinglePost,
  findAllDreamsNightmares: findAllDreamsNightmares  
};

