var loserServices = angular.module('loserServices');

loserServices.factory('losersDb', ['$firebase', function ($firebase) {
  var ref = new Firebase('https://faw-biggest-loser.firebaseio.com/losers');
  var sync = $firebase(ref);

  return sync.$asArray();
}]);
