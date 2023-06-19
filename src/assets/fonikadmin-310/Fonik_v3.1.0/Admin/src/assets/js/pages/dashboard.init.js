/*
Template Name: Fonik - Admin & Dashboard Template
Author: Themesbrand
Version: 3.1.0
Website: https://themesbrand.com/
Contact: themesbrand@gmail.com
File: Dashboard
*/

 // get colors array from the string

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

function ChartColorChange(chartupdate, chartId) {
    document.querySelectorAll(".theme-color").forEach(function (item) {
        item.addEventListener("click", function (event) {
            setTimeout(function () {
                var updatechartColors = getChartColorsArray(chartId);
                if (chartupdate.options) {
                    if (chartupdate.options["colors"]) {
                        chartupdate.options["colors"] = updatechartColors;
                    } else if (chartupdate.options["lineColors"]) {
                        chartupdate.options["lineColors"] = updatechartColors;
                    } else if (chartupdate.options["barColors"]) {
                        chartupdate.options["barColors"] = updatechartColors;
                    }
                    chartupdate.redraw();
                }
            }, 0);
        });
    });
}

!function ($) {
    "use strict";

    var Dashboard = function () {
    };
    //creates Bar chart
    Dashboard.prototype.createBarChart = function (element, data, xkey, ykeys, labels, lineColors) {
        var barChart = Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            labels: labels,
            gridLineColor: 'rgba(108, 120, 151, 0.1)',
            gridTextColor: '#98a6ad',
            barSizeRatio: 0.2,
            resize: true,
            hideHover: 'auto',
            barColors: lineColors
        });
        ChartColorChange(barChart, 'morris-bar-example');
    },

        //creates area chart
        Dashboard.prototype.createAreaChart = function (element, pointSize, lineWidth, data, xkey, ykeys, labels, lineColors) {
            var areaChart = Morris.Area({
                element: element,
                pointSize: 0,
                lineWidth: 0,
                data: data,
                xkey: xkey,
                ykeys: ykeys,
                labels: labels,
                resize: true,
                gridLineColor: 'rgba(108, 120, 151, 0.1)',
                hideHover: 'auto',
                lineColors: lineColors,
                fillOpacity: .6,
                behaveLikeLine: true
            });
            ChartColorChange(areaChart, 'morris-area-example');
        },

        //creates Donut chart
        Dashboard.prototype.createDonutChart = function (element, data, colors) {
            var donutChart = Morris.Donut({
                element: element,
                data: data,
                resize: true,
                colors: colors,
            });
            ChartColorChange(donutChart, 'morris-donut-example');
        },

        Dashboard.prototype.init = function () {
            var barChartColors = getChartColorsArray("morris-bar-example");
            if (barChartColors) {
            //creating bar chart
            var $barData = [
                { y: '2006', a: 100, b: 90 },
                { y: '2007', a: 75, b: 65 },
                { y: '2008', a: 50, b: 40 },
                { y: '2009', a: 75, b: 65 },
                { y: '2010', a: 50, b: 40 },
                { y: '2011', a: 75, b: 65 },
                { y: '2012', a: 100, b: 90 },
                { y: '2013', a: 90, b: 75 },
                { y: '2014', a: 75, b: 65 },
                { y: '2015', a: 50, b: 40 },
                { y: '2016', a: 75, b: 65 },
                { y: '2017', a: 100, b: 90 },
                { y: '2018', a: 90, b: 75 }
            ];
            this.createBarChart('morris-bar-example', $barData, 'y', ['a', 'b'], ['Series A', 'Series B'], barChartColors);
        }
            //creating area chart
            var areaChartColors = getChartColorsArray("morris-area-example");
            if (areaChartColors) {
            var $areaData = [
                { y: '2007', a: 0, b: 0, c: 0 },
                { y: '2008', a: 150, b: 45, c: 15 },
                { y: '2009', a: 60, b: 150, c: 195 },
                { y: '2010', a: 180, b: 36, c: 21 },
                { y: '2011', a: 90, b: 60, c: 360 },
                { y: '2012', a: 75, b: 240, c: 120 },
                { y: '2013', a: 30, b: 30, c: 30 }
            ];
            this.createAreaChart('morris-area-example', 0, 0, $areaData, 'y', ['a', 'b', 'c'], ['Series A', 'Series B', 'Series C'], areaChartColors);
        }
            //creating donut chart
            var donutChartColors = getChartColorsArray("morris-donut-example");
            if (donutChartColors) {
            var $donutData = [
                { label: "Marketing", value: 12 },
                { label: "Online", value: 42 },
                { label: "Offline", value: 20 }
            ];
            this.createDonutChart('morris-donut-example', $donutData, donutChartColors);

        }
        },
        //init
        $.Dashboard = new Dashboard, $.Dashboard.Constructor = Dashboard
}(window.jQuery),

    //initializing
    function ($) {
        "use strict";
        $.Dashboard.init();
    }(window.jQuery);