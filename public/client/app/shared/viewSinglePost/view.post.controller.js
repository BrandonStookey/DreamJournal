'use strict';

angular.module('dreamjournal.viewPost', ['ngSanitize', 'textAngular'])

.controller('viewPostController', ['$scope', 'ViewSinglePostFromHomeAndFromProfile', '$http', '$location', 'auth', function ($scope, ViewSinglePostFromHomeAndFromProfile, $http, $location, auth) {


	$scope.init = function(){
		$scope.singlePost = ViewSinglePostFromHomeAndFromProfile.singlePost;

		$scope.postTitle = $scope.singlePost[0].data.postTitle;
		$scope.post = $scope.singlePost[0].data.post;
		$scope.name = $scope.singlePost[0].data.name;
		$scope.postID = $scope.singlePost[0].data._id;
		$scope.postDate = $scope.singlePost[0].data.postDate;		

//==========================================================Show Delete Button and Edit Button if Post Belongs to User=================================================
		$scope.showButton = function(){
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
	$scope.deletePost = function(postTitle){
		console.log('deletePost is being called on controlers')
    $http({
      method: 'POST',
      url: '/delete/single/post',
      data: {postID: $scope.postID}
    })
    .then(function(resp){    
      $location.path('/profile');
    }, function(err){
      console.log('error', err);
    });
	}

//=======================================================================Edit a Single Post=====================================================================
	$scope.viewEditOptions = true;

	$scope.editPost = function(){
		console.log('Click!');
		$scope.viewEditOptions = false;		

		return $scope.viewEditOptions;
	}

	$scope.updatePost = function(postTitle, post, dreamNightmare){
		console.log('update post is being called on controlers')

		var userEmail = auth.profile.email;
		
		$scope.viewEditOptions = true

    $http({
      method: 'PUT',
      url: '/delete/single/post',
      data: {email: userEmail, postID: $scope.postID, postTitle: postTitle, post: post, dreamType: dreamNightmare}
    })
    .then(function(resp){    
      $location.path('/profile');
    }, function(err){
      console.log('error', err);
    });
	}


}]);













