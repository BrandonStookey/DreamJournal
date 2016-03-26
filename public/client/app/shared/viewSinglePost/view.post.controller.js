'use strict';

angular.module('dreamjournal.viewPost', ['ngSanitize', 'textAngular'])

.controller('viewPostController', ['$scope','djMainFactory', '$http', '$location', 'auth', function ($scope, djMainFactory, $http, $location, auth) {
  $scope.userName = auth.profile.name;
  $scope.userEmail = auth.profile.email;  

	$scope.init = function(){
    $scope.singlePost = djMainFactory.singlePost;

//==========================================================Show Delete Button and Edit Button if Post Belongs to User=================================================
   
    $scope.showDeleteEditPostButton = function(){
      var isUserPost = false;
      if($scope.singlePost[0].data.name === $scope.userName ){
        return isUserPost = true;
      }
      return isUserPost;
    }   
	};

	$scope.init();

//===================================================================Stores PostTitle and PostBody to be edited by user===================================================
  $scope.postForEditPostBody = $scope.singlePost[0].data.post;
  $scope.postForEditPostTitle = $scope.singlePost[0].data.postTitle;
//=====================================================================Delete A Single Post===============================================================================
	
  $scope.deletePost = function(){
    $http({
      method: 'PUT',
      url: '/post/delete',
      data: {postID: $scope.singlePost[0].data._id}
    })
    .then(function(resp){    
      $location.path('/profile');
    }, function(err){
      console.log('error', err);
    });
	}

//=======================================================================Edit a Single Post=====================================================================
	
  $scope.viewEditOptions = true;

	$scope.editPost = function(){
		$scope.viewEditOptions = false;		
		return $scope.viewEditOptions;
	}

	$scope.updatePost = function(postTitle, post, dreamNightmare){	
		$scope.viewEditOptions = true

    $http({
      method: 'PUT',
      url: '/post',
      data: {email: $scope.userEmail, postID: $scope.singlePost[0].data._id, postTitle: postTitle, post: post, dreamType: dreamNightmare}
    })
    .then(function(resp){    
      $location.path('/profile');
    }, function(err){
      console.log('error', err);
    });
	}

//===========================================================================Create Comment on Post==================================================================================
  $scope.commentOnPost = function(comment, postID){
    djMainFactory.commentOnPost(comment, postID);
  };
//================================================================================Delete Comment=====================================================================================
$scope.deleteComment = function(postID, commentID){
    djMainFactory.deleteComment(postID, commentID);
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













