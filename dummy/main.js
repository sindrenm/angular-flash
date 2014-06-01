angular.module("test", ["ngRoute", "flash"])
  .config(function(flashProvider) {
    flashProvider.addType("error", "alert alert-danger");
    flashProvider.addType("success", "alert alert-success");

    flashProvider.clearOnEvent("$routeChangeStart");
  })

  .config(function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "home.html",
        controller: "HomeCtrl"
      })
      .when("/pizza", {
        templateUrl: "pizza.html"
      })
      .otherwise({
        redirectTo: "/pizza"
      });
  })

  .controller("HomeCtrl", function($http, $scope, $timeout, flash) {
    $scope.getColors = function() {
      $http.get($scope.url).success(function(colors) {
        flash.addMessage("success", "Found the colors.");
        $scope.colors = colors;
      })
      .error(function(response) {
        flash.addMessage("error", "Could not get colors.");
        delete $scope.colors;
      });
    };
  });
