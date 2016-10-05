var path = require('path');
var express = require('express');
var config = require('./config');
require('./hook');
var tgRequests = require('./tgrequests');

var app = express();

app.use('/app', express.static(path.join(__dirname, 'app')));

app.listen(config.httpPort);
