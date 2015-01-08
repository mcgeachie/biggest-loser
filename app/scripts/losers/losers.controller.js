var loserControllers = angular.module('loserControllers');

loserControllers.controller('LoserCtrl', ['$scope', '$rootScope', 'losersDb', 'calculateBmi', function ($scope, $rootScope, losersDb, calculateBmi) {
  $rootScope.losers = losersDb;

  $scope.calculateBmi = function () {
    $scope.bmi = calculateBmi($scope.weight, $scope.height);
  }
}]);
