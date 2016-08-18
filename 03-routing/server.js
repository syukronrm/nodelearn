var http = require('http');
var app = require('./app');
var fs = require('fs');

http.createServer(app.handleRequest).listen(8000);