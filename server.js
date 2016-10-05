var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
require('./hook');
var tgRequests = require('./tgrequests');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/app', express.static(path.join(__dirname, 'app')));

app.post ('/api/setScore', function (req, res) {
  tgRequests.setGameScore(req.body);
  res.status(200).send();
});

app.listen(config.httpPort);
