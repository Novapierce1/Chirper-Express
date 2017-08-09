var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var app = express();
function idMaker(req, res, next) {
    if (!req.body.id) {
        req.body.id = shortid.generate();
        next();
    }
}

module.exports = idMaker;