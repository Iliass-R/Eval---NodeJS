const mongoose = require('mongoose');

const personnageSchema = mongoose.Schema({
  compteId: {
    type: String,
    required: true
  },
  pseudo: {
    type: String,
    required: true,
    unique: true
  },
  classe: {
    type: String,
    required: true,
  },
  niveau: {
    type: Number,
    default: 1,
    required: true
  }
});

module.exports = mongoose.model('Personnage', personnageSchema);
