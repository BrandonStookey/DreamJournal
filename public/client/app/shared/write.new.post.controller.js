'use strict';
angular.module('dreamjournal.newPost', [])

.controller('newPostController', ['$scope', '$http', 'auth', function ($scope, $http, auth) {

	  $scope.createPost = function(postTitle, post){
	  console.log('postTitle: ', postTitle);
	  console.log('post:' , post);	
	  console.log('createPost on controller side!');

	  var userName = auth.profile.name;
    var userEmail = auth.profile.email;

    console.log('controller email: ', userEmail);
    console.log('controller name: ', userName);    


    return $http({
      method: 'POST',
      url: '/create/post',
      data: {postTitle: postTitle, post: post, name: userName, email: userEmail}
    })
    .then(function(resp){

    }, function(error){
      console.log(error);
    });
  };


}]);

	  // var name = auth.profile.name;

   //  var email = auth.profile.email;
     
