var loserServices = angular.module('loserServices');

loserServices.factory('sortDate', [function () {
  var sortByDateAscending = function (date, otherDate) {
    return moment(date).isAfter(otherDate) ? 1 : -1;
  };

  return sortByDateAscending;
}]);
