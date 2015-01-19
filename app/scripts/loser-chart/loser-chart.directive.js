var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('loserChart', [function () {
  return {
    restrict: 'E',
    controller: 'LoserChartCtrl',
    templateUrl: '/scripts/loser-chart/templates/loser-chart.template.html',
    replace: true,
    link: function (scope, element) {
      scope.canvas = element.find('canvas')[0].getContext('2d');
    },
  };
}]);
