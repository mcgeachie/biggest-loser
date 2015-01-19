var loserControllers = angular.module('loserControllers');

loserControllers.controller('LoserChartCtrl', ['$scope', '$rootScope', 'sortDate', 'findInitials', function ($scope, $rootScope, sortDate, findInitials) {
  var renderAvatars = function () {
        $scope.chart.datasets.forEach(function (dataset) {
          var latestPoint = dataset.points[dataset.points.length - 1],
              initials = findInitials(dataset.label);

          if (initials) $scope.canvas.fillText(initials, latestPoint.x + 25, latestPoint.y);
        });
      };

  $scope.renderChart = function (losers) {
    var defaults = {
          strokeColor: "rgba(255, 255, 255, 0.5)",
          pointColor: "rgba(255, 255, 255, 1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#f94931",
          pointHighlightStroke: "rgba(255, 255, 255, 1)"
        },
        labels = [],
        datasets = [];

    losers.forEach(function (loser) {

      for (var dateKey in loser.weights) {
        var date = moment(loser.weights[dateKey].datePoint).format('DD/MM/YYYY');

        if (labels.indexOf(date) == -1) labels.push(date);
      }
    });

    labels.sort(sortDate);

    losers.forEach(function (loser) {

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
          } else if (dataset.data.length > 0) {
            diff = dataset.data[dataset.data.length - 1];
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

    $scope.chart = new Chart($scope.canvas).Line(data, {
      onAnimationComplete: function () { renderAvatars() },
      bezierCurve: false,
      scaleLineColor: "rgba(255, 255, 255, 0.5)",
      scaleGridLineColor : "rgba(255, 255, 255, 0.1)",
      scaleFontColor: "#fff",
      scaleLabel: "<%=value%> %",
      scaleShowVerticalLines: false,
      showTooltips: false,
      responsive: true,
      datasetFill: false,
    });
  };

  $rootScope.$on('losersLoaded', function (event, losers) {
    $scope.renderChart(losers);
  });

  // $rootScope.$on('loserSelected', function (event, loser) {
  //   $scope.renderChart([ loserArray ]);
  // });
}]);
