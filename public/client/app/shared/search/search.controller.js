'use strict';

angular.module('dreamjournal.search', ['ngSanitize'])

.controller('searchController', ['$scope', '$rootScope', 'djMainFactory', '$http', 'auth', '$interval', function ($scope, $rootScope, djMainFactory,  $http, auth, $interval) {

  $scope.userAlreadyFound = {};
  $scope.postsData;
  $scope.userList = [];


  $scope.init= function() {
//======================Get All Blog Posts On Init=====================
    // djMainFactory.getAllPosts();
    djMainFactory.getAllPosts()
    .then(function(data){
      $scope.postsData  = data;

      for(var i = 0; i < $scope.postsData.length; i++){
        var key = $scope.postsData[i].email;
        if(!$scope.userAlreadyFound[key]){
          if(key != auth.profile.email){
            $scope.userAlreadyFound[key] = key;
            $scope.userList.push($scope.postsData[i]);
          }
        }
      }



    }); 
  };

  $scope.init();

//==========================Get All User Posts========================== 

  $scope.getUserEmail = function(email){
    djMainFactory.getUserEmail(email);
  };  


}]);














