var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('addLoserButton', [function () {
  return {
    restrict: 'E',
    templateUrl: "scripts/add-a-loser/templates/add-loser-button.html",
    controller: 'AddLoserCtrl',
    replace: true
  };
}]);
