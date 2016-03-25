'use strict';

angular.module('dreamjournal.viewPost', ['ngSanitize', 'textAngular'])

.controller('viewPostController', ['$scope','djMainFactory', '$http', '$location', 'auth', function ($scope, djMainFactory, $http, $location, auth) {
  $scope.userName = auth.profile.name;
  $scope.userEmail = auth.profile.email;  

	$scope.init = function(){

    $scope.singlePost = djMainFactory.singlePost;

//==========================================================Show Delete Button and Edit Button if Post Belongs to User=================================================
		
    $scope.showButton = function(){
			var userName = auth.profile.name; 
			var isUserPost = false;

			if($scope.name === userName){
				return isUserPost = true;
			}
			return isUserPost;
		}		

	};

	$scope.init();
//=====================================================================Delete A Single Post=============================================================
	
  $scope.deletePost = function(postTitle){
		console.log('deletePost is being called on controlers')
    $http({
      method: 'POST',
      url: '/delete/single/post',
      data: {postID: $scope.postID}
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
		console.log('Click!');
		$scope.viewEditOptions = false;		

		return $scope.viewEditOptions;
	}

	$scope.updatePost = function(postTitle, post, dreamNightmare){
		console.log('update post is being called on controlers')

		var userEmail = auth.profile.email;
		
		$scope.viewEditOptions = true

    $http({
      method: 'PUT',
      url: '/delete/single/post',
      data: {email: userEmail, postID: $scope.postID, postTitle: postTitle, post: post, dreamType: dreamNightmare}
    })
    .then(function(resp){    
      $location.path('/profile');
    }, function(err){
      console.log('error', err);
    });
	}

//======================Create Comment on Post================================

  $scope.commentOnPost = function(comment, postID){
    djMainFactory.commentOnPost(comment, postID);
  };
//==========================Delete Comment==================================

$scope.deleteComment = function(postID, commentID){
    djMainFactory.deleteComment(postID, commentID);
};

//====================================Like Post
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

 //=========================Shows/Hide Comments===============================MUST FIX THIS!!!!!===============================================
  
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

//=========================Shows delete button only if it is user's comment  

  $scope.showDeleteCommentButton = function(){
    $scope.isUser = $scope.userName;
    console.log('showButton ', $scope.isUser);
    return $scope.isUser;
  };  

}]);













