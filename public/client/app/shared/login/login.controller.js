angular.module('dreamjournal.login', [])

  .controller('loginController', ['$scope', '$http', 'auth', 'store', '$location',
  function ($scope, $http, auth, store, $location) {
  /////////User will login using Auth0///////////////
    $scope.found = true;

    $scope.login = function () {
      auth.signin({}, function (profile, token) {
        // Success callback
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
      $scope.found = true;
      auth.signout();
      store.remove('profile');
      store.remove('token');
    };

  $scope.showButton = function(){
    return $scope.found;
  }        
}]);