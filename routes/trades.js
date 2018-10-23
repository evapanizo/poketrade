'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const Pokemon = require('../models/pokemon');
const sms = require('../helpers/messages');

// GET Trades view
router.get('/', middlewares.isLogged, function (req, res, next) {
  const trainer = res.locals.currentUser;
  res.render('trades/trades', { 'trainer': trainer });
});

// GET Add a pokemon in my_pokemon array
router.get('/add/my-pokemon', middlewares.isLogged, function (req, res, next) {
  const pokemonName = req.query.q;
  if (!pokemonName) {
    return res.render('trades/add-my-pokemon');
  }
  Pokemon.findOne({ 'name': { $eq: pokemonName } })
    .then((searchResult) => {
      if (!searchResult) {
        req.flash('info', sms.messages.pokemonNotFound);
        return res.redirect('/trades/add/my-pokemon');
      }
      res.json(searchResult);
    })
    .catch(next);
});

// Exports
module.exports = router;
