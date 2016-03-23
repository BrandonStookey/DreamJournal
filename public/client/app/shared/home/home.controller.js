'use strict';

angular.module('dreamjournal.home', ['ngSanitize'])

.controller('homeController', ['$scope', '$http', 'auth', 'ViewSinglePostFromHomeAndFromProfile', function ($scope, $http, auth, ViewSinglePostFromHomeAndFromProfile) {
	$scope.postsData = [];
  $scope.userData = [];

  angular.extend($scope, ViewSinglePostFromHomeAndFromProfile);
  $scope.userName = auth.profile.name;
  $scope.userEmail = auth.profile.email;  

  $scope.init= function(userName, userEmail){
   //======================Create New User on Init=========================
    var userName = auth.profile.name;
    var userEmail = auth.profile.email;  

    $http({
      method: 'POST',
      url: '/create/new/user',
      data: {name: userName, email: userEmail}
    })
    .then(function(resp){
      console.log('resp ', resp);
      $scope.userData.unshift(resp);
    }, function(err){
      console.log('error', err);
    });

    //======================Get All Blog Posts On Init======================
  	$http({
  		method: 'GET',
  		url: '/get/all/posts'
  	})
   .then(function(result) {
	    result.data.forEach(function(post) {
        console.log('post ', post);
	    	$scope.postsData.unshift(post);
	    });	
	    console.log('Post GET successful');
  	}, function(err) {
      console.error('Post GET error:', err);
  	});
  };

  $scope.init();

  //======================Create Comment====================================
     
  $scope.commentOnPost = function(comment, postID){
    console.log('commentOnPost controller!');

     $http({
      method: 'POST',
      url: '/create/new/comment',
      data: {postID: postID, name: $scope.userName, comment: comment}
    })
    .then(function(resp){
      console.log('resp ', resp);
      $scope.userData.unshift(resp);
    }, function(err){
      console.log('error', err);
    }); 
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
      console.log('viewSinglePost resp ', resp);      
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













