var loserServices = angular.module('loserServices');

loserServices.factory('findInitials', [function () {
  return function (name){
    var processedName = name.replace('\'', ''), //For anyone who thinks an apostrophe is valid in a NAME
    initialsArray = processedName.match(/\b(\w)/g),
    initials;

    if (initialsArray && initialsArray.length > 1) {
      initials = initialsArray[0] + initialsArray[initialsArray.length - 1];
    }

    return initials ? initials.toUpperCase() : initials;
  };
}]);
