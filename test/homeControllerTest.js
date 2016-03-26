// 'use strict';
var mockAuth = {profile: {} };

describe('homeController', function () {
  var $scope, auth, $rootScope, createController, djMainFactory, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('dreamjournal.home', function($provide){$provide.value('auth', mockAuth);}));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    djMainFactory = $injector.get( 'djMainFactory' );
    $scope = $rootScope.$new();
    
    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('homeController', {
        $scope: $scope,
        djMainFactory: djMainFactory
      });
    };
  }));

  it('should call all posts when controller is loaded', function () {
    var mockPosts = [{},{},{}];
    $httpBackend.expectPOST('/user').respond();   
    $httpBackend.expectGET('/post').respond(mockPosts);
    createController();
    $httpBackend.flush();
    expect($scope.postsData).to.eql(mockPosts);
  });

  it('should create a new user when controller is loaded', function () {
    var mockUser = {name: 'John', email: 'john@john.com'};
    $httpBackend.expectPOST('/user').respond(mockUser);
    $httpBackend.expectGET('/post').respond([]);    
    createController();
    $httpBackend.flush();
    expect($scope.userData[0].data).to.eql(mockUser);
  });  

  it('should have an init method on the $scope', function () {
    createController();
    expect($scope.init).to.be.a('function');
  });
});











