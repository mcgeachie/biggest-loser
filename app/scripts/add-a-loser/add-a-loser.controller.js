var loserControllers = angular.module('loserControllers');

loserControllers.controller('AddLoserCtrl', ['$scope', '$modal', '$templateCache', function ($scope, $modal, $templateCache) {
  var findInitials = function (name) {
        var processedName = name.replace('\'', ''), //For anyone who thinks an apostrophe is valid in a NAME
            initialsArray = processedName.match(/\b(\w)/g),
            initials;

        if (initialsArray.length > 1) {
          initials = initialsArray[0] + initialsArray[initialsArray.length - 1];
        }

        return initials ? initials.toUpperCase() : initials;
      };

  $scope.newUser = {};
  $scope.dateOptions = { startingDay: 1 };
  $scope.dateFormat = 'dd/MM/yyyy';
  $scope.today = new Date();

  $scope.openForm = function () {
    var modal = $modal.open({
      templateUrl: 'scripts/add-a-loser/form/add-loser-form.html',
      controller: 'AddLoserCtrl',
      size: 'sm'
    });
  };

  $scope.openDatepicker = function ($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.datepickerOpen = true;
  };

  $scope.$watch('newUser.name', function(newValue) {
    $scope.newUser.initials = newValue ? findInitials(newValue) : undefined;
  });
}]);
