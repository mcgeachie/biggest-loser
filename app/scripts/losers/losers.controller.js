var loserControllers = angular.module('loserControllers');

loserControllers.controller('LosersCtrl', ['$scope', '$rootScope', '$q', '$modal', 'losersDb', function ($scope, $rootScope, $q, $modal, losersDb) {
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
    var ctx = document.getElementById("myChart").getContext("2d"),
        defaults = {
          strokeColor: "rgba(255, 255, 255, 0.5)",
          pointColor: "rgba(255, 255, 255, 1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#f94931",
          pointHighlightStroke: "rgba(255, 255, 255, 1)"
        },
        sortDate = function (date, otherDate) {
          return moment(date).isAfter(otherDate) ? 1 : -1;
        },
        labels = [],
        datasets = [];

        $scope.losers.forEach(function (loser) {
          var dataset = jQuery.extend({}, defaults, {
                label: loser.name,
                data: []
              });

          for (var dateKey in loser.weights) {

            var date = moment(loser.weights[dateKey].datePoint).format('DD/MM/YYYY');

            if (labels.indexOf(date) == -1) labels.push(date);
          }

          labels.sort(sortDate);

          console.log(labels);

          for (var i = 0; i < labels.length; i++) {

            var diff = 0;

            console.groupCollapsed(labels[i]);

            for (var weightKey in loser.weights) {
              var formattedDate = moment(loser.weights[weightKey].datePoint).format('DD/MM/YYYY')

              console.log('datePoint', formattedDate);
              console.log('label', labels[i]);

              console.log('equals', formattedDate == labels[i])

              if (formattedDate == labels[i]) {
                diff = loser.weights[weightKey].diff
              }

              dataset.data.push(diff);
            }

            console.groupEnd();
          }

          // console.log(dataset);

          datasets.push(dataset);
        });

        //add date label one week after last available date

        console.log('after all losers', labels);

        data = {
          labels: labels,
          datasets: datasets
        };
    //TODO: loop through data and create dates programatically then match datapoints to dates whilst looping and preserve indices

    $scope.chart = new Chart(ctx).Line(data, {
      scaleLineColor: "rgba(255, 255, 255, 0.5)",
      scaleGridLineColor : "rgba(255, 255, 255, 0.1)",
      scaleFontColor: "#fff",
      scaleLabel: "<%=value%> %",
      showTooltips: false,
      responsive: true,
      datasetFill: false
    });
  };
}]);
