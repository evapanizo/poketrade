'use strict';

// Packages
const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');
const Pokemon = require('../models/pokemon');
const middlewares = require('../middlewares/middlewares');
const sms = require('../helpers/messages');

// GET Search view
router.get('/', middlewares.isLogged, function (req, res, next) {
  // Are there query parameters?
  let pokemonName = req.query.pokemon;
  if (pokemonName === undefined) {
    return res.render('search/search', { 'trainers': [] });
  }
  // Is the search empty?
  if (pokemonName === '') {
    req.flash('error', sms.messages.emptyFieldsMessage);
    return res.redirect('/search');
  }
  // If there are query parameters...
  pokemonName = pokemonName.toLowerCase();
  Pokemon.find({ 'name': pokemonName })
    .then(result => {
      if (!result.length) {
        req.flash('error', sms.messages.pokemonNotFound);
        return res.redirect('/search');
      } else {
        const pokemonId = result[0]._id;
        Trainer.find({ 'myPokemon': pokemonId })
          .then(trainers => {
            return res.render('search/search', { 'trainers': trainers, 'pokemonName': pokemonName });
          })
          .catch(next);
      }
    })
    .catch(next);
});

// Exports
module.exports = router;
