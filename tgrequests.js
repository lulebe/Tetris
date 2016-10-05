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
  request.post({url: config.apiUrl + '/setWebhook', formData: data});
};

tgFunctions.sendGameAsInlineAnswer = function (qid) {
  console.log("sendGameAsInlineAnswer");
  var data = {
    inline_query_id: qid,
    is_personal: true,
    results: [{
      type: "game",
      id: "1",
      game_short_name: "tetris"
    }]
  };
  console.log(data);
  request({url: config.apiUrl + '/answerInlineQuery', method: 'POST', json: data}, function (err, res, body) {
    console.log(err);
    console.log(body);
  });
};

tgFunctions.sendOpenGameLink = function (callback_query) {
  console.log("sendOpenGameLink");
  console.log(callback_query);
  var data = {};
  if (callback_query.inline_message_id && callback_query.game_short_name == 'tetris') {
    data.callback_query_id = callback_query.id;
    data.url = config.gameUrl + '?uid=' + callback_query.from.id + '&imid=' + callback_query.inline_message_id
  }
  console.log(data);
  request({url: config.apiUrl + '/answerCallbackQuery', method: 'POST', json: data}, function (err, res, body) {
    console.log(err);
    console.log(body);
  });
};

tgFunctions.setGameScore = function (data) {
  console.log("setGameScore");
  console.log(data);
  if (!data.score || !data.user_id) return;
  if (!data.inline_message_id) return;
  var scoreData = {
    user_id: data.user_id,
    score: data.score,
    inline_message_id: data.inline_message_id,
    edit_message: true
  };
  console.log(scoreData);
  request({url: config.apiUrl + '/setGameScore', method: 'POST', json: scoreData}, function (err, res, body) {
    console.log(err);
    console.log(body);
  });
}
