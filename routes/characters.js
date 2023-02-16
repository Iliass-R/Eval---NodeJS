const express = require('express');
const router = express.Router();

const charactersController = require('../controllers/personnagesController');
const auth = require('../middlewares/auth');

// GET 

// Récupérer tous les personnages d'un compte grâce à son ID
router.get('/:compteId', charactersController.getPersonnagesByCompteId);

// Récupérer les infos d'un personnages par son pseudo et sa classe
router.get('/:pseudo/:classe', auth, charactersController.getPersonnageByPseudoAndClasse);

// POST
// Créer un personnage
router.post('/', auth, charactersController.createPersonnage);

// PUT
// Modifier un personnage
router.put('/', auth, charactersController.modifyPersonnage);

// DELETE
// Supprimer un personnage
router.delete('/', auth, charactersController.deletePersonnage);

module.exports = router;