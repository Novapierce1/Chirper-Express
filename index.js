var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var api = require('./api');
var app = express();
var router = express.Router();
var clientPath = path.join(__dirname, 'client');
app.use(bodyParser.json());
app.use('/api', api);
app.use(express.static(clientPath));
console.log ("starting server");

app.listen(3000);

module.exports = router;