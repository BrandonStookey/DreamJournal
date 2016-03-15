'use strict';

angular.module('dreamjournal.newPost', ['textAngular'])

.controller('newPostController', ['$scope', '$http', 'auth', function ($scope, $http, auth) {
  $scope.createPost = function(postTitle, post){
	  var userName = auth.profile.name;
    var userEmail = auth.profile.email;

    return $http({
      method: 'POST',
      url: '/create/post',
      data: {postTitle: postTitle, post: post, name: userName, email: userEmail}
    })
    .then(function(resp){
      console.log(resp);
    }, function(error){
      console.log(error);
    });
  };
  
}]);

     
