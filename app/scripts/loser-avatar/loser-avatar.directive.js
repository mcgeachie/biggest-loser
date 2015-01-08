var loserDirectives = angular.module('loserDirectives');

loserDirectives.directive('loserAvatar', [function () {
  return {
    restrict: 'E',
    scope: {
      loser: '='
    },
    templateUrl: 'scripts/loser-avatar/templates/loser-avatar.template.html',
    replace: true,
    link: function postLink (scope, element) {
      element.bind('error', function () {
        angular.element(this).attr('src', 'images/grumpy-fat-cat.png');
      });
    }
  };
}]);
