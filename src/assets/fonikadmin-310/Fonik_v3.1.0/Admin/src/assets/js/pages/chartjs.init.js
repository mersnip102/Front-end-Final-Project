/*
Template Name: Fonik - Admin & Dashboard Template
Author: Themesbrand
Version: 3.1.0
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Chartjs
*/

function getChartColorsArray(chartId) {
    if (document.getElementById(chartId) !== null) {
        var colors = document.getElementById(chartId).getAttribute("data-colors");
        if (colors) {
            colors = JSON.parse(colors);
            return colors.map(function (value) {
                var newValue = value.replace(" ", "");
                if (newValue.indexOf(",") === -1) {
                    var color = getComputedStyle(document.documentElement).getPropertyValue(
                        newValue
                    );
                    if (color) return color;
                    else return newValue;
                } else {
                    var val = value.split(",");
                    if (val.length == 2) {
                        var rgbaColor = getComputedStyle(
                            document.documentElement
                        ).getPropertyValue(val[0]);
                        rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                        return rgbaColor;
                    } else {
                        return newValue;
                    }
                }
            });
        } else {
            console.warn('data-colors Attribute not found on:', chartId);
        }
    }
}


!function ($) {
    "use strict";

    var ChartJs = function () { };

    ChartJs.prototype.respChart = function (selector, type, data, options) {
        Chart.defaults.global.defaultFontColor = "#8791af",
            Chart.defaults.scale.gridLines.color = "rgba(108, 120, 151, 0.1)";
        // get selector by context
        var ctx = selector.get(0).getContext("2d");
        // pointing parent container to make chart js inherit its width
        var container = $(selector).parent();

        // enable resizing matter
        $(window).resize(generateChart);

        // this function produce the responsive Chart JS
        function generateChart() {
            // make chart width fit with its container
            var ww = selector.attr('width', $(container).width());
            switch (type) {
                case 'Line':
                    new Chart(ctx, { type: 'line', data: data, options: options });
                    break;
                case 'Doughnut':
                    new Chart(ctx, { type: 'doughnut', data: data, options: options });
                    break;
                case 'Pie':
                    new Chart(ctx, { type: 'pie', data: data, options: options });
                    break;
                case 'Bar':
                    new Chart(ctx, { type: 'bar', data: data, options: options });
                    break;
                case 'Radar':
                    new Chart(ctx, { type: 'radar', data: data, options: options });
                    break;
                case 'PolarArea':
                    new Chart(ctx, { data: data, type: 'polarArea', options: options });
                    break;
            }
            // Initiate new chart or Redraw

        };
        // run function - render chart at first load
        generateChart();
    },
        //init
        ChartJs.prototype.init = function () {
            //creating lineChart
            var lineChartColors = getChartColorsArray("lineChart");
            var lineChart = {
                labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October"],
                datasets: [
                    {
                        label: "Sales Analytics",
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: lineChartColors[1],
                        borderColor: lineChartColors[0],
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: lineChartColors[0],
                        pointBackgroundColor: lineChartColors[0],
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: lineChartColors[0],
                        pointHoverBorderColor: lineChartColors[2],
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40, 55, 30, 80]
                    },
                    {
                        label: "Monthly Earnings",
                        fill: true,
                        lineTension: 0.5,
                        backgroundColor: lineChartColors[3],
                        borderColor: lineChartColors[2],
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: lineChartColors[2],
                        pointBackgroundColor: lineChartColors[2],
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: lineChartColors[2],
                        pointHoverBorderColor: lineChartColors[2],
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [80, 23, 56, 65, 23, 35, 85, 25, 92, 36]
                    }
                ]
            };

            var lineOpts = {
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 100,
                            min: 20,
                            stepSize: 10
                        }
                    }]
                }
            };

            this.respChart($("#lineChart"), 'Line', lineChart, lineOpts);

            //donut chart
            var donutChartColors = getChartColorsArray("doughnut");
            var donutChart = {
                labels: [
                    "Desktops",
                    "Tablets"
                ],
                datasets: [
                    {
                        data: [300, 210],
                        backgroundColor: donutChartColors,
                        hoverBackgroundColor: donutChartColors,
                        hoverBorderColor: donutChartColors
                    }]
            };
            this.respChart($("#doughnut"), 'Doughnut', donutChart);


            //Pie chart
            var pieChartColors = getChartColorsArray("pie");
            var pieChart = {
                labels: [
                    "Desktops",
                    "Tablets"
                ],
                datasets: [
                    {
                        data: [300, 180],
                        backgroundColor: [
                            pieChartColors[0],
                            pieChartColors[1]
                        ],
                        hoverBackgroundColor: [
                            pieChartColors[0],
                            pieChartColors[1]
                        ],
                        hoverBorderColor: "#fff"
                    }]
            };
            this.respChart($("#pie"), 'Pie', pieChart);


            //barchart
            var barChartColors = getChartColorsArray("bar");
            var barChart = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Sales Analytics",
                        backgroundColor: barChartColors[0],
                        borderColor: barChartColors[0],
                        borderWidth: 1,
                        hoverBackgroundColor: barChartColors[0],
                        hoverBorderColor: barChartColors[0],
                        data: [65, 59, 81, 45, 56, 80, 50, 20]
                    }
                ]
            };
            this.respChart($("#bar"), 'Bar', barChart);


            //radar chart
            var radarChartColors = getChartColorsArray("radar");
            var radarChart = {
                labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                datasets: [
                    {
                        label: "Desktops",
                        backgroundColor: radarChartColors[0],
                        borderColor: radarChartColors[1],
                        pointBackgroundColor: radarChartColors[1],
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: radarChartColors[1],
                        data: [65, 59, 90, 81, 56, 55, 40]
                    },
                    {
                        label: "Tablets",
                        backgroundColor: radarChartColors[2],
                        borderColor: radarChartColors[3],
                        pointBackgroundColor: radarChartColors[3],
                        pointBorderColor: "#fff",
                        pointHoverBackgroundColor: "#fff",
                        pointHoverBorderColor: radarChartColors[3],
                        data: [28, 48, 40, 19, 96, 27, 100]
                    }
                ]
            };
            this.respChart($("#radar"), 'Radar', radarChart);

            //Polar area  chart
            var polarChartColors = getChartColorsArray("polarArea");
            var polarChart = {
                datasets: [{
                    data: [
                        11,
                        16,
                        7,
                        18
                    ],
                    backgroundColor: [
                        polarChartColors[0],
                        polarChartColors[1],
                        polarChartColors[2],
                        polarChartColors[3]
                    ],
                    label: 'My dataset', // for legend
                    hoverBorderColor: "#fff"
                }],
                labels: [
                    "Series 1",
                    "Series 2",
                    "Series 3",
                    "Series 4"
                ]
            };
            this.respChart($("#polarArea"), 'PolarArea', polarChart);
        },
        $.ChartJs = new ChartJs, $.ChartJs.Constructor = ChartJs

}(window.jQuery),

    //initializing
    function ($) {
        "use strict";
        $.ChartJs.init()
    }(window.jQuery);