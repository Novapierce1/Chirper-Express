var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');
var app = express();
var router = express.Router();
app.use(bodyParser.json());
app.use('/api', api);

console.log ("starting server");

app.listen(3000);

module.exports = router;