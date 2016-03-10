
angular.module('dreamjournal', [
  'ngRoute',
  'dreamjournal.login',
  'dreamjournal.signup',
  'dreamjournal.graph',
  'dreamjournal.profile',
  'dreamjournal.viewPost',
  'dreamjournal.newPost',
  'dreamjournal.home'          
])
.config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/shared/login.view.html',
      controller: 'loginController'
    })
    .when('/signup', {
      templateUrl: 'app/shared/signup.view.html',
      controller: 'signupController'
    })
    .when('/graph', {
      templateUrl: 'app/shared/graph.view.html',
      controller: 'graphController'
    })
    .when('/profile', {
      templateUrl: 'app/shared/profile.view.html',
      controller: 'profileController'
    })
    .when('/viewPost', {
      templateUrl: 'app/shared/view.post.view.html',
      controller: 'viewPostController'
    })
    .when('/newPost', {
      templateUrl: 'app/shared/write.new.post.view.html',
      controller: 'newPostController'
    })
    .when('/', {
      templateUrl: 'app/shared/home.view.html',
      controller: 'homeController'
    })        
}]);
angular.module('dreamjournal.graph', [])

.controller('graphController', ['$scope', function ($scope) {

}]);
angular.module('dreamjournal.home', [])

.controller('homeController', ['$scope', function ($scope) {

}]);
angular.module('dreamjournal.login', [])

.controller('loginController', ['$scope', function ($scope) {

}]);
angular.module('dreamjournal.profile', [])

.controller('profileController', ['$scope', function ($scope) {

}]);
angular.module('dreamjournal.signup', [])

.controller('signupController', ['$scope', function ($scope) {

}]);
angular.module('dreamjournal.viewPost', [])

.controller('viewPostController', ['$scope', function ($scope) {

}]);

angular.module('dreamjournal.newPost', [])

.controller('newPostController', ['$scope', function ($scope) {

}]);