var express = require('express');
var fs = require('fs');
var idMaker = require('./shortid');
var timeStamp = require('./moment');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jsonPath = path.join(__dirname, 'data.json');
var router = express.Router();
var procedures = require('./chirps.proc');

router.use(bodyParser.json());

/*router.route('/')
    .get(function(req, res, next){
        chirpsController.all()
        .then(function(success){
            res.semd(success);
        });
    })
    .post(moment.generateTimeStamp, handleId, function(req, res, next){

    });
router.route('/user/:id')
    .get(function(res, req, next){
        fs.readFile(jsonPath, 'utf-8', function(err, file){
            if (err){
                retunr res.sendstatus(500);
            } 
            if (!req.params.id){
                return res.sendStatus(400);
            }
            var id = req.params.id

            var parsed = JSON.parse(file);

            var usersChirps = parsed.filter(function(chirp){
                if (chirp.userid == req.params.id) {
                    return true;
                } else {
                    return false; 
                }
            });
            if (usersChirps.length===0){
                res.sendStatus(404);
                return;
            }
            res.send(usersChirps);
        })
    });

module.export = router;*/

/*router.route('/')
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
                arr.forEach(function(chirp) {
                        if (chirp.id === req.body.id) {
                            isFound = true;
                            chirp.Name = req.body.Name,
                            chirp.time = req.body.time
                        }
                    });
                }
                if (isFound) {
                fs.writeFile(jsonPath, JSON.stringify(arr), function(err) {
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
    });*/
router.route('/')
   .post(idMaker, timeStamp, function insertChirp(chirp) {
    procedures.create(req.body)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})
.get(function getChirps() {
    procedures.all()
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})
router.route('/one/:id')
.get(function getChirp(id) {
    procedures.read(req.body.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})
.delete(function deleteChirp(id) {
    procedures.destroy(req.body.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})
.put(function updateChirp(req, res) {
    procedures.update(req.body.id)
            .then(function (success) {
                res.send(success);
            }, function(err) {
                console.log(err);
                res.sendStatus(500);
            });
})


 module.exports = router;