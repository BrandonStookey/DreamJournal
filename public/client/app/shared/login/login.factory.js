angular.module('dreamjournal.loginservices', [])

.factory('LoginFactory', ['$http', 'auth', '$location', function($http, auth, $location ){
	var allPostsData = [];
  var userData = [];
//===================================================================Create New User===============================================================
  var createUser = function(email, name){    
  	$http({
        method: 'POST',
        url: '/user',
        data: { email: email, name: name}
      })
      .then(function(resp){
        userData.unshift(resp);
      }, function(err){
        console.log('error', err);
      });
	};

//=====================================================================Get All Blog Posts=============================================================

	  var getAllPosts = function(postTitle, post, dreamNightmare){
    $http({
      method: 'GET',
      url: '/post',
    })
    .then(function(result) {
      if(allPostsData.length < 1 && result.data[0] !== undefined){
        allPostsData.unshift(result.data[0]);
      };
      for(var i = 0; i < result.data.length; i++){
          for(var j = 0; j < result.data.length; j++){
            if(allPostsData[j] === undefined){
              allPostsData.unshift(result.data[i]);
              break;
            }
            if(result.data[i]._id == allPostsData[j]._id) {
              allPostsData[j] = result.data[i];
              break;
            } 
          } 
        }
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