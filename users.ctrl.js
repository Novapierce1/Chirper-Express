var express = require('express');
var fs = require('fs');
var idMaker = require('./shortid');
var timeStamp = require('./moment');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jsonPath = path.join(__dirname, 'user.json');
var router = express.Router();
var procedures = require('./users.proc');

router.route('/')
   .post(idMaker, function insertUser(user) {
    procedures.create(req.body)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})
.get(function getUser() {
    procedures.all()
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})
router.route('/one/:id')
.get(function getUser(id) {
    procedures.read(req.body.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})
.delete(function deleteUser(id) {
    procedures.destroy(req.body.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})
.put(function updateUser(req, res) {
    procedures.update(req.body.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})

module.exports = router;