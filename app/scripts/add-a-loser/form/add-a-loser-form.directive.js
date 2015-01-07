var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('addLoserForm', [function () {
  return {
    restrict: 'E',
    templateUrl: "scripts/add-a-loser/form/add-loser-form.html",
    controller: 'AddLoserCtrl',
    replace: true
  };
}]);
