var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('selectedLoser', [function () {
  return {
    restrict: 'E',
    controller: 'SelectedLoserCtrl',
    templateUrl: '/scripts/selected-loser/templates/selected-loser.template.html',
    replace: true
  };
}]);
