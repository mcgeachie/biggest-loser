var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('loser', [function () {
  return {
    restrict: 'E',
    controller: 'LoserCtrl',
    scope: {
      loser: '='
    },
    templateUrl: '/scripts/loser/templates/loser.template.html',
    replace: true
  };
}]);
