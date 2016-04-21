/**
 * Created by rbwilliams on 17/04/2016.
 */
var color = d3.scale.linear()
    .domain([0, 0.5, 0.75, 1])
    .range(["#FF0000", "#C42400", "#33CC4D", "#33F300"]);


var upd;
var countriesOverlay;
var countries;

var initVis = function () {

    var option = document.getElementById("viewSelector");

    var popup = L.popup();

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
                    return "grey";
                } else {
                    return color(d.properties.hdi);
                }
            })
            .attr('stroke-width', 1 / projection.scale)
            .on('mousemove', function (d) {
                popup.setLatLng([d.properties.lat, d.properties.lng])
                    .setContent(d.properties.country)
                    .openOn(mymap);
            });


    });

    d3.json("countries.geo.json", function (data) {
        countries = data.features;
        countriesOverlay.addTo(mymap)
    });
    /*                    Until Here                        */




    /*d3.csv(dataPath, function (error, data) {
     if (error != null) {
     console.log(error);
     }

     data.forEach(function (d) {

     var marker = L.marker([d.lat, d.lng]).addTo(mymap);

     var popup = L.popup();

     marker.on("mouseover", function (e) {
     popup.setLatLng(e.latlng)
     .setContent(d.country)
     .openOn(mymap);
     });

     marker.on("mouseout", function (e) {
     mymap.closePopup();
     });

     });
     });*/


    /*var greenIcon = L.icon({
     //iconUrl: '/images/pin.png',
     iconSize:     [10, 10], // size of the icon
     iconAnchor:   [5, 10], // point of the icon which will correspond to marker's location
     //shadowAnchor: [4, 62],  // the same for the shadow
     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
     });

     */
	$('#map').css({'margin-left':'-200px','margin-top':'10px'});
};

var svg;
var legend;
var keys;

var initLegend = function(){
    svg = d3.select('#map').append('svg');


    legend = d3.select('#legend')
        .append('ul')
        .attr('class', 'list-inline')
        .text('HDI value: ');

    keys = legend.selectAll('li.key')
        .data(color.range());

    keys.enter().append('li')
        .attr('class', 'key')
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
            }
        });
};

var changeView = function () {

    var colorLife = d3.scale.linear()
        .domain([45, 55, 65, 75, 85])
        .range(["#000000", "#E41A1C", "#FD8D3C", "#FFFF33", "#33A02C" ]);

    mymap.removeLayer(countriesOverlay);

    var option = document.getElementById("viewSelector");

    if (option.options[option.selectedIndex].value == "life") {

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
                .attr('stroke-width', 1 / projection.scale);

        });

        d3.json("countries.geo.json", function (data) {
            countries = data.features;
            countriesOverlay.addTo(mymap)
        });
    } else if (option.options[option.selectedIndex].value == "hdi") {
        initVis();
    }

    //document.getElementById('legend').innerHTML = "Life Expectancy (years): ";




    keys = legend.selectAll('li.key')
        .data(colorLife.range());

    console.log(keys);


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
            } else if (d == "33A02C"){
                return 85;
            }
        });
};
