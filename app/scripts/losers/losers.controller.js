var loserControllers = angular.module('loserControllers');

loserControllers.controller('LoserCtrl', ['$scope', '$rootScope', 'losersDb', function ($scope, $rootScope, losersDb) {
  $rootScope.losers = losersDb;
}]);
