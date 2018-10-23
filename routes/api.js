'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const Pokemon = require('../models/pokemon');

// GET Add a pokemon in my_pokemon array
router.get('/pokemon', middlewares.isLogged, function (req, res, next) {
  const pokemonName = req.query.q;
  // Is the Pokemon in the database?
  Pokemon.findOne({ 'name': pokemonName })
    .then((searchResult) => {
      res.status(200);
      res.json({ data: searchResult });
    })
    .catch((error) => {
      res.status(500);
      res.json({ 'error': error });
    });
});

// Exports
module.exports = router;
