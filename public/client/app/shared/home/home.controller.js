'use strict';

angular.module('dreamjournal.home', [])

.controller('homeController', ['$scope', '$http', 'auth', 'ViewSinglePostFromHome', function ($scope, $http, auth, ViewSinglePostFromHome) {
	$scope.postsData = [];
  angular.extend($scope, ViewSinglePostFromHome);


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

}])
.factory('ViewSinglePostFromHome',['$http', 'auth','$location', function($http, auth, $location){
  var singlePost = [];
  var viewSinglePost = function(postID){
    $http({
      method: 'POST',
      url: '/view/single/post',
      data: {postid: postID}
    })
    .then(function(resp){
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














