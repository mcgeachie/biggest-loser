var loserControllers = angular.module('loserControllers');

loserControllers.controller('LosersCtrl', ['$scope', '$rootScope', '$q', '$modal', 'losersDb', function ($scope, $rootScope, $q, $modal, losersDb) {
  var sortDate = function (date, otherDate) {
          return moment(date).isAfter(otherDate) ? 1 : -1;
      };

  $rootScope.losers = losersDb;

  $rootScope.losers.$loaded(function () {
    var losersWeightsLoaded = [];

    $rootScope.losers.forEach(function (loser) {
      loser.$weightsLoaded = $q.defer();
      losersWeightsLoaded.push(loser.$weightsLoaded);
    });

    $q.all(losersWeightsLoaded).then(function (diff) {
      $scope.renderChart();
    }, function (reason) {
      console.log(reason);
    });
  }, function () {
    console.log('Unable to load Losers\' data');
  });

  $scope.addDataPoint = function (loser) {
    $scope.modal = $modal.open({
      templateUrl: 'scripts/losers/templates/add-weight-data.template.html',
      controller: 'AddDataCtrl',
      size: 'sm'
    });
  };

  $scope.renderChart = function () {
    var ctx = document.getElementById("loserChart").getContext("2d"),
        defaults = {
          strokeColor: "rgba(255, 255, 255, 0.5)",
          pointColor: "rgba(255, 255, 255, 1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#f94931",
          pointHighlightStroke: "rgba(255, 255, 255, 1)"
        },
        labels = [],
        datasets = [];

    $scope.losers.forEach(function (loser) {

      for (var dateKey in loser.weights) {
        var date = moment(loser.weights[dateKey].datePoint).format('DD/MM/YYYY');

        if (labels.indexOf(date) == -1) labels.push(date);
      }
    });

    labels.sort(sortDate);

    $scope.losers.forEach(function (loser) {

      var dataset = jQuery.extend({}, defaults, {
              label: loser.name,
              initials: loser.initials,
              data: []
          });

      for (var i = 0; i < labels.length; i++) {
        var correspondingDataFound,
            diff = 0;

        for (var weightKey in loser.weights) {

          if (moment(loser.weights[weightKey].datePoint).format('DD/MM/YYYY') == labels[i]) {
            correspondingDataFound = true;
            diff = loser.weights[weightKey].diff;
            break;
          }
        };

        dataset.data.push(diff);
      };

      datasets.push(dataset);
    });

    labels.push(moment(labels[labels.length - 1], 'DD/MM/YYYY').add(1, 'weeks').format('DD/MM/YYYY'));

    data = {
      labels: labels,
      datasets: datasets
    };

    function renderAvatars() {

      var findInitials = function (name) {
        var processedName = name.replace('\'', ''), //For anyone who thinks an apostrophe is valid in a NAME
        initialsArray = processedName.match(/\b(\w)/g),
        initials;

        if (initialsArray.length > 1) {
          initials = initialsArray[0] + initialsArray[initialsArray.length - 1];
        }

        return initials ? initials.toUpperCase() : initials;
      };

      $scope.chart.datasets.forEach(function (dataset) {
        var latestPoint = dataset.points[dataset.points.length - 1],
            avatarImage = new Image(),
            initials = findInitials(dataset.label);

        console.groupCollapsed(dataset.label);
        console.log(dataset);
        console.log(latestPoint.x);
        console.log(latestPoint.y);
        console.groupEnd();

        avatarImage.onload = function () {
          if (initials) ctx.drawImage(avatarImage, latestPoint.x - 20, latestPoint.y - 20, 40, 40);
        };

        avatarImage.onerror = function () {
          avatarImage.src = '/images/grumpy-fat-cat.png';
        };

        avatarImage.src = 'http://avatar.faw.bskyb.com/display/' + initials;
      });
    };

    $scope.chart = new Chart(ctx).Line(data, {
      // onAnimationComplete: function () { renderAvatars() }
      scaleLineColor: "rgba(255, 255, 255, 0.5)",
      scaleGridLineColor : "rgba(255, 255, 255, 0.1)",
      scaleFontColor: "#fff",
      scaleLabel: "<%=value%> %",
      showTooltips: false,
      responsive: true,
      datasetFill: false,
    });
  };
}]);
