'use strict';

angular.module('dreamjournal.profile', ['ngSanitize'])

.controller('profileController', ['$scope', 'auth', '$http', 'ViewSinglePostFromHome', function ($scope, auth, $http, ViewSinglePostFromHome) {
  angular.extend($scope, ViewSinglePostFromHome);  
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
	    	$scope.userPostsData.unshift(post);
	    });	
	    // console.log('User Post GET successful:', $scope.userPostsData);
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










