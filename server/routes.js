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
app.use(['/api/public/client/app/shared/home/home.view.html', '/api/public/client/app/shared/writeNewPost/write.new.post.view.html', '/api/public/client/app/shared/viewSinglePost/view.post.view.html', '/api/public/client/app/shared/profile/profile.view.html', '/api/public/client/app/shared/graph/graph.view.html', '/api/public/client/app/shared/login/login.view.html' ],  jwtCheck);

//================================================================Add New User To Database=====================================================================
//    /user
app.post('/user/', function(req, res) {
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


app.get('/user/:email/', function(req, res) {

  var userEmail = req.params.email;     
 
  helpers.findAllUserPosts(userEmail, 
  function(err, data) { 
    if(err){
      return res.status(400).send(err);
    }         
      return res.send(data);
  });
});





//===============================================================================POST/GET/PUT/DELETE for Posts=================================================================
//===============================Creates new Post
app.route('/post/')
  .post(function(req, res) {
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
})
//================================Get all Posts Request
.get(function(req, res){
   helpers.findAllPosts( 
    function(err, data) {
      if(err){
        res.status(400).send(err);
      }        
      res.send(data);
    });
})







//====================================================================Delete Single Post======================================================================================

app.route('/delete/single/post') // / /post/:id     <------pass postID here
  .post(function( req, res) {   //<------------- .delete
    var postID = req.body.postID; //<----------- req.params.id

    helpers.deleteSinglePost(postID,
    function(err, data) {
      if(err){
        res.status(400).send(err);
      }      
      res.send(data);
    });
  })
 //=====================================================Update Single Post 
  .put(function( req, res) { 

    var userEmail = req.body.email;     
    var postTitle = req.body.postTitle;     
    var post = req.body.post;    
    var dreamType = req.body.dreamType;     
    var postID = req.body.postID;         //<-------req.params.id

    helpers.updateSinglePost(userEmail, postID, postTitle, post, dreamType,
    function(err, data) {
      if(err){
        res.status(400).send(err);
      }      
      res.send(data);
    });
  })



//================================================================Get All Dreams and Nightmares for Graph========================================================================


//graph get request
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

//=======================================================================Create a new comment================================================================================================

app.post('/create/new/comment', function(req, res) { 


  var postID = req.body.postID;
  var userName = req.body.name;
  var userComment = req.body.comment;

  helpers.createNewComment(postID, userName, userComment, 
  function(err, data) { 
    if(err){
      res.status(400).send(err);
    }         
    res.status(200).send(data);
  });
});

//========================================================================Delete Comment==========================================================================================================

app.post('/delete/comment', function(req, res) { 

  var postID = req.body.postID;
  var commentID = req.body.commentID;

  console.log('commentID on routes', commentID);
  helpers.deleteComment(postID, commentID, 
  function(err, data) { 
    if(err){
      res.status(400).send(err);
    }         
    res.status(200).send(data);
  });
});

//=====================================================================Like Comment=====================================================================================================================

app.post('/like/comment', function(req, res) { 
  var postID = req.body.postID;
  var userEmail = req.body.userEmail;  
  var userName = req.body.name;  
  var likeComment = req.body.like;

  helpers.likeComment(postID, userEmail, userName, likeComment,
  function(err, data) { 
    if(err){
      res.status(400).send(err);
    }         
    res.status(200).send(data);
  });
});


//=====================================================================Delete Like Comment=====================================================================================================================


app.post('/delete/like/comment', function(req, res) { 
  console.log('delete like Comment on routes');

  var postID = req.body.postID;
  var userEmail = req.body.userEmail; 
  var likeComment = req.body.like;


  helpers.deleteLikeComment(postID, userEmail, likeComment,
  function(err, data) { 
    if(err){
      res.status(400).send(err);
    }         
    res.status(200).send(data);
  });
});


