'use strict';

angular.module('dreamjournal', [
  'ngRoute',
  'dreamjournal.login',
  'dreamjournal.graph',
  'dreamjournal.profile',
  'dreamjournal.viewPost',
  'dreamjournal.newPost',
  'dreamjournal.home',
  'auth0',
  'angular-storage',
  'angular-jwt'          
])
.config(['$routeProvider', '$httpProvider', 'authProvider', 'jwtInterceptorProvider', function($routeProvider, $httpProvider, authProvider, jwtInterceptorProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/shared/login.view.html',
      controller: 'loginController'
    })
    .when('/graph', {
      templateUrl: 'app/shared/graph.view.html',
      controller: 'graphController',
      requiresLogin: true
    })
    .when('/profile', {
      templateUrl: 'app/shared/profile.view.html',
      controller: 'profileController',
      requiresLogin: true      
    })
    .when('/viewPost', {
      templateUrl: 'app/shared/view.post.view.html',
      controller: 'viewPostController',
      requiresLogin: true      
    })
    .when('/newPost', {
      templateUrl: 'app/shared/write.new.post.view.html',
      controller: 'newPostController',
      requiresLogin: true      
    })
    .when('/home', {
      templateUrl: 'app/shared/home.view.html',
      controller: 'homeController',
      requiresLogin: true      
    })        
    .when('/', {
      templateUrl: 'app/shared/home.view.html',
      controller: 'homeController',
      requiresLogin: true      
    });       
}])
.config(['authProvider', 'jwtInterceptorProvider', '$httpProvider', function (authProvider, jwtInterceptorProvider, $httpProvider) {
  // https://manage.auth0.com/#/applications/1lZ3sYfpkqI5yJkeFXYscvLsR7dnG7q2/quickstart Just In case I need a refresher
  authProvider.init({
    domain: 'dreamjournal.auth0.com',
    clientID: '1lZ3sYfpkqI5yJkeFXYscvLsR7dnG7q2',
    callbackURL: location.href,    
    loginUrl: '/login'
      // We're annotating this function so that the `store` is injected correctly when this file is minified
  });
  jwtInterceptorProvider.tokenGetter = ['store', function(store) {
    // Return the saved token
    return store.get('token');
  }];

    $httpProvider.interceptors.push('jwtInterceptor');  
}])
.run(function($rootScope, auth, store, jwtHelper, $location) {
  // This events gets triggered on refresh or URL change
  $rootScope.$on('$locationChangeStart', function() {
    var token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $location.path('/login');
      }
    }
  });
});









