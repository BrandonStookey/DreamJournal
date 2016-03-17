'use strict';
angular.module('dreamjournal.graph', [])

.controller('graphController', ['$scope', '$http', 'auth', function ($scope, $http, auth) {
	console.log('graphController being called!');

	$scope.nightMare = [];
	$scope.dream = [];

	$scope.dreamCount = 0;
	$scope.nightMareCount = 0;

	$scope.init = function(){
    var userName = auth.profile.name;
    var userEmail = auth.profile.email;

    $http({
      method: 'POST',
      url: '/get/all/dreamType/posts',
      data: {email: userEmail, dreamType: 'Dream'}
    })
    .then(function(result){
    	console.log('Dream result: ', result );    	
	    result.data.forEach(function(post) {
	    	$scope.dreamCount++;
	    	$scope.dream.unshift(post);
	    });	
    }, function(err){
      console.log('error', err);
    });


    $http({
      method: 'POST',
      url: '/get/all/dreamType/posts',
      data: {email: userEmail, dreamType: 'Nightmare'}
    })
    .then(function(result){
    	console.log('Nightmare result: ', result );
	    result.data.forEach(function(post) {
	    	$scope.nightMareCount++;
	    	$scope.nightMare.unshift(post);
	    });	
    }, function(err){
      console.log('error', err);
    });	    
	};

	$scope.init();

	console.log('graphController Dreams: ', $scope.dream);
	console.log('graphController Nightmare: ', $scope.nightMare);

	console.log('graphController $scope.dreamCount: ', $scope.dreamCount);	
	console.log('graphController Dreams: ', $scope.nightMareCount);

}]);












