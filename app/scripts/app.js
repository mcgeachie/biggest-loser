var moviesServices = angular.module('loserServices', []),
    moviesDirectives = angular.module('loserDirectives', ['loserServices']),
    moviesControllers = angular.module('loserControllers', ['loserServices']);

angular.module('biggestLoserApp', ['loserControllers', 'loserDirectives', 'ui.bootstrap']);
