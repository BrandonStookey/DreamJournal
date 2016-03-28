'use strict';

angular.module('dreamjournal.search', ['ngSanitize'])

.controller('searchController', ['$scope', '$rootScope', 'djMainFactory', '$http', 'auth', '$interval', function ($scope, $rootScope, djMainFactory,  $http, auth, $interval) {
  $scope.postsData;



  $scope.init= function() {
//======================Get All Blog Posts On Init=====================
    // djMainFactory.getAllPosts();
    djMainFactory.getAllPosts()
    .then(function(data){
      $scope.postsData  = data;
    }); 
  };

  $scope.init();

//==========================Get All User Posts========================== 

  $scope.getUserEmail = function(email){
    djMainFactory.getUserEmail(email);
  };  


}]);














