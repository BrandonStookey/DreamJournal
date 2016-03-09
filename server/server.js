var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.use(morgan('tiny'));
app.use(bodyParser());

app.use(express.static(__dirname + './../public/client'));

var port = process.env.PORT || 4568;

app.listen(port, function () {
  console.log('Listening on port ' + port);
});

// routes(app, express);
