var loserControllers = angular.module('loserControllers');

loserControllers.controller('AddLoserCtrl', ['$scope', '$modal', '$rootScope', function ($scope, $modal, $rootScope) {
  var findInitials = function (name) {
        var processedName = name.replace('\'', ''), //For anyone who thinks an apostrophe is valid in a NAME
            initialsArray = processedName.match(/\b(\w)/g),
            initials;

        if (initialsArray.length > 1) {
          initials = initialsArray[0] + initialsArray[initialsArray.length - 1];
        }

        return initials ? initials.toUpperCase() : initials;
      },
      resetNewLoser = function () {
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
    $rootScope.losers.$add({
      name: $scope.newLoser.name,
      initials: $scope.newLoser.initials,
      height: $scope.newLoser.height,
      startWeight: {
        kg: $scope.newLoser.startWeight,
        datePoint: $scope.newLoser.startDate.toString()
      },
      weights: [
        {
          kg: $scope.newLoser.startWeight,
          datePoint: $scope.newLoser.startDate.toString()
        }
      ]
    });
    $scope.cancelForm();
  };

  $scope.$watch('newLoser.name', function(newValue) {
    $scope.newLoser.initials = newValue ? findInitials(newValue) : undefined;
  });

  resetNewLoser();
}]);
