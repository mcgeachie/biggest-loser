var loserServices = angular.module('loserServices');

loserServices.filter('emptyAvatar', [function () {
  return function (input) {
    return input;
  }
}]);
