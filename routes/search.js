'use strict';

// Packages
const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');
const middlewares = require('../middlewares/middlewares');

// GET Search view
router.get('/', middlewares.isLogged, function (req, res, next) {
  // Are there query parameters?
  const pokemonName = req.query.q;
  if (!pokemonName) {
    return res.render('search/search');
  }
  res.render('search/search');
  // // If there are..
  // const userId = res.locals.currentUser._id;
  // const searchResults = [];
  // Trainer.find({ _id: { $ne: userId } })
  //   .then(trainers => {
  //     trainers.forEach(trainer => {
  //       const found = trainer.my_pokemon.find(pokemon => {
  //         return pokemon.name === pokemonName;
  //       });
  //       if (found) {
  //         searchResults.push(found);
  //       }
  //     });
  //   })
  //   .catch(next);
});

// Exports
module.exports = router;
