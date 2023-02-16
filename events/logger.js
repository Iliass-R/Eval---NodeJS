const fs = require('fs');

module.exports = (req, res, next) => {
    const log = `${new Date().toLocaleString('fr-FR')} - tentative de connexion invalide\n`
    fs.appendFile('logs.txt', log, (err) => {
        if (err) {
        console.log(err);
        }
    });
    next();
    }
    