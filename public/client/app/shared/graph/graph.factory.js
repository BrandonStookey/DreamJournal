angular.module('dreamjournal.graphservices', [])

.factory('GraphFactory', ['$http', 'auth', '$location', function($http, auth, $location ){
  var userName = auth.profile.name;
  var userEmail = auth.profile.email;
  var dream = 'Dream';
  var nightmare = 'Nightmare';
  var dreamCount = 0;
  var nightmareCount = 0;


  var getDreams = function(){  
    $http({
      method: 'GET',
      url: '/graph/' + userEmail + '/' + dream,
    })
    .then(function(result){
      console.log('Dream result: ', result );     
      result.data.forEach(function(post) {
        console.log('dream post: ', post);
        dreamCount++;
      }); 
    }, function(err){
      console.log('error', err);
    });
  };

  getDreams();

  var getNightmares = function(){
    $http({
      method: 'GET',
      url: '/graph/' + userEmail + '/' + nightmare,
    })
    .then(function(result){
      console.log('Nightmare result: ', result );
      result.data.forEach(function(post) {
        nightmareCount++;
      }); 
    }, function(err){
      console.log('error', err);
    });       
  };

  getNightmares();

  console.log('on graph factory dreamcount: ', dreamCount);
  console.log('on graph factory ngihtmarecount: ', nightmareCount);
  return {
    dreamCount: dreamCount, 
    nightmareCount: nightmareCount,
    getDreams: getDreams,
    getNightmares: getNightmares,
    userName: userName, 
    userEmail: userEmail,
    dream: dream,
    nightmare: nightmare
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