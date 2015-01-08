var loserServices = angular.module('loserServices');

loserServices.factory('calculateBmi', [function () {
  return function (weight, height) {
    var heightInMetres = height / 100;

    return (weight / heightInMetres) / heightInMetres;
  }
}]);
