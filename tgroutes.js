var express = require('express');
var config = require('./config');

var router = express.Router();

module.exports = router;

router.post('/hook', function (req, res) {
  if (req.query.token != config.hookToken) {
    return res.status(400).send("Bad Token.");
  }
  var update = req.body;
  console.log(update);
});
