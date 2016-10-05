var https = require('https');
var path = require('path');
var fs = require('fs');
var express = require('express');
var config = require('./config');
var tgRoutes = require('./tgroutes');
var tgRequests = require('./tgrequests');

var app = express();

app.use('/app', express.static(path.resolve(__dirname, 'app')));
app.use('/api', tgRoutes);

tgRequests.setWebHook();

var key = fs.readFileSync('private.key', 'utf8');
var certificate = fs.readFileSync('public.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};

https.createServer(credentials, app).listen(config.port);
