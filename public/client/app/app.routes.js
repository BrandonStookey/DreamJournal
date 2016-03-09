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
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: 'app/shared/login.view.html',
      controller: 'loginController'
    })
    .when("/signup", {
      templateUrl: 'app/shared/signup.view.html',
      controller: 'signupController'
    })
    .when("/graph", {
      templateUrl: 'app/shared/graph.view.html',
      controller: 'graphController'
    })
    .when("/profile", {
      templateUrl: 'app/shared/profile.view.html',
      controller: 'profileController'
    })
    .when("/viewPost", {
      templateUrl: 'app/shared/view.post.view.html',
      controller: 'viewPostController'
    })
    .when("/newPost", {
      templateUrl: 'app/shared/write.new.post.view.html',
      controller: 'newPostController'
    })
    .when("/", {
      templateUrl: 'app/shared/home.view.html',
      controller: 'homeController'
    })        
});