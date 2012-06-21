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
  }
  ApplicationController.$inject = ["$scope", "$navigate"];

  /*
   * define angular module
   */

  var module = angular.module("rylc-controllers", []);
  module.controller("ApplicationController", ApplicationController);

})(angular);
