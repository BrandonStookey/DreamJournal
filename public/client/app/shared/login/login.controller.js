'use strict';
angular.module('dreamjournal.login', [])

.controller('loginController', ['$scope', '$http', 'auth', 'store', '$location',
function ($scope, $http, auth, store, $location) {
/////////User will login using Auth0///////////////
  $scope.login = function () {
    auth.signin({}, function (profile, token) {
      // Success callback
      store.set('profile', profile);
      store.set('token', token);
      $location.path('/');
    }, function () {
      // Error callback
    });
  },		
///////////User logs out using Auth0////////////////
  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
  };

}]);






