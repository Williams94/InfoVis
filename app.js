var express = require('express');
var app = express();
var path = require('path');
var PORT = 8080;

var server  = app.listen(PORT, function(){
    console.log("Server started on PORT: " + PORT)
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/InfoVis', function(req, res){
    res.sendFile(path.join(__dirname, '/', 'index.html'));
});

app.get('/about', function(req, res){
    res.sendFile(path.join(__dirname, '/', 'about.html'));
});

app.get('/less/custom.less', function(req, res){
    res.sendFile(path.join(__dirname, '/less', '/custom.less'));
});

app.get('/less/cover.less', function(req, res){
    res.sendFile(path.join(__dirname, '/less', '/cover.less'));
});