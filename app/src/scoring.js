module.exports = {};

var getParameterByName = function (name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

//get current msgId & userId
var inline_message_id = getParameterByName('imid');
var user_id = getParameterByName('uid');

module.exports.sendScore = function (score) {
  if (!inline_message_id || !user_id) return;
  qwest.post('/api/setScore', {inline_message_id: inline_message_id, user_id: user_id, score: score});
}
