'use strict';

angular.module('dreamjournal.home', ['ngSanitize'])

.controller('homeController', ['$scope', '$rootScope', 'djMainFactory', '$http', 'auth', '$interval', function ($scope, $rootScope, djMainFactory,  $http, auth, $interval) {

  $scope.userName = auth.profile.name;
  $scope.userEmail = auth.profile.email;
  $scope.postsData;
  $scope.isUserSignedIn = $rootScope.signedIn;


  $scope.init= function() {
//======================Get All Blog Posts On Init=====================
    // djMainFactory.getAllPosts();
    djMainFactory.getAllPosts()
    .then(function(data){
      $scope.postsData  = data;
    }); 
  };

  $scope.init();

//==========================Get All User Posts========================== 

  $scope.getUserEmail = function(email){
    djMainFactory.getUserEmail(email);
  };

//======================Create Comment on Post==========================

  $scope.commentOnPost = function(comment, postID){
    djMainFactory.commentOnPost(comment, postID);

    djMainFactory.getAllPosts()
    .then(function(data){
      console.log('DATA On Controller!!!: ', data);
      $scope.postsData  = data;
      console.log('$scope.result: ', $scope.result);
    });     
  };
//==========================Delete Comment==============================

$scope.deleteComment = function(postID, commentID){
    djMainFactory.deleteComment(postID, commentID);

    djMainFactory.getAllPosts()
    .then(function(data){
      console.log('DATA On Controller!!!: ', data);
      $scope.postsData  = data;
      console.log('$scope.result: ', $scope.result);
    });     
};

//====================================Like Post
  $scope.likeCounter = 0;
  $scope.userLikePost = false;
  $scope.userLikeData = djMainFactory.getUserLikeData;

  $scope.getUserLike = function(postID){
    console.log('getUserLike on home controller: ');
    djMainFactory.getUserLike(postID); 
  }


  $scope.likePost = function(postID){

    if($scope.likeCounter % 2 === 0){
      $scope.likeCounter++;
      $scope.userLikePost = true;
    } else {
      $scope.likeCounter++;      
      $scope.userLikePost = false;
    }  
      djMainFactory.likePost(postID, $scope.userLikePost);

    djMainFactory.getAllPosts()
    .then(function(data){
      console.log('DATA On Controller!!!: ', data);
      $scope.postsData  = data;
      console.log('$scope.result: ', $scope.result);
    });       
  };  

  $scope.viewSinglePost = function(postID){  
      djMainFactory.viewSinglePost(postID);
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

//=========================Shows delete button only if it is user's comment  

  $scope.showDeleteCommentButton = function(){
    $scope.isUser = $scope.userName;
    console.log('showButton ', $scope.isUser);
    return $scope.isUser;
  };

}]);














