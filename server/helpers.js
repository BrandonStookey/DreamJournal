'use strict';

var db = require('./../db/db');
var moment = require ('moment');

//==============================================================Add New User to Database================================================================

var createNewUser = function(name, email, image, callback){
    console.log('createNewUser on helpers called!');
    console.log('helpers create user image: ', image);

    db.User.find({email: email}, function(err, user){
      if(err){
        console.log(err);
      }
      console.log('post on helpers create user: ', user[0].email);
      if(user[0].email == email){
        return callback(null, 200);
      }

    })

    console.log('callback: ', callback);
    var user = new db.User({
      email: email,    
      name: name,
      image: 'https://graph.facebook.com/' + image + '/picture?width=9999',
      friendList:{ 
        type: [{
          userEmail: email,
      }]},
    })
    .save(function(err, data) {
  ////Later check to see what your second parameter is sending back
  ////for example .save(function(err, INFO){}) Will be needed for testing purposes     
      if(err){
        console.log('createNewUser error', err);
        // return callback(err);
      } else {
        console.log('Added New User!');
        console.log('callback on createNewUser: ', callback);
        return callback(null, data);
      }
    });  
};

//===============================================================Add New Post To DataBase===========================================================================

var createPostDB = function (name, email, postTitle, post, dreamType, image, callback) {
    // var date = moment.utc().format('dddd, MMMM Do YYYY, h:mm:ss a');
    var date = new Date;
    var localTime = moment().format('llll');



    db.User.findOneAndUpdate( {email: email}, { $push: { post:  { postTitle : postTitle, post: post, name: name, email: email, postDate: localTime, dreamType: dreamType, image: 'https://graph.facebook.com/' + image + '/picture?width=9999' } } }, function(err, success) {
        if (err) {
          console.log('createPostDB error ', err);
          return callback(err);
        } else {
          console.log('Added New Post! ', success);
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
    postMap.reverse();
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
        postMap.unshift(post.post[i]);
      }
    });
    postMap.sort(function(p1, p2) {return p1.date - p2.date });
    postMap.reverse();    
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
  db.User.update({'post._id': postID}, {$set: { 'post.$.postTitle': postTitle, 'post.$.post': post, 'post.$.dreamType': dreamType }  }, function(err, model) {
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

    db.User.update( { 'post._id': postID }, { $push: { 'post.$.postComment': {  comment: userComment, userName: userName, commentDate: date } } }, function(err, success) {
        if (err) {
          console.log('comment on post error ', err);
          return callback(err);
        } else {
          console.log('Added New Comment! ', success);
          callback(null, 200);
        }   
    });
};

//=========================================================================Delete Single Comment=======================================================================

var deleteComment = function(postID, commentID, callback){
  console.log('helpers deleteComment postID ', postID);
  console.log('helpers deleteComment commentID ', commentID);
  console.log('deleteComment on helpers!');

  db.User.update({'post._id': postID}, { $pull: { 'post.$.postComment': { _id: commentID } } },{multi:true}, function(err, posts){
                    if(err){
                      console.log('delete single post error: ', err);
                      return callback(err);
                    }
                    console.log('deleteComment Posts: ', posts);
                    callback(null, 200);
                });


};

//=============================================================================Like Comment===============================================================================

var likeComment = function(postID, userEmail, userName, likeComment, callback){

    db.User.update( { 'post._id': postID }, { $push: { 'post.$.like': {  userEmail: userEmail, userName: userName, like: likeComment } } }, function(err, success) {
        if (err) {
          console.log('comment on post error ', err);
          return callback(err);
        } else {
          console.log('Added New Like! ', success);
          callback(null, 200);
        }   
    });


};

//==============================================================================Delete Like Comment======================================================================

var deleteLikeComment = function(postID, userEmail, likeComment, callback){
  console.log('deletelikeComment Helpers userEmail: ', userEmail);

  db.User.update({'post._id': postID }, { $pull: { 'post.$.like': {userEmail: userEmail } } },{multi:true}, function(err, posts){
      if(err){
        console.log('remove like error: ', err);
        return callback(err);
      }
      callback(null, 200);
  });
};

//====================================================================Follow User========================================================================

  var followUser = function(userEmail, otherUserEmail, callback){
      
    db.User.findOneAndUpdate( {email: userEmail}, { $push: { friendList:  { userEmail: otherUserEmail } } }, function(err, success) {
        if (err) {
          console.log('followUser error ', err);
          return callback(err);
        } else {
          console.log('Added a new friend! ', success);
          callback(null, 200);
        }   
    }); 

  };



  var deleteUserFromFriendsList = function(userEmail, otherUserEmail, callback){
    console.log('deleteUser from friends list on helpers!');
    console.log('deleteuser from freinds list helpers userEmail: ', userEmail);
    console.log('deleteuser from friends list helpers otehr userEmail:' , otherUserEmail);

    db.User.update({email: userEmail}, { $pull: { friendList: { userEmail: otherUserEmail } } },{multi:true}, function(err, posts){
                  if(err){
                    console.log('delete single USER from friends list error: ', err);
                    return callback(err);
                  }
                  callback(null, 200);
              });
  }; 

//=====================================================================Find all Friends Posts==================================================================================

var findAllFriendsPosts = function(userEmail, callback){
  var friends;
  console.log('userEmail: ', userEmail);  
  db.User.find({email: userEmail}, function(err, posts){
    if(err){
      console.log('findAllPosts Error ', err);
      return callback(err);
    }

    console.log('posts: on findallfrineds ', posts);

    if(posts.length > 0){
      friends = posts[0].friendList;
    }
  })

  db.User.find({}, function(err, posts){
    if(err){
      console.log('findAllPosts Error ', err);
      return callback(err);
    }
    // console.log('posts: ', posts);
    var postMap = [];
    if(friends !== undefined){
      for(var i = 0; i < posts.length; i++){
        for(var j = 0; j < friends.length; j++){

          if(friends[j].userEmail === undefined && j === friends.length + 1){
            break;
          }
          if(posts[i].email === friends[j].userEmail || posts[i].email === userEmail){
            console.log('one helpers looking at each post: ', posts[i].post);
              posts[i].post.forEach(function(post){
                postMap.unshift(post);
              });
            break;
          }
        }
      }
    }
    postMap.sort(function(p1, p2) {return p1.date - p2.date });
    postMap.reverse();
    callback(null, postMap);  
  });
};

//====================================================================Get User Like==========================================================================================




  var isUserFollowing = function(userEmail, otherUserEmail, callback){
    console.log('on isuserfollowing helpers!')
    db.User.find({}, function(err, posts){
    if(err){
      console.log('isUserFollowing Error ', err);
      return callback(err);
    }
      var postMap = [];
      for(var i = 0; i < posts.length; i++){
        for(var j = 0; j < posts.length; j++){
          if(posts[i].email === userEmail){
            posts[i].friendList.forEach(function(post){
              postMap.unshift(post);
            });
          }
        }
      }
      callback(null, postMap);
    });



  }

//   var getUserLike = function(postID, userEmail, callback){
//     console.log('working on helpers getUserLIke');

//      db.User.find( {'post._id': postID}, function(err, post){
//       if(err){
//         console.log('remove like error: ', err);
//         return callback(err);
//       } 
      
//       console.log('helpers getUserLike: ', post.post);

//       // for(var i = 0; i < post.post.like.length; i++){
//       //   if(post.like.userEmail === userEmail){
//       //     return callback(null, post);
//       //   }
//       // }

//       callback(null, post);
//   });
// };

//============================================================================Export all helpers=========================================================================

module.exports = {
  createNewUser: createNewUser,
	createPostDB: createPostDB,
  findAllPosts: findAllPosts,
  findAllUserPosts: findAllUserPosts,
  findSinglePost: findSinglePost,
  deleteSinglePost: deleteSinglePost,
  updateSinglePost: updateSinglePost,  
  findAllDreamsNightmares: findAllDreamsNightmares,
  createNewComment: createNewComment,
  deleteComment: deleteComment,
  likeComment: likeComment,
  deleteLikeComment: deleteLikeComment,
  followUser: followUser,
  deleteUserFromFriendsList: deleteUserFromFriendsList,
  findAllFriendsPosts: findAllFriendsPosts,
  isUserFollowing: isUserFollowing
  // getUserLike: getUserLike
};

