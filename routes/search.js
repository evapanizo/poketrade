'use strict';

// Packages
const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');
const middlewares = require('../middlewares/middlewares');

// GET
router.get('/', middlewares.isLogged, function (req, res, next) {
  const pokemonName = req.query.q;
  const userId = req.session.currentUser._id;
  const searchResults = [];
  Trainer.find({ _id: { $ne: userId } })
    .then(trainers => {
      trainers.forEach(trainer => {
        const found = trainer.my_pokemon.find(pokemon => {
          return pokemon.name === pokemonName;
        });
        if (found) {
          searchResults.push(found);
        }
      });
      res.render('search/search', { trainers: searchResults });
    })
    .catch(next);
});

// Exports
module.exports = router;
