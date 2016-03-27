angular.module('dreamjournal.login', [])

  .controller('loginController', ['$scope', '$rootScope', '$http', 'auth', 'store', '$location',
  function ($scope,$rootScope, $http, auth, store, $location) {
  /////////User will login using Auth0///////////////
    $scope.found;

    $scope.login = function () {
      auth.signin({}, function (profile, token) {
        // Success callback
        $rootScope.signedIn = true;  
        $scope.found = false;
        store.set('profile', profile);
        store.set('token', token);
        $location.path('/home');
      }, function () {
        // Error callback
      });
    },    
  ///////////User logs out using Auth0////////////////
    $scope.logout = function() {
      $rootScope.signedIn = false;        
      $scope.found = true;
      auth.signout();
      store.remove('profile');
      store.remove('token');
    };



$scope.init= function(){
  $scope.showButton = function(){
    if($rootScope.signedIn){
      $scope.found = false;
    }
    return $scope.found;
  }    
//======Get All Blog Posts On Init======================
  

  };

  $scope.init();      
}]);






