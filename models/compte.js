const mongoose = require('mongoose');

const compteSchema = new mongoose.Schema({
  compteId: { type: String, required: true },
});

const Compte = mongoose.model('Compte', compteSchema);

module.exports = Compte;