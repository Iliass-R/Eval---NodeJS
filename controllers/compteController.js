const axios = require('axios');
const logger = require('../events/logger');

exports.login = (req, res, next) => {

    axios.post('https://backend-tp-final-nodejs.agence-pixi.fr/wow/compte/check', 
    req.body
    )
    .then(response => res.status(200).json(response.data))
    .catch(error => {
        logger(req, res, next);
        res.status(400).json({ error });
    });
}

