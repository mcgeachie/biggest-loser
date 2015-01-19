var loserControllers = angular.module('loserControllers');

loserControllers.controller('LoserCtrl', ['$scope', '$rootScope', '$modal', '$firebase', function ($scope, $rootScope, $modal, $firebase) {
  $scope.loser.weights = $firebase(new Firebase('https://faw-biggest-loser.firebaseio.com/losers/' + $scope.loser.$id + '/weights')).$asArray();

  $scope.loser.weights.$loaded(function () {
      $scope.loser.$weightsLoaded.resolve('Weight data successfully loaded for ' + $scope.loser.name);
  }, function () {
      $scope.loser.$weightsLoaded.reject('Weight data could not be retrieved for ' + $scope.loser.name);
  });

  $scope.hover = function (loser) {
      return loser.showAdd = !loser.showAdd;
  };

  $scope.selectLoser = function (loser) {
    $rootScope.$selectedLoser = loser;
    $rootScope.$broadcast('loserSelected', loser);
  };

  $scope.addDataPoint = function (loser) {
    $scope.modal = $modal.open({
      templateUrl: 'scripts/loser/templates/add-weight-data.template.html',
      controller: 'AddDataCtrl',
      size: 'sm',
      scope: $scope
    });
  };

  $scope.loser.weights.$watch(function (event) {
    var findLatestDiff = function (loser) {
            var difference;

            $scope.loser.weights.forEach(function (dataPoint) {
              difference = dataPoint.diff;
            });

            return difference;
        };

    $scope.loser.$diff = findLatestDiff($scope.loser);
  });
}]);
