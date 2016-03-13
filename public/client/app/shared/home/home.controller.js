'use strict';

angular.module('dreamjournal.home', [])

.controller('homeController', ['$scope', '$http', 'auth', function ($scope, $http, auth) {
	$scope.postsData = [];

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
   		console.log(result);
	    result.data.forEach(function(post) {
	    	$scope.postsData.unshift(post);
	    });	
	    console.log('Post GET successful:', $scope.tasks);
  	}, function(err) {
      console.error('Post GET error:', err);
  	});
  };

  $scope.init();

}]);
