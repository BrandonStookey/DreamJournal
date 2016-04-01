'use strict';

var db = require('./../db/db');
var moment = require ('moment');

//==============================================================Add New User to Database================================================================

var createNewUser = function(name, email, image, callback){
    var imageResult;
    if(image === undefined ){
      imageResult = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxQHERUTBxQSFhUWFxYbGRYYFBUaGRgbHxcdFiAYHxckHCgjJBonJxYZJj0lKCwsLi8zIx8zOjcvQys5LisBCgoKDA0ODgwNFCwZFBkrKysrKysrLCsrKysrKysrKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAGYAZgMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAAAwYHBQgBBAL/xAA7EAABAwIDBQUDCQkAAAAAAAABAAIDBREEEjEGByFBUSJhcYGRQpKxEzI0NVJyocHCFCUzYnOisrPR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDcUREBEVE3p7RGmwjD4U2fMDmI1bHofe08ig/LtbvGGFcYqDlcRwdKeLQejRz8dPFZ3j6xPUjfHSyP7i4293Rc66XVEl10abXsRTCDgppG29nMS33TwXKul0Gv7H7wW1RwhqwayQ8GvHzHnp3O/Aq9rzLmW07tNojWsOY8Wbyw2BPNzfZce/l5X5qC4oiICIiAiIgLCd5eLOJqMt/YysHk2/5lbsvPm3xtUsT/AFP0tQcS6XUd0uqJLpdR3S6CS6t+6vGHD1FjBpKyRp8mmQf4FUy6su7U/vTDeMv+iRBvqIigIiICIiAsB3lxmGpT355XerQt+WNb6qeYMVFO0dmWPKT/ADMP/HD0KDPsyZlHdLqiTMmZR3S6CTMrfupi+WqcRHsMld/YWfrVMutP3I0/PJPiHDg0CMHvPaPwaoNbREQEREBERAXC2z2dbtLhXQuIDx2o3dHjTyOh8V3UQeW6pT5aTK6GoMLHt1B+IPMHqvy3W2b5qOzFYMYiwEkLgA7q1xsWnu0Kw+6Kkul1HdLoOjR6XLWpmw05pc93oBzcTyaOq9E7J0JuzmFZBCbkXL3faeeJP5DuAVU3K0tuHwRxFu3M94v0ax2QD1DitDRBERAREQEXD2q2qw+y8YfUndp18kbeL326Dp3ngslrG+DGYpxFLZFCzldud/mT2fK3mg3ZfxNM2BpdO5rWjiS4gADqSV5yl3j1KTXEuHgyMfBq4dTreIq31lNLJ3OcSPd0QaHvU28jq7P2SikPjuDJKNHW0a3qOd9NLLMsyjul0VJmTMo7pdBqG6jbmKjtOErDgyMuLo5D81pOrXHkCeN+VzdbPFK2YB0JDgdCCCD5ryRddGl17E0n6tnljHRrjb3dEHqlF5xi3k1KO1sSTbrHEf0qybP745oXBtfjZIzm+MFrx3ltyD5WRG1IvxUiqxVqJs1Me18btCOuhBHIjoUQeZdrK6/aLFyTzkkFxDB9lgPZHpx8brkXVy293fz7OyvfgmOkwziS17RmMYv8x414ddCqQHX0RUt0uosyZkEt0uosyZkEt0uosyZkEt0uosyZkEt0uosy/uGN2IcGQNc5x0a0Ek+ACC5budtTspJIJ7uhe35g5PBFnDyzA+S+qybAbqnYprpdq2OYCLMhvZ+o7braacB38UQbQRfVVeubvafWyXYvDta8+3GXRuv1OUgHzBX1ERT6huRhfc07Eys6B7WuHqLFV3G7l8XB9HxGGf8AeEjPgHIiCp1PY/EUv6U6A/de893Ng6LgyN+TJDuS+Iivl1+vAU9+O/glou4DiSOPoeqIirTSt2WMqYvC/Cgd8kt/T5Lu6qy4HcjK+xxuLjA6MjcT6kj4IiIsdO3MYGD6c+ebuz5AfdsfxV2ouzuFoQtSYIo+8N7R8XntE+JXxER1UREH/9k=';
    } else {
      imageResult = 'https://graph.facebook.com/' + image + '/picture?width=9999';
    }

    var user = new db.User({
      email: email,    
      name: name,
      image: imageResult,
      friendList:{ 
        type: [{
          userEmail: email,
      }]},
    })
    .save(function(err, data) {
      if(err){
        console.log('createNewUser error', err);
        // return callback(err);
      } else {
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
          return callback(err);
        } else {
          callback(null, 200);
        }   
    });
        
};


//========================================================================Get All Posts========================================================================

var findAllPosts = function(callback){
  db.User.find({}, function(err, posts){
    if(err){
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
  // http://tech-blog.maddyzone.com/node/add-update-delete-object-array-schema-mongoosemongodb <-----Might be my answer 
  db.User.update({'post._id': postID}, {$set: { 'post.$.postTitle': postTitle, 'post.$.post': post, 'post.$.dreamType': dreamType }  }, function(err, model) {
      if(err){
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

    var date = moment().format('llll');

    db.User.update( { 'post._id': postID }, { $push: { 'post.$.postComment': {  comment: userComment, userName: userName, commentDate: date } } }, function(err, success) {
        if (err) {
          return callback(err);
        } else {
          callback(null, 200);
        }   
    });
};

//=========================================================================Delete Single Comment=======================================================================

var deleteComment = function(postID, commentID, callback){

  db.User.update({'post._id': postID}, { $pull: { 'post.$.postComment': { _id: commentID } } },{multi:true}, function(err, posts){
                    if(err){
                      return callback(err);
                    }
                    callback(null, 200);
                });


};

//=============================================================================Like Comment===============================================================================

var likeComment = function(postID, userEmail, userName, likeComment, callback){

    db.User.update( { 'post._id': postID }, { $push: { 'post.$.like': {  userEmail: userEmail, userName: userName, like: likeComment } } }, function(err, success) {
        if (err) {
          return callback(err);
        } else {
          callback(null, 200);
        }   
    });


};

//==============================================================================Delete Like Comment======================================================================

var deleteLikeComment = function(postID, userEmail, likeComment, callback){

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
  db.User.find({email: userEmail}, function(err, posts){
    if(err){
      return callback(err);
    }

    if(posts.length > 0){
      friends = posts[0].friendList;
    }
  })

  db.User.find({}, function(err, posts){
    if(err){
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

    db.User.find({}, function(err, posts){
    if(err){
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

