var loserControllers = angular.module('loserControllers');

loserControllers.controller('CalculateBmiCtrl', ['$scope', '$modal', 'calculateBmi', function ($scope, $modal, calculateBmi) {
  $scope.calculateBmi = function () {
    $scope.bmi = ($scope.weight && $scope.height) ? calculateBmi($scope.weight, $scope.height) : null;
  };

  $scope.openBmiForm = function () {
    $scope.modal = $modal.open({
      templateUrl: 'scripts/calculate-bmi/templates/calculate-bmi-form.template.html',
      controller: 'CalculateBmiCtrl',
      size: 'sm'
    });
  };

  $scope.cancelBmiForm = function () {
    $scope.modal.dismiss();
  };

  $scope.$watch('weight', function () { $scope.calculateBmi() });
  $scope.$watch('height', function () { $scope.calculateBmi() });
}]);
