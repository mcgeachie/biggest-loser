var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('calculateBmiButton', [function () {
  return {
    restrict: 'E',
    templateUrl: "scripts/calculate-bmi/templates/calculate-bmi-button.template.html",
    controller: 'CalculateBmiCtrl',
    replace: true
  };
}]);
