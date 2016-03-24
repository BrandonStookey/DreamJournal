// 'use strict';
var mockAuth = {profile: {} };

describe('profileController', function () {
  var $scope, auth, $rootScope, createController, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('dreamjournal.profile', function($provide){$provide.value('auth', mockAuth);}));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('profileController', {
        $scope: $scope,
      });
    };
  }));

  it('should call all user posts when controller is loaded', function () {
    var mockPosts = [{},{},{}]; 
    $httpBackend.expectPOST('/get/all/user/posts').respond(mockPosts);
    createController();
    $httpBackend.flush();
    expect($scope.postsData).to.eql(mockPosts);
  }); 

  it('should have an init method on the $scope', function () {
    createController();
    expect($scope.init).to.be.a('function');
  });
});











