'use strict';

var express = require('express');
var morgan = require('morgan');
var db = require('./../db/db.js');
var bodyParser = require('body-parser');

var app = module.exports = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

var routes = require('./routes');

app.use(express.static(__dirname + './../public/client'));

var port = process.env.PORT || 4568;

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

