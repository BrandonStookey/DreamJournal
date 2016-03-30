'use strict';

angular.module('dreamjournal.newPost', ['textAngular'])

.controller('newPostController', ['$scope', '$http', 'auth', '$location', 'djMainFactory', function ($scope, $http, auth, $location, djMainFactory) {

  $scope.createPost = function(postTitle, post, dreamNightmare){
    djMainFactory.createPost(postTitle, post, dreamNightmare, auth.profile.identities[0].user_id);
  };
}]);
