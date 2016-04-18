/**
 * Created by rbwilliams on 17/04/2016.
 */
var lat;
var lng;

var initVis = function () {

    var dataPath = "./data/hdi.csv";

    var greenIcon = L.icon({
        //iconUrl: '/images/pin.png',
        iconSize:     [10, 10], // size of the icon
        iconAnchor:   [5, 10], // point of the icon which will correspond to marker's location
        //shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    var redMarker = L.AwesomeMarkers.icon({
        icon: 'coffee',
        markerColor: 'red'
    });

    d3.csv(dataPath, function (error, data) {
        if (error != null) {
            console.log(error);
        }
        data.forEach(function (d) {
            var marker = L.marker([d.lat, d.lng], {icon: redMarker}).addTo(mymap);

            var popup = L.popup();

            marker.on("click", function(e){
                console.log(d);
                console.log(e);
                popup.setLatLng(e.latlng)
                    .setContent(d.country)
                    .openOn(mymap);
            });
        });
    });

    var svg = d3.select('#map').select('svg');


};