'use strict';

angular.module('dreamjournal.viewPost', [])

.controller('viewPostController', ['$scope', 'ViewSinglePostFromHome', '$http', '$location', 'auth', function ($scope, ViewSinglePostFromHome, $http, $location, auth) {


	$scope.init = function(){
		$scope.singlePost = ViewSinglePostFromHome.singlePost;
		console.log('$scope.singlePost on View Post ', $scope.singlePost);		
		$scope.postTitle = $scope.singlePost[0].data.postTitle;
		$scope.post = $scope.singlePost[0].data.post;
		$scope.name = $scope.singlePost[0].data.name;
		$scope.postID = $scope.singlePost[0].data._id;

		console.log('$scope.postTitle on View Post ', $scope.postTitle );		
		console.log('$scope.post on View Post ', $scope.post);
//==========================================================Show Delete Button if Post Belongs to User=================================================
		$scope.showDeleteButton = function(){
			var userName = auth.profile.name; 
			var isUserPost = false;

			if($scope.name === userName){
				return isUserPost = true;
			}
			return isUserPost;
	}		

	};

	$scope.init();
//=====================================================================Delete A Single Post=============================================================
	$scope.deletePost = function(postID){
		console.log('deletePost is being called on controlers')
    $http({
      method: 'POST',
      url: '/delete/single/post',
      data: {postid: postID}
    })
    .then(function(resp){    
      $location.path('/profile');
    }, function(err){
      console.log('error', err);
    });
	}


}]);
