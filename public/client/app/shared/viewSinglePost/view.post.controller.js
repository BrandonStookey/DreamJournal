'use strict';

angular.module('dreamjournal.viewPost', ['ngSanitize', 'textAngular'])

.controller('viewPostController', ['$scope','djMainFactory', '$http', '$location', 'auth', function ($scope, djMainFactory, $http, $location, auth) {
  $scope.userName = auth.profile.name;
  $scope.userEmail = auth.profile.email;  
  $scope.singlePost = [];
  $scope.postForEditPostBody;
  $scope.postForEditPostTitle;
  $scope.singlePostID;
	$scope.init = function(){
  //======================================Gets single post from either home or profile  
    djMainFactory.viewSinglePost(djMainFactory.setSinglePostID)
    .then(function(data){
      $scope.singlePost[0] = (data);
      console.log('$scope.singlePost[0]: ', $scope.singlePost[0]);
      $scope.postForEditPostBody = $scope.singlePost[0].post;
      $scope.postForEditPostTitle = $scope.singlePost[0].postTitle;
      $scope.singlePostID = $scope.singlePost[0]._id;
    });      


//=======================================================Show Delete Button and Edit Button if Post Belongs to User=================================================
   
    $scope.showDeleteEditPostButton = function(){
      var isUserPost = false;
      if($scope.singlePost[0].name === $scope.userName ){
        return isUserPost = true;
      }
      return isUserPost;
    }   
	};

	$scope.init();

//============================================================Stores PostTitle and PostBody to be edited by user===================================================

//=====================================================================Delete A Single Post===============================================================================
	
  $scope.deletePost = function(){
    djMainFactory.deletePost($scope.singlePost[0]._id);
	};

//=======================================================================Edit a Single Post=====================================================================
	//===============================View Edit Options
  $scope.viewEditOptions = true;

	$scope.editPost = function(){
		$scope.viewEditOptions = false;		
		return $scope.viewEditOptions;
	};

	$scope.updatePost = function(postTitle, post, dreamNightmare){	
		$scope.viewEditOptions = true
    djMainFactory.updatePost(postTitle, post, dreamNightmare, $scope.singlePost[0]._id);
	};

//===========================================================================Create Comment on Post==================================================================================
  $scope.commentOnPost = function(comment, postID){
    djMainFactory.commentOnPost(comment, postID);

    djMainFactory.viewSinglePost(djMainFactory.setSinglePostID)
    .then(function(data){
      $scope.singlePost[0] = (data);
    });        
  };
//================================================================================Delete Comment=====================================================================================
  $scope.deleteComment = function(postID, commentID){
      djMainFactory.deleteComment(postID, commentID);

    djMainFactory.viewSinglePost(djMainFactory.setSinglePostID)
    .then(function(data){
      $scope.singlePost[0] = (data);
    });          
  };
//=================================================================================Like Post==========================================================================================
  $scope.likeCounter = 0;
  $scope.userLikePost = false;

  $scope.likePost = function(postID){

    if($scope.likeCounter % 2 === 0){
      $scope.likeCounter++;
      $scope.userLikePost = true;
    } else {
      $scope.likeCounter++;      
      $scope.userLikePost = false;
    }  
      djMainFactory.likePost(postID, $scope.userLikePost);

    djMainFactory.viewSinglePost(djMainFactory.setSinglePostID)
    .then(function(data){
      $scope.singlePost[0] = (data);
    });      
  }; 

 //========================================================Shows/Hide Comments//MUST FIX THIS!!!!! Add to app.module.js===============================================
  
  $scope.viewComments;
  $scope.counter = 0;
  $scope.isUser;

  $scope.showComments = function(postID){
    if($scope.counter % 2 === 0){
      $scope.counter++;
      $scope.viewComments = postID;
      return $scope.viewComments;
    }
    $scope.counter++;
    $scope.viewComments = 0;
    return $scope.viewComments;
  };

//======Shows delete button only if it is user's comment  

  $scope.showDeleteCommentButton = function(){
    $scope.isUser = $scope.userName;
    return $scope.isUser;
  };  

}]);













