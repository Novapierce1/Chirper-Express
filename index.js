var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var shortid = require('shortid');
var jsonPath = path.join(__dirname, 'data.json');
var app = express();

app.use(bodyParser.json());
app.use(express.static(jsonPath));

console.log ("starting server");

app.post('/api/chirps', function (req, res) {
    fs.readFile(jsonPath, function (err, file) {
        if (err){
            res.writeHead(500);
        } else {
            var data = JSON.parse(file)
            var chirps = req.body
            chirps.id = shortid.generate();
            data.push(chirps);
            fs.writeFile(jsonPath, JSON.stringify(data), function(err, success){
                if (err){
                    res.writeHead(500);
                } else {
                    res.send(req.body);
                }
            })
        }
    })
});

app.put('/api/chirps/one/:user', function(req, res){
    fs.readFile(jsonPath, function(err, file){
        if (err) {
            res.writeHead(500);
        } else {
            var arr = JSON.parse(file);
            var user = req.params.user
            var answere = arr.filter(function(chirp){
                    if (chirp.user){
                        if (chirp.user.toLowerCase().trim()===user.toLowerCase().trim()) {
                            return chirp;
                        }
                    }
                });
            if (answere){
                res.send(answere);
            } else {
                res.sendStatus(404);
            }
        }
    })
})

app.get('/api/chirps', function(req, res) {
    fs.readFile(jsonPath, function(err, file){
        if (err) {
            res.status(500).send('Not able to read file');
        }
        res.send(file);
    })
}); 

app.get('/api/chirps/one/:id', function(req, res) {
    fs.readFile(jsonPath, function(err, file){
        if (err) {
            res.status(500).send('Not able to read file');
        } else {
            var arr = JSON.parse(file);
            var id = req.params.id;
            var answere;
            arr.forEach(function(chirp){
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
    })
}); 

app.delete('/api/chirps/one/:id', function (req, res){
    fs.readFile(jsonPath, function(err, file){
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
                    fs.writeFile(jsonPath, JSON.stringify(chirps), function(err, success) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(202);
                        }
                    });
                } else {
                    res.send(404);
                }
            })
        }
    })
});

app.listen(3000);