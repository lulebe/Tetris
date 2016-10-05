var https = require('https');
var fs = require('fs');
var express = require('express');
var config = require('./config');

var app = express();


router.post('/api/hook', function (req, res) {
  if (req.query.token != config.hookToken) {
    return res.status(400).send("Bad Token.");
  }
  res.status(200).send();
  var update = req.body;
  fs.appendFile('hook.log', JSON.stringify(req.body));
});

//hooks
tgRequests.setWebHook();
var privateKey = fs.readFileSync(path.join(__dirname, 'private.key'), 'utf8');
var certificate = fs.readFileSync(path.join(__dirname, 'public.pem'), 'utf8');
var credentials = {key: privateKey, cert: certificate};
hooks.use('/api', tgRoutes);
https.createServer(credentials, app).listen(config.httpsPort);
