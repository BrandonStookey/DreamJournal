'use strict';

angular.module('dreamjournal.profile', ['ngSanitize'])

.controller('profileController', ['$scope', 'auth', '$http', 'ViewSinglePostFromHomeAndFromProfile', function ($scope, auth, $http, ViewSinglePostFromHomeAndFromProfile) {
  angular.extend($scope, ViewSinglePostFromHomeAndFromProfile);  
  $scope.postsData = [];	
  $scope.userName = auth.profile.name;

	$scope.init = function(){
  var email = auth.profile.email;		
  	$http({
  		method: 'POST',
  		url: '/get/all/user/posts',
  		data: {email: email}
  	})
   .then(function(result) {
   		// console.log('result ', result);
   		// $scope.userPostsData = result;
	    result.data.forEach(function(post) {
	    	$scope.postsData.unshift(post);
	    });	
	    // console.log('User Post GET successful:', $scope.userPostsData);
  	}, function(err) {
      console.error('Post GET error:', err);
  	});
 };

	$scope.init();	

//======================Create Comment====================================
  $scope.updateComment = function(postsData, userName, comment, postID){
    for(var i = 0; i < postsData.length; i ++){
      if(postID === postsData[i]._id){
        postsData[i].postComment.push({userName: userName, comment: comment});
      }
    }
    $scope.postsData = postsData;
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

  $scope.updateDeleteCommment = function(postsData, postID, commentID){

      for(var i = 0; i < postsData.length; i ++){    
        if(postID === postsData[i]._id){
          for(var j = 0; j < postsData[i].postComment.length; j++){
            if(postsData[i].postComment[j]._id === commentID){
                postsData[i].postComment.splice(j,1);
            }
          }
        } 
      } 
    $scope.postsData = postsData;
  };

$scope.deleteComment = function(postID, commentID){
     $http({
      method: 'POST',
      url: '/delete/comment',
      data: {postID: postID, commentID: commentID}
    })
    .then(function(resp){
      //refreshes and updates the page
      $scope.updateDeleteCommment($scope.postsData, postID, commentID);
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

  $scope.updateLikes = function(postID, postsData, userName, bool ){

      for(var i = 0; i < postsData.length; i ++){
        if(bool){      
          if(postID === postsData[i]._id){
            postsData[i].like.push({userName: userName, like: bool});
          } 
        } else {
            postsData[i].like.pop();
        } 
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
    $scope.updateLikes(postID, $scope.postsData, $scope.userName, true); 
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
      //refreshes and updates the page
    $scope.updateLikes(postID, $scope.postsData, $scope.userName, false);
    }, function(err){
      console.log('error', err);
    });   
  }
};  

}])
.factory('ViewSinglePostFromHomeAndFromProfile',['$http', 'auth','$location', function($http, auth, $location){
  var singlePost = [];
  var viewSinglePost = function(postID){
    $http({
      method: 'POST',
      url: '/view/single/post',
      data: {postid: postID}
    })
    .then(function(resp){
      singlePost[0] = resp;
      $location.path('/viewPost');
      console.log('homeController: ', singlePost);
    }, function(err){
      console.log('error', err);
    });
  } 
  
  return{
    viewSinglePost: viewSinglePost,
    singlePost: singlePost
  };
}])










