'use strict';

angular.module('dreamjournal.home', [])

.controller('homeController', ['$scope', '$http', 'auth', function ($scope, $http, auth) {
	$scope.postsData = [];

  $scope.viewSinglePost = function(postID){
    console.log('controller get SINGLE post request!');  
    console.log('controllers postID: ', postID);
    var userEmail = auth.profile.email;    

    $http({
      method: 'POST',
      url: '/view/single/post',
      data: {email: userEmail, postid: postID}
    })
    .then(function(resp){
      console.log('View single Post resp: ',resp);
    }, function(err){
      console.log('error', err);
    });
  }

  $scope.init= function(){
   //======================Create New User on Init=========================
    var userName = auth.profile.name;
    var userEmail = auth.profile.email;

    $http({
      method: 'POST',
      url: '/create/new/user',
      data: {name: userName, email: userEmail}
    })
    .then(function(resp){
      console.log(resp);
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
	    	$scope.postsData.unshift(post);
	    });	
	    console.log('Post GET successful');
  	}, function(err) {
      console.error('Post GET error:', err);
  	});
  };

  $scope.init();

}]);
