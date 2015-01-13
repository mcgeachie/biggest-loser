var loserControllers = angular.module('loserControllers');

loserControllers.controller('LosersCtrl', ['$scope', '$rootScope', '$modal', 'losersDb', function ($scope, $rootScope, $modal, losersDb) {
  $rootScope.losers = losersDb;

  $scope.addDataPoint = function (loser) {
    $scope.modal = $modal.open({
      templateUrl: 'scripts/losers/templates/add-weight-data.template.html',
      controller: 'AddDataCtrl',
      size: 'sm'
    });
  };

  $scope.renderChart = function () {
    var ctx = document.getElementById("myChart").getContext("2d"),
        data = {
          // labels: ['05/01/2015', '12/01/2015', '19/01/2015', '26/01/2015', '02/02/2015'],
          labels: ['05/01/2015', '12/01/2015', '19/01/2015'],
          datasets: [
            {
              label: "Ben McGeachie",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-3.4']
            },
            {
              label: "Stephanie Holmes",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-1.4']
            },
            {
              label: "Priyesh Mistry",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-1']
            },
            {
              label: "Jordan Drake",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-2.6']
            },
            {
              label: "Jess Hytten",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '0']
            },
            {
              label: "Steve Wells",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-1.4']
            },
            {
              label: "Deniz Kalfa",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-0.5']
            },
            {
              label: "Kimberley Brown",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-3.5']
            },
            {
              label: "Sarah O'Callaghan",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-0.7']
            },
            {
              label: "Rachel Brown",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-1.2']
            },
            {
              label: "Anne McLaughlin",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '-2.8']
            },
            {
              label: "Gavin McNair",
              strokeColor: "rgba(255, 255, 255, 0.5)",
              pointColor: "rgba(255, 255, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#f94931",
              pointHighlightStroke: "rgba(255, 255, 255, 1)",
              data: ['0', '0']
            }
          ]
        };
    //TODO: loop through data and create datasets programatically

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

  $scope.renderChart();
}]);
