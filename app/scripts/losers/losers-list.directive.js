var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('losersList', [function () {
  return {
    restrict: 'E',
    controller: 'LosersCtrl',
    templateUrl: '/scripts/losers/templates/losers-list.template.html',
    replace: true
  };
}]);
