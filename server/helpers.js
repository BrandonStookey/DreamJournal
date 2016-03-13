'use strict';

var db = require('./../db/db');

/////////////////////////////////////////Adds New Post To DataBase///////////////////////////////////////////////////////////////////

var createPostDB = function (name, email, postTitle, post, callback) {
//Check to See if the Email is already in the Database
  console.log('email on helpers ', email);

  var dbEmail = db.User.find({email: email}, function(err, found){
      if(err){
        return false;
      }
      else{
        console.log('found ', found[0].email);
          if( email === found[0].email){
            return true;
          };
      }
    });  

  console.log('dbEmail ', dbEmail);
//If Email is not in the Database then go ahead and add it
  if(dbEmail !== email){
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






////////Great Example how to export all functions from helpers//////////
module.exports = {
	createPostDB: createPostDB
};







