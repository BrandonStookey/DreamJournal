'use strict';

angular.module('dreamjournal.viewPost', ['ngSanitize', 'textAngular'])

.controller('viewPostController', ['$scope', 'ViewSinglePostFromHomeAndFromProfile', '$http', '$location', 'auth', function ($scope, ViewSinglePostFromHomeAndFromProfile, $http, $location, auth) {
  $scope.userName = auth.profile.name;
  $scope.userEmail = auth.profile.email;  


	$scope.init = function(){
		$scope.singlePost = ViewSinglePostFromHomeAndFromProfile.singlePost;

		$scope.postTitle = $scope.singlePost[0].data.postTitle;
		$scope.post = $scope.singlePost[0].data.post;
		$scope.dreamType = $scope.singlePost[0].data.dreamType;		
		$scope.name = $scope.singlePost[0].data.name;
		$scope.postID = $scope.singlePost[0].data._id;
		$scope.postDate = $scope.singlePost[0].data.postDate;		
 		$scope.postComment = $scope.singlePost[0].data.postComment;		
 		$scope.like = $scope.singlePost[0].data.like;		 		

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
//======================Create Comment====================================
  $scope.updateComment = function(postsData, userName, comment, postID){
    $scope.postComment.push({userName: userName, comment: comment});
  };

  $scope.commentOnPost = function(comment, postID){
     $http({
      method: 'POST',
      url: '/create/new/comment',
      data: {postID: postID, name: $scope.userName, comment: comment}
    })
    .then(function(resp){
      //refreshes and updates the page
      // $location('/home');
      console.log('postsData: ', $scope.postsData);
      console.log('commentOnPost controller resp: ', resp);
      // $scope.postsData = [];
      //I can either push comment into database array
      
      $scope.updateComment($scope.postsData, $scope.userName, comment, postID);

      //or I can append directly to the page

      // $scope.init();
    }, function(err){
      console.log('error', err);
    }); 
  };
  
//==========================Delete Comment==================================

  $scope.updateDeleteCommment = function(commentID){

    for(var j = 0; j < $scope.postComment.length; j++){
      if($scope.postComment[j]._id === commentID){
        $scope.postComment.splice(j,1);
      }
    }
  };

$scope.deleteComment = function(postID, commentID){
     $http({
      method: 'POST',
      url: '/delete/comment',
      data: {postID: postID, commentID: commentID}
    })
    .then(function(resp){
      //refreshes and updates the page
      $scope.updateDeleteCommment(commentID);
    }, function(err){
      console.log('error', err);
    }); 
};


//=========================Shows/Hide Comments===============================
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

//===================Shows delete button only if it is user's comment  

  $scope.showButton = function(){
    $scope.isUser = $scope.userName;
    console.log('showButton ', $scope.isUser);
    return $scope.isUser;
  };

//====================================Like Post

$scope.likeCounter = 0;
$scope.userLikePost = false;

  $scope.updateLikes = function(bool){
    if(bool){      
      $scope.like.push({userName: userName, like: bool});
    } else {
      $scope.like.pop();
    } 
    $scope.postsData = postsData;
  };


$scope.likePost = function(postID){
    if($scope.likeCounter % 2 === 0){
      $scope.likeCounter++;
      $scope.userLikePost = true;
    } else {
      $scope.likeCounter++;      
      $scope.userLikePost = false;
    }
//=========================if userLikePost is true then it will add a new like to the post in the database
  if($scope.userLikePost){
     $http({
      method: 'POST',
      url: '/like/comment',
      data: {postID: postID, userEmail: $scope.userEmail, name: $scope.userName, like: $scope.userLikePost}
    })
    .then(function(resp){
      //refreshes and updates the page
    $scope.updateLikes(true);
    }, function(err){
      console.log('error', err);
    });     
  } else{
//=========================if userLikePost is false then it will remove the 'like' from the database    
     $http({
      method: 'POST',
      url: '/delete/like/comment',
      data: {postID: postID, userEmail: $scope.userEmail, like: $scope.userLikePost}
    })
    .then(function(resp){
      //refreshes and updates the page
    $scope.updateLikes(false);
    }, function(err){
      console.log('error', err);
    });   
  }
};

}]);













