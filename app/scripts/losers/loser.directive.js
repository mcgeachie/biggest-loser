var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('loser', [function () {
  return {
    restrict: 'E',
    controller: 'LoserCtrl',
    scope: {
      loser: '='
    },
    templateUrl: '/scripts/losers/templates/loser.template.html',
    replace: true
  };
}]);
