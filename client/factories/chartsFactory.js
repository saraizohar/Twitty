define(function () {
    function ChartsFactory($q) {

        var isFirstTimeDraw = true;

        function drawPieChart(analyzedData, titleStr, activeTab, col1, col2) {

            var chartData = [[col1, col2]];
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

        function drawLineChart(analyzedData, titleStr, activeTab) {
        }

        function drawHistogramChart(analyzedData, titleStr, activeTabmm, col1, col2) {
            
        }

        function drawBarChart(analyzedData, titleStr, activeTab, col1, col2) {
            debugger;
            var chartData = [[col1, col2, { role: 'style' }]];
            angular.forEach(analyzedData, function (value, key) {
                chartData.push([key, value, 'color: #e5e4e2']);
            }, this);

            var data = google.visualization.arrayToDataTable(chartData);

            var view = new google.visualization.DataView(data);
            view.setColumns([0, 1,
                             {
                                 calc: "stringify",
                                 sourceColumn: 1,
                                 type: "string",
                                 role: "annotation"
                             },
                             2]);

            var options = {
                title: titleStr,
                width: 600,
                height: 400,
                bar: { groupWidth: "95%" },
                legend: { position: "none" },
            };
            var chart = new google.visualization.BarChart(document.getElementById(activeTab));
            chart.draw(view, options);
        }

        return {
            drawChart: function (analyzedData, titleStr, activeTab, chartType, col1, col2) {
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
                                drawPieChart(analyzedData, titleStr, activeTab, col1, col2);
                                break;
                            case "histogram":
                                drawHistogramChart(analyzedData, titleStr, activeTab, col1, col2);
                                break;
                            case "barChart":
                                drawBarChart(analyzedData, titleStr, activeTab, col1, col2);
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