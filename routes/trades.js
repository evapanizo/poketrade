'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');

// GET Trades view
router.get('/', middlewares.isLogged, function (req, res, next) {
  const trainer = res.locals.currentUser;
  res.render('trades/trades', { 'trainer': trainer });
});

// GET Add a pokemon in my_pokemon array
router.get('/add/my-pokemon', middlewares.isLogged, function (req, res, next) {
  return res.render('trades/add-my-pokemon');
});

// Exports
module.exports = router;
