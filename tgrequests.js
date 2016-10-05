var fs = require('fs');
var path = require('path');
var request = require('request');
var config = require('./config');

var tgFunctions = {};

module.exports = tgFunctions;


tgFunctions.setWebHook = function () {
  var data = {
    url: "https://" + config.ip + ":" + config.httpsPort + "/api/hook?token=" + config.hookToken,
    certificate: fs.createReadStream(path.join(__dirname, 'public.pem'))
  };
  request.post({url: 'https://api.telegram.org/bot' + config.bottoken + '/setWebhook', formData: data})
};
