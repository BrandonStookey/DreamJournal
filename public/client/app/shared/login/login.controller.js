angular.module('dreamjournal.login', [])

.controller('loginController', ['$scope', 'LoginFactory', '$rootScope', '$http', 'auth', 'store', '$location', '$timeout',
  function ($scope, LoginFactory, $rootScope, $http, auth, store, $location, $timeout) {
  /////////User will login using Auth0///////////////
  $scope.found;
  console.log('$rootScope.signedIn: ', $rootScope.signedIn);
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      store.set('profile', profile);
      store.set('token', token);
      // Success callback
      LoginFactory.createUser(auth.profile.email, auth.profile.name, auth.profile.identities[0].user_id).then(function(resp){
        console.log('Hello????, response on createuser on login page');
        $rootScope.signedIn = true;  
        $scope.found = false;
          $location.path('/home');
      })
    }, function (error) {
        console.log(error);
        return;
    });
  },    
///////////User logs out using Auth0////////////////
  $scope.logout = function() {
    $rootScope.signedIn = false;        
    $scope.found = true;
    auth.signout();
    store.remove('profile');
    store.remove('token');
    // Timeout for logout function to complete before path change
    $timeout(function () {
      $location.path('/');
    }, 1);    
  };

  
  $scope.init= function(){
    $scope.showButton = function(){
      if($rootScope.signedIn){
        $scope.found = false;
      }
      return $scope.found;
    }    
  //======Get All Blog Posts On Init======================
  $scope.allPostsData;

  LoginFactory.getAllPosts().then(function(data){
    $scope.allPostsData = data;
  });





  };

$scope.init();      
}]);






