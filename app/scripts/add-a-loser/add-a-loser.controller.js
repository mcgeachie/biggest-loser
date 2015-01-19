var loserControllers = angular.module('loserControllers');

loserControllers.controller('AddLoserCtrl', ['$scope', '$modal', '$rootScope', 'calculateBmi', 'findInitials', function ($scope, $modal, $rootScope, calculateBmi, findInitials) {
  var resetNewLoser = function () {
        $scope.newLoser = {};
      };

  $scope.dateOptions = { startingDay: 1 };
  $scope.today = new Date();

  $scope.openForm = function () {
    $scope.modal = $modal.open({
      templateUrl: 'scripts/add-a-loser/templates/add-loser-form.html',
      controller: 'AddLoserCtrl',
      size: 'sm'
    });
  };

  $scope.cancelForm = function () {
    resetNewLoser();
    $scope.modal.dismiss();
  };

  $scope.openDatepicker = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.datepickerOpen = true;
  };

  $scope.addLoser = function () {
    var weight = $scope.newLoser.startWeight,
        bmi = calculateBmi(weight, $scope.newLoser.height);

    $rootScope.losers.$add({
      name: $scope.newLoser.name,
      initials: $scope.newLoser.initials,
      height: $scope.newLoser.height,
      startWeight: {
        kg: weight,
        datePoint: $scope.newLoser.startDate.toString(),
        bmi: bmi
      },
      weights: [
        {
          kg: weight,
          datePoint: $scope.newLoser.startDate.toString(),
          diff: 0,
          bmi: bmi
        }
      ]
    });
    //TODO: Create 'weights' using Firebase method as array
    $scope.cancelForm();
  };

  $scope.$watch('newLoser.name', function(newValue) {
    $scope.newLoser.initials = newValue ? findInitials(newValue) : undefined;
  });

  resetNewLoser();
}]);
