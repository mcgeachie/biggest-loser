var loserControllers = angular.module('loserControllers');

loserControllers.controller('SelectedLoserCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

  $scope.deselectLoser = function () {
    $rootScope.$selectedLoser = null;
  };
}]);
