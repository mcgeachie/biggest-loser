var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('losersList', [function () {
  return {
    restrict: 'E',
    controller: 'LoserCtrl',
    templateUrl: '/scripts/losers/templates/losers-list.template.html',
    replace: true
  };
}]);
