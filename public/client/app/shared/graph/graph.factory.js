angular.module('dreamjournal.graphservices', [])

.factory('GraphFactory', ['$http', 'auth', '$location', function($http, auth, $location ){
  var userName = auth.profile.name;
  var userEmail = auth.profile.email;
  var dream = 'Dream';
  var nightmare = 'Nightmare';
  var dreamCount = 0;
  var nightmareCount = 0;


  var getDreams = function(){  
    return $http({
      method: 'GET',
      url: '/graph/' + userEmail + '/' + dream,
    })
    .then(function(result){
      return result.data;
    }, function(err){
      console.log('error', err);
    });
  };


  var getNightmares = function(){
    return $http({
      method: 'GET',
      url: '/graph/' + userEmail + '/' + nightmare,
    })
    .then(function(result){
      return result.data;
    }, function(err){
      console.log('error', err);
    });       
  };

    var getAllFriendsPosts = function(){
    return $http({
      method: 'GET',
      url: '/friends/' + userEmail,
    })
    .then(function(result) {
      return result.data;
    }, function(err) {
        console.error('Post GET error:', err);
    });
  }; 

  return {
    userName: userName, 
    userEmail: userEmail,
    dream: dream,
    nightmare: nightmare,
    dreamCount: dreamCount, 
    nightmareCount: nightmareCount,
    getDreams: getDreams,
    getNightmares: getNightmares,
    getAllFriendsPosts: getAllFriendsPosts
  } 
 
}]);



