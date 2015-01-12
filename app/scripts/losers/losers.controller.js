var loserControllers = angular.module('loserControllers');

loserControllers.controller('LosersCtrl', ['$scope', '$rootScope', '$modal', 'losersDb', function ($scope, $rootScope, $modal, losersDb) {
  $rootScope.losers = losersDb;

  $scope.addDataPoint = function (loser) {
    $scope.modal = $modal.open({
      templateUrl: 'scripts/losers/templates/add-weight-data.template.html',
      controller: 'AddDataCtrl',
      size: 'sm'
    });
  };
}]);
