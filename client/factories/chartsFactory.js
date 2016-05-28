define(function () {
    function ChartsFactory($q) {

        var isFirstTimeDraw = true;

        function drawPieChart(analyzedData, titleStr, activeTab) {

            var chartData = [['Task', 'Hours per Day']];
            angular.forEach(analyzedData, function (value, key) {
                chartData.push([key, value]);
            }, this);


            var data = google.visualization.arrayToDataTable(chartData);

            var options = {
                title: titleStr,
                width: 900,
                height: 500
            };

            var chart = new google.visualization.PieChart(document.getElementById(activeTab));
            chart.draw(data, options);
        }

        function drawLineChart() {
        }

        function drawHistogramChart() {
        }

        return {
            drawChart: function (analyzedData, titleStr, activeTab, chartType) {
                debugger;
                return $q(function (resolve, reject) {
                    if (isFirstTimeDraw) {
                        google.charts.load("current", { packages: ["corechart"] });
                        google.charts.setOnLoadCallback(drawChart);
                    } else {
                        drawChart();
                    }

                    function drawChart() {
                        switch (chartType) {
                            case "pieChart":
                                drawPieChart(analyzedData, titleStr, activeTab);
                                break;
                        }

                        isFirstTimeDraw = false;
                        resolve();
                    }
                });

                
            }
        }
    }

    return ChartsFactory;
});