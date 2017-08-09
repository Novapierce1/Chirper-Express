var express = require('express');
var chirps = require('./chirper.ctrl');
var shortid = require('./shortid');
var moment = require('./moment');
var app = express();
var router = express.Router();
var users = require('./users.ctrl');

router.use('/users', users);
router.use('/chirps', chirps);

module.exports = router;