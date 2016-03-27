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
app.post('/user', function(req, res) {
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

//=================================================================Gets All Posts For Single User=====================================================================
app.get('/user/:email', function(req, res) {

  var userEmail = req.params.email;     
 
  helpers.findAllUserPosts(userEmail, 
  function(err, data) { 
    if(err){
      return res.status(400).send(err);
    }         
      return res.send(data);
  });
});

//===============================================================================POST/GET/PUT for Posts=================================================================
//===============================Creates new Post
app.route('/post')
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
//Angular does not support sending a request body to a delete request
  //http://stackoverflow.com/questions/22186671/angular-resource-delete-wont-send-body-to-express-js-server

//=======================================View Single Post
app.route('/post/:postID')
  .get(function(req, res) {

  var postID = req.params.postID;     
 
  helpers.findSinglePost(postID,
    function(err, data) {  
      if(err){
       return res.status(400).send(err);
      }      
       return res.send(data);
    }); 
}) 
  //===================================Delete Single Post
  .delete(function( req, res) {  
    var postID = req.params.postID; 

    helpers.deleteSinglePost(postID,
    function(err, data) {
      if(err){
        res.status(400).send(err);
      }      
      res.send(data);
    });
  })
 //=================================Update Single Post 
  .put(function( req, res) { 

    var userEmail = req.body.email;     
    var postTitle = req.body.postTitle;     
    var post = req.body.post;    
    var dreamType = req.body.dreamType;     
    var postID = req.params.postID;       

    helpers.updateSinglePost(userEmail, postID, postTitle, post, dreamType,
    function(err, data) {
      if(err){
        res.status(400).send(err);
      }      
      res.send(data);
    });
  })  



//================================================================Get All Dreams and Nightmares for Graph========================================================================

app.get('/graph/:email/:dreamType', function(req, res) { 
  var email = req.params.email;
  var dreamType = req.params.dreamType;   

  helpers.findAllDreamsNightmares(email, dreamType,
  function(err, data) {  
    if(err){
      res.status(400).send(err);
    }       
    res.send(data);
  });
});

//=======================================================================Create a new comment================================================================================================

app.route('/comment')
  .post(function(req, res) { 
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
})
//==========================Delete Comment
  .put(function(req, res) { 

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

//=====================================================================Like Post=====================================================================================================================

app.route('/like')
  .post(function(req, res) { 
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
  })
//========================Delete Like Post
  .put(function(req, res) { 
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
  })

  // app.get('/like/:postID/:userEmail', function(req, res){
  //   console.log('working on ROUTES getUserLIke');
  //   var postID = req.params.postID;
  //   var userEmail = req.params.userEmail;

  //   helpers.getUserLike(postID, userEmail,
  //   function(err, data) { 
  //     if(err){
  //       res.status(400).send(err);
  //     }         
  //     res.status(200).send(data);
  //   });

  // })


