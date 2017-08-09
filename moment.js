var express = require('express');
var router = express.Router();
var moment = require('moment');
var app = express();


function timeStamp(req, res, next){
    var time = moment().format();
    console.log(time);
    if (!req.body.time){
        req.body.time = time;
        next();
    }
}

module.exports = timeStamp;