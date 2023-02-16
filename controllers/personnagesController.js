const Personnages = require('../models/personnage');
  
  // Récupère tous les personnages d'un compte par son ID
    exports.getPersonnagesByCompteId = async (req, res) => {        

        const compteId = req.params.compteId;

        Personnages.find({compteId: compteId}).then(personnages => {
            if (personnages) {
                res.status(200).json(personnages);
            } else {
                res.status(404).json({ message: 'Aucun personnage associé à ce compteId !' });
            }
        }).catch(error => res.status(400).json({ error }));
    }
 
    // Récupérer les info d'un personnages par son pseudo et sa classe
    exports.getPersonnageByPseudoAndClasse = (req, res) => {

        const pseudo = req.params.pseudo;
        const classe = req.params.classe;

        Personnages.findOne({pseudo: pseudo, classe: classe}).then(personnage => {
            if (personnage) {
                res.status(200).json(personnage);
            } else {
                res.status(404).json({ message: 'Personnage introuvable !' });
            }
        }).catch(error => res.status(400).json({ error }));
    }

    // Créer un personnage
    exports.createPersonnage = (req, res) => {
        const { pseudo, classe } = req.body;

        const gameClass = ['Guerrier', 'Paladin', 'Chasseur', 'Voleur', 'Prêtre', 'Chevalier de la mort', 'Chaman', 'Mage', 'Démoniste', 'Moine', 'Druide', 'Chasseur de démon', 'Evocateur'];

        if (!gameClass.includes(classe)) {
             return res.status(400).json({ message: "Cette classe n'existe pas !" });
         } else { 
            const personnage = new Personnages({
                pseudo: pseudo,
                classe: classe,
                compteId: req.auth.compteId
            });
            personnage.save().then(() => res.status(201).json({ message: 'Personnage créé !' })).catch(error => res.status(400).json({ error }));
        }
     }



    // Modifier un personnage
    exports.modifyPersonnage = (req, res) => {

        const pseudo = req.body.pseudo;
        const classe = req.body.classe;

        const newClass = req.body.newClass
        const newPseudo = req.body.newPseudo

        // Check si la nouvelle classe existe
        const gameClass = ['Guerrier', 'Paladin', 'Chasseur', 'Voleur', 'Prêtre', 'Chevalier de la mort', 'Chaman', 'Mage', 'Démoniste', 'Moine', 'Druide', 'Chasseur de démon', 'Evocateur'];
        if (!gameClass.includes(newClass)) {
            return res.status(400).json({ message: "Cette classe n'existe pas !" });
        } else {
            // Je récupère mon objet en base
            Personnages.findOne({pseudo: pseudo, classe: classe}).then(personnage => {
                if (personnage) {
                // Check si le personnage appartient au compte
                    if (personnage.compteId == req.auth.compteId) {
                // Modifier le personnage
                        Personnages.updateOne({pseudo: pseudo, classe: classe}, {pseudo: newPseudo, classe: newClass})
                        .then(() => {res.status(200).json({ message: 'Personnage modifié !' })})
                        .catch(error => res.status(400).json({ error }));
                    } else {
                        res.status(401).json({ message: "Vous n'avez pas les droits pour modifier ce personnage !" });
                    }
                } else {
                    res.status(404).json({ message: 'Personnage introuvable !' });
                }
            }).catch(error => res.status(400).json({ error }));
        }
    }

    // Supprimer un personnage
    exports.deletePersonnage = (req, res) => {
            
            const pseudo = req.body.pseudo;
            const classe = req.body.classe;
    
            // Récupérer le personnage à supprimer
            Personnages.findOne({pseudo: pseudo, classe: classe}).then(personnage => {
                // Check si le personnage en base existe
                if (personnage) {
                // Check si le personnage appartient au compte
                    if (personnage.compteId == req.auth.compteId) {
                // Supprimer le personnage
                        Personnages.deleteOne({pseudo: pseudo, classe: classe})
                        .then(() => { res.status(200).json({ message: 'Personnage supprimé !' })})
                        .catch(error => res.status(400).json({ error }));
                    } else {
                        res.status(401).json({ message: "Vous n'avez pas les droits pour supprimer ce personnage !" });
                    }
                } else {
                    res.status(404).json({ message: 'Personnage introuvable !' });
                }
            }).catch(error => res.status(400).json({ error }));
    }

