angular.module('dreamjournal.loginservices', [])

.factory('LoginFactory', ['$http', 'auth', '$location', function($http, auth, $location ){
	var allPostsData = [];
  var userData = [];
//===================================================================Create New User===============================================================
  var createUser = function(email, name, image){    
  	$http({
        method: 'POST',
        url: '/user',
        data: { email: email, name: name, image: image}
      })
      .then(function(resp){
        userData.unshift(resp);
      }, function(err){
        console.log('error', err);
      });
	};

//=====================================================================Get All Blog Posts=============================================================

	  var getAllPosts = function(postTitle, post, dreamNightmare){
      return $http({
        method: 'GET',
        url: '/post',
      })
      .then(function(result) {
        return result.data;
      }, function(err) {
          console.error('Post GET error:', err);
      });
  };


  return {
  	allPostsData: allPostsData,
  	createUser: createUser,
  	getAllPosts: getAllPosts
  } 
 
}]);