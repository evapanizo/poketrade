'use strict';

// Packages
const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');
const middlewares = require('../middlewares/middlewares');
const sms = require('../helpers/messages');

// GET Search view
router.get('/', middlewares.isLogged, function (req, res, next) {
  // Are there query parameters?
  const pokemonName = req.query.pokemon;
  if (!pokemonName) {
    return res.render('search/search');
  }
  // If there are..
  const userId = res.locals.currentUser._id;
  Trainer.find({ '_id': { $ne: userId } })
    .populate('my_pokemon')
    .then(trainers => {
      // Find which trainers have the pokemon
      const searchResults = trainers.filter(trainer => {
        const isMyPokemon = trainer.my_pokemon.some((elem) => {
          return elem.name === pokemonName;
        });
        if (isMyPokemon) { return trainer; }
      });
      if (!searchResults) {
        req.flash('error', sms.messages.noUsersHave);
        return res.redirect('search/search');
      } else {
        return res.render('search/search', { 'trainers': searchResults });
      }
    })
    .catch(next);
});

// Exports
module.exports = router;
