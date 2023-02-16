const express = require('express');
const router = express.Router();
const compteCtrl = require('../controllers/compteController');

// POST
// Connecter un compte
router.post('/login', compteCtrl.login);

module.exports = router;