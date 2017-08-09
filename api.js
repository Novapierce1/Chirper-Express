var express = require('express');
var chirps = require('./chirper.ctrl');
var shortid = require('./shortid');
var moment = require('./moment');
var app = express();
var router = express.Router();


router.use('/chirps', chirps);

module.exports = router;