'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const Pokemon = require('../models/pokemon');

// GET Add a pokemon in array
router.get('/pokemon', middlewares.isLogged, function (req, res, next) {
  let pokemonName = req.query.q;
  pokemonName = pokemonName.toLowerCase();
  Pokemon.findOne({ 'name': pokemonName })
    .then((searchResult) => {
      res.status(200);
      return res.json({ data: searchResult });
    })
    .catch((error) => {
      res.status(500);
      return res.json({ 'error': error });
    });
});

// Exports
module.exports = router;
