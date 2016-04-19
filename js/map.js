setTimeout(function () {
    getMap();
}, 1000);

var mymap;
var tiles;

var getMap = function () {

    /*      Code used from http://bl.ocks.org/xEviL/0c4f628645c6c21c8b3a        */
    mymap = L.map("map", {center: [46.81509864599243, 8.3221435546875], zoom: 2});
    tiles = L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg', {
        attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> '
        +'&mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: '1234'
    });

    /*      Until here      */

    tiles.addTo(mymap);

    var Stamen_TonerLines = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    }).addTo(mymap)

    mymap.invalidateSize();

    initVis();



};