var express = require('express');
var fs = require('fs');
var idMaker = require('./shortid');
var timeStamp = require('./moment');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jsonPath = path.join(__dirname, 'data.json');
var router = express.Router();
router.use(bodyParser.json());

router.route('/')
    .post(idMaker, timeStamp, function (req, res) {
        fs.readFile(jsonPath, 'utf-8', function (err, file) {
            if (err) {
                res.status(500);
            } else {
                var data = JSON.parse(file);
                var chirps = req.body;
                data.push(chirps);
            }
            fs.writeFile(jsonPath, JSON.stringify(data), function(err, file){
                if (err) {
                    res.status(500);
                } else {
                    res.send(req.body);
                }
            });
        
        })
    })
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err) {
                res.status(500).send('Not able to read file');
            }
            res.send(file);
        });
    });

router.route('/one/:id')
    .put(function(req, res){
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err) {
                res.writeHead(500);
            } else {
                var arr = JSON.parse(file);
                    isFound = false;
                parsed.forEach(function(chirp) {
                        if (chirp.id === req.body.id) {
                            isFound = true;
                            chirp.Name = req.body.Name,
                            chirp.time = req.body.time
                        }
                    });
                }
                if (isFound) {
                fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.sendStatus(404);
                    }
                });
            }
        });
    })
    
    
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err) {
                res.status(500).send('Not able to read file');
            } else {
                var arr = JSON.parse(file);
                var id = req.params.id;
                var answere;
                arr.forEach(function(chirp) {
                    if (chirp.id === id) {
                        answere = chirp;
                    }
                });
                if (answere) {
                    res.send(answere);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })
    .delete(function (req, res){
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err) {
                res.status(500).send('File note deleted');
            } else {
                var arr = JSON.parse(file);
                var id = req.params.id;
                arr.forEach(function(chirps, i){
                    var deleteIndex;
                    if (chirps.id === id){
                        deleteIndex = i;
                    }
                    if (deleteIndex != -1) {
                        arr.splice(deleteIndex, 1);
                        fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
                            if (err) {
                                res.sendStatus(500);
                            } else {
                                res.sendStatus(202);
                            }
                        });
                    } else {
                        res.send(404);
                    }
                });
            }
        });
    });

module.exports = router;