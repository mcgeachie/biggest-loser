var loserControllers = angular.module('loserControllers');

loserControllers.controller('LosersCtrl', ['$scope', '$rootScope', '$q', '$modal', 'losersDb', function ($scope, $rootScope, $q, $modal, losersDb) {

  $rootScope.losers = losersDb;

  $rootScope.losers.$loaded(function () {
    var losersWeightsLoaded = [];

    $rootScope.losers.forEach(function (loser) {
      loser.$weightsLoaded = $q.defer();
      losersWeightsLoaded.push(loser.$weightsLoaded);
    });

    $q.all(losersWeightsLoaded).then(function (diff) {
      $rootScope.$broadcast('losersLoaded', $rootScope.losers);
    }, function (reason) {
      console.log(reason);
    });
  }, function () {
    console.log('Unable to load Losers\' data');
  });

  $scope.addDataPoint = function (loser) {
    $scope.modal = $modal.open({
      templateUrl: 'scripts/losers/templates/add-weight-data.template.html',
      controller: 'AddDataCtrl',
      size: 'sm'
    });
  };
}]);
