var https = require('https');
var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config');
var tgRequests = require('./tgrequests');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/api/hook', function (req, res) {
  if (req.query.token != config.hookToken) {
    return res.status(400).send("Bad Token.");
  }
  res.status(200).send();
  var update = req.body;
  console.log(req.body);
  processQuery(update);
});

//hooks
tgRequests.setWebHook();
var privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, 'public.pem'), 'utf8');
var credentials = {key: privateKey, cert: certificate};
https.createServer(credentials, app).listen(config.httpsPort);



function processQuery (update) {
  if (update.inline_query) {
    tgRequests.sendGameAsInlineAnswer(update.inline_query.id);
  } else if (update.callback_query) {
    tgRequests.sendOpenGameLink(update.callback_query);
  }
}
