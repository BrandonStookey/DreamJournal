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


  console.log('on graph factory dreamcount: ', dreamCount);
  console.log('on graph factory ngihtmarecount: ', nightmareCount);
  return {
    userName: userName, 
    userEmail: userEmail,
    dream: dream,
    nightmare: nightmare,
    dreamCount: dreamCount, 
    nightmareCount: nightmareCount,
    getDreams: getDreams,
    getNightmares: getNightmares
  } 
 
}]);

//=========For Graph Controller

//   $scope.dreamCount = GraphFactory.dreamCount;
//   $scope.nightmareCount = GraphFactory.nightmareCount;

//   console.log($scope.dreamCount = GraphFactory.dreamCount);
//   console.log($scope.nightmareCount = GraphFactory.nightmareCount);


//   $scope.init = function(){
// //========Gets all post with a dreamType of 'Dream'
//   GraphFactory.getDreams();
// //=====Gets all post with a dreamType of 'Nightmare'
//   GraphFactory.getNightmares();

//   };
//   $scope.init();  



