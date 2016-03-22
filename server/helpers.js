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
    .save(function(err, data) {
  ////Later check to see what your second parameter is sending back
  ////for example .save(function(err, INFO){}) Will be needed for testing purposes     
      if(err){
        console.log('createNewUser error', err);
        // return callback(err);
      } else {
        console.log('Added New User!');
        callback(null, data);
      }
    });  
};

//===============================================================Add New Post To DataBase===========================================================================

var createPostDB = function (name, email, postTitle, post, dreamType, callback) {
    var date = moment().format('llll');
    console.log('createPostDB Date', date);

    db.User.findOneAndUpdate( {email: email}, { $push: { post: { postTitle: postTitle, post: post, name: name, postDate: date, dreamType: dreamType } } }, function(err, success) {
        if (err) {
          console.log('createPostDB error ', err);
          return callback(err);
        } else {
          console.log('Added New Post!');
          callback(null, 200);
        }   
    });
        
};

//========================================================================Get All Posts========================================================================

var findAllPosts = function(callback){
  db.User.find({}, function(err, posts){
    if(err){
      console.log('findAllPosts Error ', err);
      return callback(err);
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

    callback(null, postMap);  
  });
};

//==========================================================================Find All User Posts=======================================================================

var findAllUserPosts = function(email, callback){
  db.User.find({ email: email }, function(err, posts){

    if(err){
      console.log('findAllUserPosts Error ', err);
      return callback(err);
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

    callback(null, postMap);  
  });
};

//==============================================================================Find Single Post=================================================================

var findSinglePost = function(postID, callback){

  db.User.find({}, function(err, posts){
    if(err){
      console.log('findSinglePost Error ', err);
      return callback(err);
    }   
    
    posts.forEach(function(post) {
      for(var i = 0; i < post.post.length; i++){
        if(post.post[i] === undefined){
          break;
        }

        if(post.post[i]._id == postID){
          callback(null, post.post[i]);
          break;
        }  
      }
    });
  });   

};

//==========================================================================Delete Single Post================================================================

var deleteSinglePost = function(postID, callback){
  console.log('helpers delete SINGLE post request!'); 
  // console.log('helpers postTitle ', postTitle);
  db.User.update({}, 
                { $pull: { post: { _id: postID } } },{multi:true}, function(err, posts){
                    if(err){
                      console.log('delete single post error: ', err);
                      return callback(err);
                    }
                    callback(null, 200);
                });
};

//=============================================================================Update Single Post===========================================================

var updateSinglePost = function(email, postID, postTitle, post, dreamType, callback){
  console.log('helpers update SINGLE post request!'); 
  console.log('postID ', postID);
  // http://tech-blog.maddyzone.com/node/add-update-delete-object-array-schema-mongoosemongodb <-----Might be my answer 
  db.User.update({'post._id': postID}, {$set: { 'post.$.postTitle': postTitle, 'post.$.post': post, 'dream.$.dreamType': dreamType }  }, function(err, model) {
      if(err){
          console.log(err);
          return callback(err);
        }
        callback(null, model);
      });
};

//========================================================================Get all Dreams and all Nightmares for Graph==============================================

var findAllDreamsNightmares = function(email, dreamType, callback){
  console.log('helpers for graph being called!');   
  db.User.find({ email: email }, function(err, posts){

    if(err){
      console.log('findAllUserPosts Error ', err);
      callback(err);
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

    callback(null, postMap);  
  });
};


//===================================================================Create new comment========================================================================

var createNewComment = function(postID, userName, userComment, callback){
  console.log('createNewComment on Helpers!');
  console.log('allDataOnHelpers: ', postID, userName, userComment, callback);

    var date = moment().format('llll');

    db.User.findOneAndUpdate( { 'post._id' : postID} , { $push: { post: { comment: {  comment: userComment, userName: userName, commentDate: date } } } }, function(err, success) {
        if (err) {
          console.log('comment on post error ', err);
          return callback(err);
        } else {
          console.log('Added New Comment! ', success);
          callback(null, 200);
        }   
    });


}


//============================================================================Export all helpers===========================================================

module.exports = {
  createNewUser: createNewUser,
	createPostDB: createPostDB,
  findAllPosts: findAllPosts,
  findAllUserPosts: findAllUserPosts,
  findSinglePost: findSinglePost,
  deleteSinglePost: deleteSinglePost,
  updateSinglePost: updateSinglePost,  
  findAllDreamsNightmares: findAllDreamsNightmares,
  createNewComment: createNewComment
};

