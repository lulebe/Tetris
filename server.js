var express = require('express');
var path = require('path');
var TGBot = require('node-telegram-bot-api');
var constants = require('./constants.json');

var Bot = new TGBot(constants.bottoken);

var app = express();

app.use(express.static(path.resolve(__dirname, 'app')));

app.listen(3000);
