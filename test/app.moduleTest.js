// 'use strict';
var mockAuth = {profile: {} };

describe('Dreamjounral djMainfactory', function () {
  var $scope, auth, $rootScope, djMainFactory, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('dreamjournal.services', function($provide){$provide.value('auth', mockAuth);}));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    djMainFactory = $injector.get( 'djMainFactory' );
    $scope = $rootScope.$new();
    
    var $controller = $injector.get('$controller');
  }));

  it('should call all posts when getAllPosts function is invoked', function () {
    var mockPosts = [{_id: 1},{_id: 2},{_id: 3}];  
    $httpBackend.expectGET('/post').respond(mockPosts);
    djMainFactory.getAllPosts();
    $httpBackend.flush();
    expect(djMainFactory.allPostsData).to.eql([{_id: 3},{_id: 2},{_id: 1}]);
  });

  it('should call all user posts when getAllUserPosts function is invoked', function () {
    var mockPosts = [{_id: 1},{_id: 2},{_id: 3}];  
    $httpBackend.expectGET('/user/' + 'bob@bobmail.com').respond(mockPosts);
    djMainFactory.getAllUserPosts('bob@bobmail.com');
    $httpBackend.flush();
    expect(djMainFactory.userPostsData).to.eql([{_id: 3},{_id: 2},{_id: 1}]);
  });

  it('should create a new user when createUser function is invoked', function () {
    var mockUser = {name: 'John', email: 'john@john.com'};
    $httpBackend.expectPOST('/user').respond(mockUser);
    djMainFactory.createUser();    
    $httpBackend.flush();
    expect(djMainFactory.userData[0].data).to.eql(mockUser);
  });  

});



