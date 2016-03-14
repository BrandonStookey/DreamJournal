'use strict';
angular.module('dreamjournal.profile', [])

.controller('profileController', ['$scope', 'auth', '$http', function ($scope, auth, $http) {
	console.log('Is profile init being intiated???');
  $scope.userPostsData = [];	


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
	    	console.log('post inside of profile ', post);
	    	$scope.userPostsData.unshift(post);
	    });	
	    // console.log('User Post GET successful:', $scope.userPostsData);
  	}, function(err) {
      console.error('Post GET error:', err);
  	});
 };

	$scope.init();	

}]);