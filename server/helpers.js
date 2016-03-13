'use strict';

var db = require('./../db/db');

/////////////////////////////////////////Adds New Post To DataBase///////////////////////////////////////////////////////////////////

var createPostDB = function (name, email, postTitle, post, callback) {
//Check to See if the Email is already in the Database
  var dbEmail = db.User.find({email: email}, function(err, found){
      if(err){
        return undefined;
      }
      else{
        return found;
      }
    });  
//If Email is not in the Database then go ahead and add it, along with the post info and name
  if(dbEmail === undefined){
    var user = new db.User({
      email: email,    
      name: name,
      post: {
      	postTitle: postTitle,
      	post: post
      }
    })
    .save(function(err) {
  ////Later check to see what your second parameter is sending back
  ////for example .save(function(err, INFO){})      
      if(err){
        console.log('ERROR!', err);
        callback(500);
      } else {
        console.log('Added New User and New Post!');
        callback(200);
      }
    });
  } else {
  //Otherwise, if the email is already in the database, then only add the new post
    db.User.findOneAndUpdate( {email: email}, { $push: { post:{postTitle: postTitle, post: post} } }, function(err, success) {
        if (err) {
          console.log('error ', err);
          callback(500);
        } else {
          console.log('Added New Post!')
          callback(200);
        }   
    });
  }          
};






////////Export all helpers//////////
module.exports = {
	createPostDB: createPostDB
};







