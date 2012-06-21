(function (angular) {

  /*
   * Application Controller
   */

  function ApplicationController($scope, $navigate) {
    $scope.username = "";
    $scope.password = "";

    $scope.login = function() {
      $scope.customer = {
        name: $scope.username
      };
      $navigate("#welcomePage");
    };

    $scope.loginPossible = function() {
      return $scope.username && $scope.password;
    };

    $scope.searchRentals = function() {
      $scope.rentals = [
        {"car":{"description":"Meriva", "id":988, "manufacturer":"Opel", "price":65.50}, "hireEndDate":new Date(2011, 10, 07), "hireStartDate":new Date(2011, 10, 07), "id":178},
        {"car":{"description":"Golf", "id":995, "manufacturer":"VW", "price":72.00}, "hireEndDate":new Date(2011, 11, 06), "hireStartDate":new Date(2011, 11, 05), "id":179},
        {"car":{"description":"Golf", "id":1008, "manufacturer":"VW", "price":72.00}, "hireEndDate":new Date(2011, 11, 13), "hireStartDate":new Date(2011, 11, 13), "id":180}
      ];
    };

    $scope.totalPrice = function(rental) {
        var delta = (rental.hireEndDate-rental.hireStartDate);
        var daysRented = delta/1000/60/60/24;
        return rental.car.price * (1+daysRented);
    };
  }
  ApplicationController.$inject = ["$scope", "$navigate"];

  /*
   * define angular module
   */

  var module = angular.module("rylc-controllers", []);
  module.controller("rylc.ApplicationController", ApplicationController);

})(angular);
