/**
 * Created by rbwilliams on 17/04/2016.
 */
var color = d3.scale.linear()
    .domain([1, 188])
    .range(["green", "red"]);

var dataPath = "./data/hdi.csv";
var selection;
var upd;
var upd2;

var initVis = function () {

    /*      Code taken from http://bl.ocks.org/xEviL/0c4f628645c6c21c8b3a       */
    var countries = [];
    var hdi = [];
    var countriesOverlay = L.d3SvgOverlay(function (selection, projection) {

        upd = selection.selectAll('path').data(countries);

        upd.enter()
            .append('path')
            .attr('class', 'country')
            .attr('d', projection.pathFromGeojson)
            .attr('fill-opacity', '0.7')
            .attr('stroke', 'black')
            .attr('fill', function(d){
                if (!d.properties.country){
                    console.log("Not found: " + d.properties.name);
                }
                return color(d.properties.rank);
            })
            .attr('stroke-width', 1 / projection.scale);

    });

    L.control.layers({"Geo Tiles": tiles},
        {"Countries": countriesOverlay})
        .addTo(mymap);

    d3.json("countries.geo.json", function (data) {
        countries = data.features;
        countriesOverlay.addTo(mymap)
    });

    var svg = d3.select('#map').select('svg');

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
};
