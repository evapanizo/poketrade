// Packages
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definition of the Schema

// Definition of the Model
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

// Export the model
module.exports = Pokemon;
