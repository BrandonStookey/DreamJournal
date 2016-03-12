"use strict";

describe('loginController', function () {
  var $scope, $rootScope, createController, $httpBackend;

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('dreamjournal'));
  beforeEach(inject(function($injector) {

    // mock out our dependencies
    $rootScope = $injector.get('$rootScope');
    $httpBackend = $injector.get('$httpBackend');
    $scope = $rootScope.$new();

    var $controller = $injector.get('$controller');

    createController = function () {
      return $controller('loginController', {
        $scope: $scope,
      });
    };
  }));


  it('should have a login method on the $scope', function () {
    createController();
    expect($scope.login).to.be.a('function');
  });

  it('should have a logout method on the $scope', function () {
    createController();
    expect($scope.logout).to.be.a('function');
  });  

});
