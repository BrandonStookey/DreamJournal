'use strict';
angular.module('dreamjournal.home', [])

.controller('homeController', ['$scope', '$http', function ($scope, $http) {
	$scope.postsData = [];

  $scope.init= function(){
  	console.log('Am I being intialized!?');
  	return $http({
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
