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
      $controller("rylc.ApplicationController", {$scope:$scope});
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

  it('should have undefined rentals after create', function () {
    expect($scope.rentals).toBeUndefined();
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

  describe('totalPrice', function () {
    it('should calculate the total price for a given rental', function () {
      var rental = {
        car:{
          price:100
        },
        hireStartDate:new Date(2010, 0, 1),
        hireEndDate:new Date(2010, 0, 10)
      };
      expect($scope.totalPrice(rental)).toEqual(10 * 100);
    });
  });

  describe('searchRentals', function () {
    it('should define the rentals array', function () {
      $scope.searchRentals();
      expect($scope.rentals).toBeDefined();
      expect($scope.rentals instanceof Array).toBeTruthy();
      expect($scope.rentals.length).toBeGreaterThan(0);
    });
  });

});
