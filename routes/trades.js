'use strict';

// Packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const middlewares = require('../middlewares/middlewares');
const Trainer = require('../models/trainer');
const ObjectId = mongoose.Types.ObjectId;

// GET Trades view
router.get('/', middlewares.isLogged, function (req, res, next) {
  const userId = res.locals.currentUser._id;
  Trainer.findById(userId)
    .populate('my_pokemon')
    .then(trainer => {
      res.render('trades/trades', { 'trainer': trainer });
    });
});

// GET Add a pokemon in my_pokemon array
router.get('/add/my-pokemon', middlewares.isLogged, function (req, res, next) {
  return res.render('trades/add-my-pokemon');
});

// POST Add a pokemon in my_pokemon array
router.post('/add/my-pokemon', middlewares.isLogged, function (req, res, next) {
  const pokemonList = req.body;
  const userId = res.locals.currentUser._id;
  Trainer.findById(userId)
    .then(trainer => {
      for (let key in pokemonList) {
        trainer.my_pokemon.push(ObjectId(pokemonList[key]));
      }
      trainer.save();
      res.redirect('/trades');
    });
});

// Exports
module.exports = router;
