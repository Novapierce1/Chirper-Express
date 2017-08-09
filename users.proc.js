var fs = require('fs');
var path = require('path');
var jsonPath = path.join(__dirname, 'users.json');

function insertUser(user) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading users.json');
            }

            var parsed = JSON.parse(file);

            parsed.push(user);

            fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                if (err) {
                    reject('Error writing to users.json');
                }

                resolve('Created');
            });
        });
    });
}

function getUsers() {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading users.json');
            }

            resolve(JSON.parse(file));
        });
    });
}

function updateUser(user) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading users.json');
            }

            var parsed = JSON.parse(file),
                isFound = false;

            parsed.forEach(function(element) {
                if (element.id === chirp.id) {
                    isFound = true;
                    element.user = chirp.user;
                    element.message = chirp.message;
                }
            });

            if (isFound) {
                fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                    if (err) {
                        reject('Error writing to users.json');
                    }
                    resolve('Updated');
                })
            }
        });
    });
}

function getUsers(id) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading users.json');
            }

            var parsed = JSON.parse(file),
                found;

            parsed.forEach(function(element) {
                if (element.id === id) {
                    found = element;
                }
            });

            if (!!found) {
                resolve(found);
            } else {
                reject('Not Found');
            }
        });
    });
}

function deleteUser(id) {
    return new Promise(function(resolve, reject) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                reject('Error reading users.json');
            }

            var parsed = JSON.parse(file),
                isDeleted = false,
                deleteIndex;

            parsed.forEach(function(element, i) {
                if (element.id === id) {
                    isDeleted = true;
                    deleteIndex = i;
                }
            });

            if (isDeleted) {
                parsed.splice(deleteIndex, 1);

                fs.writeFile(jsonPath, JSON.stringify(parsed), function(err) {
                    if (err) {
                        reject('Error writing to users.json');
                    }

                    resolve('Deleted');
                });
            } else {
                reject('Not Found');
            }
        });
    });
}

module.exports = {
    create: insertUser,
    all: getUsers,
    read: getUsers,
    destroy: deleteUser,
    update: updateUser
};