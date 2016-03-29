'use strict';

angular.module('dreamjournal', [
  'dreamjournal.services',
  'dreamjournal.graphservices',
  'dreamjournal.loginservices',
  'dreamjournal.login',  
  'dreamjournal.graph',
  'dreamjournal.profile',
  'dreamjournal.search',
  'dreamjournal.otherusers',
  'dreamjournal.viewPost',
  'dreamjournal.newPost',
  'dreamjournal.home',
  'auth0',
  'angular-storage',
  'angular-jwt',          
  'ngRoute'
])
.config(['$routeProvider', '$httpProvider', 'authProvider', 'jwtInterceptorProvider', function($routeProvider, $httpProvider, authProvider, jwtInterceptorProvider) {
  $routeProvider
    .when('/login', {
      templateUrl: 'app/shared/login/login.view.html',
      controller: 'loginController',
      requiresLogin: true
    })  
    .when('/graph', {
      templateUrl: 'app/shared/graph/graph.view.html',
      controller: 'graphController',
      requiresLogin: true
    })
    .when('/profile', {
      templateUrl: 'app/shared/profile/profile.view.html',
      controller: 'profileController',
      requiresLogin: true      
    })
    .when('/search', {
      templateUrl: 'app/shared/search/search.view.html',
      controller: 'searchController',
      requiresLogin: true      
    })    
    .when('/otherusers', {
      templateUrl: 'app/shared/otherUsers/otherUsers.view.html',
      controller: 'otherUsersController',
      requiresLogin: true
    })      
    .when('/viewPost', {
      templateUrl: 'app/shared/viewSinglePost/view.post.view.html',
      controller: 'viewPostController',
      requiresLogin: true      
    })
    .when('/newPost', {
      templateUrl: 'app/shared/writeNewPost/write.new.post.view.html',
      controller: 'newPostController',
      requiresLogin: true        
    })
    .when('/home', {
      templateUrl: 'app/shared/home/home.view.html',
      controller: 'homeController',    
      requiresLogin: true           
    })        
    .when('/', {
      templateUrl: 'app/shared/login/login.view.html',
      controller: 'loginController'    
    })

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
          $rootScope.signedIn = true;          
        }
      } else {
        // Either show the login page or use the refresh token to get a new idToken
        $rootScope.signedIn = false;        
        $location.path('/home');
      }
    }
  });
});







