describe('ApplicationController', function () {
  var $scope, $navigate;

  beforeEach(function () {
    module('rylc-controllers', function ($provide) {
      $provide.factory('$navigate', function () {
        $navigate = jasmine.createSpy();
        return $navigate;
      });
    });
    inject(function ($rootScope, $controller) {
      $scope = $rootScope.$new();
      $controller("ApplicationController", {$scope:$scope});
    });
  });

  it('should create new application controller scope', function () {
    expect($scope).not.toBeUndefined();
  });

  it('should have falsy username and password after create', function () {
    expect($scope.username).toBeFalsy();
    expect($scope.password).toBeFalsy();
  });

  it('should have an undefined customer after create', function () {
    expect($scope.customer).toBeUndefined();
  });

  describe('loginPossible', function () {
    it('should return false when username or passwort is empty', function () {
      $scope.username = "";
      $scope.password = "";
      expect($scope.loginPossible()).toBeFalsy();
      $scope.username = "someUsername";
      $scope.password = "";
      expect($scope.loginPossible()).toBeFalsy();
      $scope.username = "";
      $scope.password = "somePassword";
      expect($scope.loginPossible()).toBeFalsy();
    });

    it('should return true when username and password is not empty', function () {
      $scope.username = "someUsername";
      $scope.password = "somePassword";
      expect($scope.loginPossible()).toBeTruthy();
    });
  });

  describe('login', function () {
    it('should navigate to the welcomePage', function () {
      $scope.login();
      expect($navigate).toHaveBeenCalledWith("#welcomePage");
    });

    it('should set customer', function () {
      $scope.username = "someUsername";
      $scope.login();
      expect($scope.customer).toBeDefined();
      expect($scope.customer.name).toBe("someUsername");
    });
  });

});
