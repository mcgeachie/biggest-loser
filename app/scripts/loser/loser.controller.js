var loserControllers = angular.module('loserControllers');

loserControllers.controller('LoserCtrl', ['$scope', '$rootScope', '$modal', '$firebase', function ($scope, $rootScope, $modal, $firebase) {
  var differenceFromStartWeight = function (weight) {
          var startWeight = $scope.loser.startWeight.kg,
              onePercentOfStart = startWeight / 100,
              kgDifference = startWeight - weight;

          return Math.round((kgDifference / onePercentOfStart) * 10 ) / 10;
      };

  $scope.loser.weights = $firebase(new Firebase('https://faw-biggest-loser.firebaseio.com/losers/' + $scope.loser.$id + '/weights')).$asArray();

  $scope.hover = function (loser) {
    return loser.showAdd = !loser.showAdd;
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
    $scope.loser.difference = event.prevChild ? differenceFromStartWeight($scope.loser.weights.$getRecord(event.key).kg) : 0;
  });
}]);
