/**
 * Created by rbwilliams on 17/04/2016.
 */
var color = d3.scale.linear()
    .domain([0, 0.5, 0.75, 1, "No data"])
    .range(["#FF0000", "#C42400", "#33CC4D", "#33F300", "#DCDCDC", "#D3D3D3", "#D3D3D2"]);


var upd;
var countriesOverlay;
var countries;
var popup = L.popup();

var initVis = function () {

    var option = document.getElementById("viewSelector");


    /*      Code adpted from http://bl.ocks.org/xEviL/0c4f628645c6c21c8b3a       */
    countries = [];
    countriesOverlay = L.d3SvgOverlay(function (selection, projection) {

        upd = selection.selectAll('path').data(countries);

        upd.enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', projection.pathFromGeojson)
            .attr('fill-opacity', '0.7')
            .attr('stroke', 'black')
            .attr('fill', function (d) {
                if (!d.properties.country) {
                    //console.log("Not found: " + d.properties.name);
                    return "#DCDCDC";
                } else {
                    return color(d.properties.hdi);
                }
            })
            .attr('stroke-width', 0.5 / projection.scale)
            .on('mouseover', function (d) {
                try {
                    popup.setLatLng([d.properties.lat, d.properties.lng])
                        .setContent(d.properties.country + "<br/>" +
                            "HDI Rank: " + d.properties.rank + "<br/>" +
                            "HDI Value: " + d.properties.hdi + "<br/>" +
                            "Life Expectancy: " + d.properties.life_expectancy + "<br/>" +
                            "Expected Schooling Years: " + d.properties.expected_school_years + "<br/>" +
                            "Average Years of Schooling: " + d.properties.mean_years_of_school + "<br/>" +
                            "Gross National Income (PPP $): " + d.properties.gross_national_income)
                        .openOn(mymap);

                } catch (e) {

                }
            });


    });

    d3.json("countries.geo.json", function (data) {
        countries = data.features;
        countriesOverlay.addTo(mymap)
    });
    /*                    Until Here                        */

};

var svg;
var legend;
var keys;

var initLegend = function () {
    svg = d3.select('#map').append('svg');


    legend = d3.select('#legend')
        .append('ul')
        .attr('class', 'list-inline');

    keys = legend.selectAll('li.key')
        .data(color.range());

    keys.enter().append('li')
        .attr('class', 'key')
        .attr('id', function (d) {
            return d;
        })
        .style('border-top-color', String)
        .text(function (d) {
            if (d == "#FF0000") {
                return 0;
            } else if (d == "#C42400") {
                return 0.5;
            } else if (d == "#33CC4D") {
                return 0.75;
            } else if (d == "#33F300") {
                return 1;
            } else if (d == "#DCDCDC") {
                return "No Data";
            }
        });


    document.getElementById("#D3D3D3").style.visibility = "hidden";
    document.getElementById("#D3D3D2").style.visibility = "hidden";
    document.getElementById('legendLabel').innerHTML = "HDI Value:";
};

var changeView = function () {


    mymap.removeLayer(countriesOverlay);

    var option = document.getElementById("viewSelector");

    // Code executes if life expectancy has been chosen in the drop down menu
    if (option.options[option.selectedIndex].value == "life") {

        var colorLife = d3.scale.linear()
            .domain([45, 55, 65, 75, 85])
            .range(["#000000", "#E41A1C", "#FD8D3C", "#FFFF33", "#33A02C", "#DCDCDC"]);

        countriesOverlay = L.d3SvgOverlay(function (selection, projection) {

            upd = selection.selectAll('path').data(countries);

            upd.enter()
                .append('path')
                .attr('class', 'country')
                .attr('d', projection.pathFromGeojson)
                .attr('fill-opacity', '0.7')
                .attr('stroke', 'black')
                .attr('fill', function (d) {
                    if (!d.properties.country) {
                        console.log("Not found: " + d.properties.name);
                        return "white";
                    } else {
                        //console.log(d.properties.life_expectancy);
                        return colorLife(d.properties.life_expectancy);
                    }
                })
                .attr('stroke-width', 1 / projection.scale)
                .on('mouseover', function (d) {
                    try {
                        popup.setLatLng([d.properties.lat, d.properties.lng])
                            .setContent(d.properties.country + "<br/>" +
                                "HDI Rank: " + d.properties.rank + "<br/>" +
                                "HDI Value: " + d.properties.hdi + "<br/>" +
                                "Life Expectancy: " + d.properties.life_expectancy + "<br/>" +
                                "Expected Schooling Years: " + d.properties.expected_school_years + "<br/>" +
                                "Average Years of Schooling: " + d.properties.mean_years_of_school + "<br/>" +
                                "Gross National Income (PPP $): " + d.properties.gross_national_income)
                            .openOn(mymap);

                    } catch (e) {

                    }
                });

        });

        d3.json("countries.geo.json", function (data) {
            countries = data.features;
            countriesOverlay.addTo(mymap)
        });


        document.getElementById('legendLabel').innerHTML = "Life Expectancy at Birth (years): ";


        keys = legend.selectAll('li.key')
            .data(colorLife.range());


        keys.style('border-top-color', String)
            .text(function (d) {
                if (d == "#000000") {
                    return 45;
                } else if (d == "#E41A1C") {
                    return 55;
                } else if (d == "#FD8D3C") {
                    return 65;
                } else if (d == "#FFFF33") {
                    return 75;
                } else if (d == "#33A02C") {
                    return 85;
                } else if (d == "#DCDCDC") {
                    return "No Data";
                }
            });

        document.getElementById("#D3D3D2").style.visibility = "hidden";
        document.getElementById("#D3D3D3").style.visibility = "visible";

        // code executes is hdi was chosen in the drop down menu
    } else if (option.options[option.selectedIndex].value == "hdi") {
        initVis();

        keys = legend.selectAll('li.key')
            .data(color.range());


        keys.style('border-top-color', String)
            .text(function (d) {
                if (d == "#FF0000") {
                    return 0;
                } else if (d == "#C42400") {
                    return 0.5;
                } else if (d == "#33CC4D") {
                    return 0.75;
                } else if (d == "#33F300") {
                    return 1;
                } else if (d == "#DCDCDC") {
                    return "No Data";
                }
            });

        document.getElementById('legendLabel').innerHTML = "HDI Value: ";
        document.getElementById("#D3D3D3").style.visibility = "hidden";
        document.getElementById("#D3D3D2").style.visibility = "hidden";


        // code exectues is number of expected school years was chosen from drop down box
    } else if (option.options[option.selectedIndex].value == "school_ex") {

        document.getElementById("#D3D3D3").style.visibility = "visible";

        var colorSchoolEx = d3.scale.linear()
            .domain([0, 5, 10, 15, 20.3])
            .range(["#000000", "#E41A1C", "#FD8D3C", "#FFFF33", "#33A02C", "#DCDCDC"]);

        countriesOverlay = L.d3SvgOverlay(function (selection, projection) {

            upd = selection.selectAll('path').data(countries);

            upd.enter()
                .append('path')
                .attr('class', 'country')
                .attr('d', projection.pathFromGeojson)
                .attr('fill-opacity', '0.7')
                .attr('stroke', 'black')
                .attr('fill', function (d) {
                    if (!d.properties.country) {
                        console.log("Not found: " + d.properties.name);
                        return "white";
                    } else {
                        //console.log(d.properties.life_expectancy);
                        return colorSchoolEx(d.properties.expected_school_years);
                    }
                })
                .attr('stroke-width', 1 / projection.scale)
                .on('mouseover', function (d) {
                    try {
                        popup.setLatLng([d.properties.lat, d.properties.lng])
                            .setContent(d.properties.country + "<br/>" +
                                "HDI Rank: " + d.properties.rank + "<br/>" +
                                "HDI Value: " + d.properties.hdi + "<br/>" +
                                "Life Expectancy: " + d.properties.life_expectancy + "<br/>" +
                                "Expected Schooling Years: " + d.properties.expected_school_years + "<br/>" +
                                "Average Years of Schooling: " + d.properties.mean_years_of_school + "<br/>" +
                                "Gross National Income (PPP $): " + d.properties.gross_national_income)
                            .openOn(mymap);

                    } catch (e) {

                    }
                });

        });

        d3.json("countries.geo.json", function (data) {
            countries = data.features;
            countriesOverlay.addTo(mymap)
        });


        document.getElementById('legendLabel').innerHTML = "Expected School Time (years): ";
        document.getElementById("#D3D3D2").style.visibility = "hidden";


        keys = legend.selectAll('li.key')
            .data(colorSchoolEx.range());


        keys.style('border-top-color', String)
            .text(function (d) {
                console.log(d);
                if (d == "#000000") {
                    return 0;
                } else if (d == "#E41A1C") {
                    return 5;
                } else if (d == "#FD8D3C") {
                    return 10;
                } else if (d == "#FFFF33") {
                    return 15;
                } else if (d == "#33A02C") {
                    return 20;
                } else if (d == "#DCDCDC") {
                    return "No Data";
                }
            });


    } else if (option.options[option.selectedIndex].value == "school_mean") {

        var colorSchoolMean = d3.scale.linear()
            .domain([0, 3.5, 7, 10.5, 14])
            .range(["#000000", "#E41A1C", "#FD8D3C", "#FFFF33", "#33A02C", "#DCDCDC"]);

        countriesOverlay = L.d3SvgOverlay(function (selection, projection) {

            upd = selection.selectAll('path').data(countries);

            upd.enter()
                .append('path')
                .attr('class', 'country')
                .attr('d', projection.pathFromGeojson)
                .attr('fill-opacity', '0.7')
                .attr('stroke', 'black')
                .attr('fill', function (d) {
                    if (!d.properties.country) {
                        console.log("Not found: " + d.properties.name);
                        return "white";
                    } else {
                        //console.log(d.properties.life_expectancy);
                        return colorSchoolMean(d.properties.mean_years_of_school);
                    }
                })
                .attr('stroke-width', 1 / projection.scale)
                .on('mouseover', function (d) {
                    try {
                        popup.setLatLng([d.properties.lat, d.properties.lng])
                            .setContent(d.properties.country + "<br/>" +
                                "HDI Rank: " + d.properties.rank + "<br/>" +
                                "HDI Value: " + d.properties.hdi + "<br/>" +
                                "Life Expectancy: " + d.properties.life_expectancy + "<br/>" +
                                "Expected Schooling Years: " + d.properties.expected_school_years + "<br/>" +
                                "Average Years of Schooling: " + d.properties.mean_years_of_school + "<br/>" +
                                "Gross National Income (PPP $): " + d.properties.gross_national_income)
                            .openOn(mymap);

                    } catch (e) {

                    }
                });

        });

        d3.json("countries.geo.json", function (data) {
            countries = data.features;
            countriesOverlay.addTo(mymap)
        });


        document.getElementById('legendLabel').innerHTML = "Mean School Time (years): ";


        keys = legend.selectAll('li.key')
            .data(colorSchoolMean.range());


        keys.style('border-top-color', String)
            .text(function (d) {
                console.log(d);
                if (d == "#000000") {
                    return 0;
                } else if (d == "#E41A1C") {
                    return 3.5;
                } else if (d == "#FD8D3C") {
                    return 7;
                } else if (d == "#FFFF33") {
                    return 10.5;
                } else if (d == "#33A02C") {
                    return 14;
                } else if (d == "#DCDCDC") {
                    return "No Data";
                }
            });

        document.getElementById("#D3D3D3").style.visibility = "visible";

    } else if (option.options[option.selectedIndex].value == "gni") {
        var colorGNI = d3.scale.linear()
            .domain([0, 30000, 60000, 90000, 120000, 150000])
            .range(["#FE0000", "#FAFE00", "#41FE00", "#00FEE3", "#002AFE", "#FE00DB", "#DCDCDC"]);

        countriesOverlay = L.d3SvgOverlay(function (selection, projection) {

            upd = selection.selectAll('path').data(countries);

            upd.enter()
                .append('path')
                .attr('class', 'country')
                .attr('d', projection.pathFromGeojson)
                .attr('fill-opacity', '0.7')
                .attr('stroke', 'black')
                .attr('fill', function (d) {
                    if (!d.properties.country) {
                        console.log("Not found: " + d.properties.name);
                        return "white";
                    } else {
                        try {
                            var str = d.properties.gross_national_income;
                            var gni = str.replace(/,/g, "");
                            return colorGNI(parseInt(gni));
                        } catch (e) {
                            return colorGNI(d.properties.gross_national_income);
                        }
                    }
                })
                .attr('stroke-width', 1 / projection.scale)
                .on('mouseover', function (d) {
                    try {
                        popup.setLatLng([d.properties.lat, d.properties.lng])
                            .setContent(d.properties.country + "<br/>" +
                                "HDI Rank: " + d.properties.rank + "<br/>" +
                                "HDI Value: " + d.properties.hdi + "<br/>" +
                                "Life Expectancy: " + d.properties.life_expectancy + "<br/>" +
                                "Expected Schooling Years: " + d.properties.expected_school_years + "<br/>" +
                                "Average Years of Schooling: " + d.properties.mean_years_of_school + "<br/>" +
                                "Gross National Income (PPP $): " + d.properties.gross_national_income)
                            .openOn(mymap);

                    } catch (e) {

                    }
                });

        });

        d3.json("countries.geo.json", function (data) {
            countries = data.features;
            countriesOverlay.addTo(mymap)
        });


        document.getElementById('legendLabel').innerHTML = "Gross National Income (PPP $): ";

        document.getElementById("#D3D3D2").style.visibility = "visible";


        keys = legend.selectAll('li.key')
            .data(colorGNI.range());

        keys.style('border-top-color', String)
            .text(function (d) {
                if (d == "#FE0000") {
                    return 0;
                } else if (d == "#FAFE00") {
                    return 30000;
                } else if (d == "#41FE00") {
                    return 60000;
                } else if (d == "#00FEE3") {
                    return 90000;
                } else if (d == "#002AFE") {
                    return 120000;
                } else if (d == "#FE00DB") {
                    return 150000;
                } else if (d == "#DCDCDC") {
                    return "No Data";
                }
            });

        document.getElementById("#D3D3D3").style.visibility = "visible";


    }


};