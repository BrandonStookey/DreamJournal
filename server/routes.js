'use strict';

var app = require('./server');
var path1 = require('path');
var public1 = path1.resolve('public') + '/';
var helpers = require(path1.resolve('server/helpers'));
var url = require('url');
var jwt = require('express-jwt');

//Below is the ClientID and ClientSecret in express-jwt's configuration so that it can validate and sign JWTs for you
var jwtCheck = jwt({
  secret: new Buffer('H8Ak4IV8GXTBGOwT-syXyq0veCOixjcNgHkBxm_nOKaMeQoXG11u0DK6lHr-9N2I', 'base64'),
  audience: '1lZ3sYfpkqI5yJkeFXYscvLsR7dnG7q2'
});

//Below are paths that require Authorization
app.use(['/api/public/client/app/shared/home.view.html', '/api/public/client/app/shared/write.new.post.view.html', '/api/public/client/app/shared/view.post.view.html', '/api/public/client/app/shared/profile.view.html', '/api/public/client/app/shared/graph.view.html'],  jwtCheck);

//================================================================Add New User To Database=====================================================================
//    /user
app.post('/create/new/user', function(req, res) {
  var userName = req.body.name;
  var userEmail = req.body.email;     
 
  helpers.createNewUser(userName, userEmail,
  function(err, data) {  
    if(err){
      res.status(400).send(err);
    }
    res.status(201).send(data);
  });
});

//================================================================Add New Post to Database===================================================================

app.post('/create/post', function(req, res) {
	var userName = req.body.name;
	var userEmail = req.body.email;    	
	var postTitle = req.body.postTitle;    	
	var post = req.body.post;    
  var dreamType = req.body.dreamType;	

  helpers.createPostDB(userName, userEmail, postTitle, post, dreamType,
  function(err, data) {
    if(err){
      res.status(400).send(err);
    }    
    res.send(data);
  });
});

//==================================================================Get all Posts Request===================================================================

app.get('/get/all/posts', function(req, res) {  
  helpers.findAllPosts( 
  function(err, data) {
    if(err){
      res.status(400).send(err);
    }        
    res.send(data);
  });
});


//======================================================================Get all User Posts========================================================================

app.post('/get/all/user/posts', function(req, res) { 
  var email = req.body.email;

  helpers.findAllUserPosts(email, 
  function(err, data) { 
    if(err){
      res.status(400).send(err);
    }         
    res.send(data);
  });
});

//=====================================================================View Single Post===================================================================================

app.post('/view/single/post', function(req, res) {
  var postID = req.body.postid;
  helpers.findSinglePost(postID,
  function(err, data) {  
    if(err){
      res.status(400).send(err);
    }      
    res.send(data);
  });
});

//====================================================================Delete Single Post======================================================================================



app.route('/delete/single/post') 
  .post(function( req, res) { 
    console.log('routes DELETE SINGLE post request!');    
    
    var postID = req.body.postID;
    
    helpers.deleteSinglePost(postID,
    function(err, data) {
      if(err){
        res.status(400).send(err);
      }      
      res.send(data);
    });
  })
  .put(function( req, res) { 
    console.log('routes UPDATE SINGLE post request!');    

    var userEmail = req.body.email;     
    var postTitle = req.body.postTitle;     
    var post = req.body.post;    
    var dreamType = req.body.dreamType;     
    var postID = req.body.postID;  

    helpers.updateSinglePost(userEmail, postID, postTitle, post, dreamType,
    function(err, data) {
      if(err){
        res.status(400).send(err);
      }      
      res.send(data);
    });
  })



//================================================================Get All Dreams and Nightmares for Graph========================================================================

app.post('/get/all/dreamType/posts', function(req, res) { 
  console.log('routes for graph being called!');  
  var email = req.body.email;
  var dreamType = req.body.dreamType;   

  helpers.findAllDreamsNightmares(email, dreamType,
  function(err, data) {  
    if(err){
      res.status(400).send(err);
    }       
    res.send(data);
  });
});








