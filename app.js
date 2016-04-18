var express = require('express');
var app = express();
var path = require('path');
var PORT = 8080;

var server  = app.listen(PORT, function(){
    console.log("Server started on PORT: " + PORT)
});

/*      HTML file routers       */
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/InfoVis', function(req, res){
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/about', function(req, res){
    res.sendFile(path.join(__dirname, '/', 'about.html'));
});


/*      LESS file routers       */
app.get('/less/custom.less', function(req, res){
    res.sendFile(path.join(__dirname, '/less', '/custom.less'));
});

app.get('/less/cover.less', function(req, res){
    res.sendFile(path.join(__dirname, '/less', '/cover.less'));
});

app.get('/less/leaflet.awesome-markers.css', function(req, res){
    res.sendFile(path.join(__dirname, '/less', '/leaflet.awesome-markers.css'));
});


/*      JavaScript file routers     */
app.get('/js/map.js', function(req, res){
    res.sendFile(path.join(__dirname, '/js', '/map.js'));
});

app.get('/js/vis.js', function(req, res){
    res.sendFile(path.join(__dirname, '/js', '/vis.js'));
});

app.get('/js/leaflet.awesome-markers.js', function(req, res){
    res.sendFile(path.join(__dirname, '/js', '/leaflet.awesome-markers.js'));
});


/*      Data router     */
app.get('/data/hdi.csv', function(req, res){
    res.sendFile(path.join(__dirname, '/data', '/hdi.csv'));
});

/*      image routers       */
app.get('/images/pin.png', function(req, res){
    res.sendFile(path.join(__dirname, '/images', 'pin.png'));
});

app.get('/images/marker.png', function(req, res){
    res.sendFile(path.join(__dirname, '/images', 'marker.png'));
});

app.get('/less/images/markers-soft@2x.png', function(req, res){
    res.sendFile(path.join(__dirname, '/images/images', 'markers-soft@2x.png'));
});

app.get('/less/images/markers-shadow@2x.png', function(req, res){
    res.sendFile(path.join(__dirname, '/images/images', 'markers-shadow@2x.png'));
});

