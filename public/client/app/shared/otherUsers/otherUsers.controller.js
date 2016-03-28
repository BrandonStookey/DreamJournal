'use strict';

angular.module('dreamjournal.otherusers', ['ngSanitize'])

.controller('otherUsersController', ['$scope', 'auth', '$http', 'djMainFactory', function ($scope, auth, $http, djMainFactory) {
  
  $scope.postsData; 

  $scope.userName = auth.profile.name;
  $scope.userEmail = auth.profile.email;  

  $scope.init= function() {
//======================Get All Blog Posts On Init=====================
    djMainFactory.getAllUserPosts(djMainFactory.setUserEmail)
    .then(function(data){
      console.log('DATA On otherUSer Controller!!!: ', data);
      $scope.postsData  = data;
      console.log('$scope.result on otherUsersController: ', $scope.result);
    });
  };

  $scope.init();

//======================Create Comment on Post==========================

  $scope.commentOnPost = function(comment, postID){

    djMainFactory.commentOnPost(comment, postID);

    djMainFactory.getAllUserPosts(djMainFactory.setUserEmail)
    .then(function(data){
      console.log('DATA On otherUSer Controller!!!: ', data);
      $scope.postsData  = data;
      console.log('$scope.result on otherUsersController: ', $scope.result);
    });    
  };
//==========================Delete Comment==============================

$scope.deleteComment = function(postID, commentID){
    djMainFactory.deleteComment(postID, commentID);

    djMainFactory.getAllUserPosts(djMainFactory.setUserEmail)
    .then(function(data){
      console.log('DATA On otherUSer Controller!!!: ', data);
      $scope.postsData  = data;
      console.log('$scope.result on otherUsersController: ', $scope.result);
    });    
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

    djMainFactory.getAllUserPosts(djMainFactory.setUserEmail)
    .then(function(data){
      console.log('DATA On otherUSer Controller!!!: ', data);
      $scope.postsData  = data;
      console.log('$scope.result on otherUsersController: ', $scope.result);
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

  $scope.$watch(
    function(){ return djMainFactory.userPostsData },

    function(newVal) {
      $scope.postsData = newVal;
    }
  )  

}]);











