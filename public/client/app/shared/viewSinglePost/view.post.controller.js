'use strict';

angular.module('dreamjournal.viewPost', [])

.controller('viewPostController', ['$scope', 'ViewSinglePostFromHome', function ($scope, ViewSinglePostFromHome) {


	$scope.init = function(){
		$scope.singlePost = ViewSinglePostFromHome.singlePost;
		console.log('$scope.singlePost on View Post ', $scope.singlePost);		
		$scope.postTitle = $scope.singlePost[0].data.postTitle;
		$scope.post = $scope.singlePost[0].data.post;

		console.log('$scope.postTitle on View Post ', $scope.postTitle );		
		console.log('$scope.post on View Post ', $scope.post);		

	};

	$scope.init();

}]);
