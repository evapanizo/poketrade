'use strict';

// Packages
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const middlewares = require('../middlewares/middlewares');
const Trainer = require('../models/trainer');
const ObjectId = mongoose.Types.ObjectId;

// GET Trades View
router.get('/', middlewares.isLogged, function (req, res, next) {
  const userId = res.locals.currentUser._id;
  Trainer.findById(userId)
    .populate('my_pokemon')
    .populate('wish_list')
    .then(trainer => {
      return res.render('trades/trades', { 'trainer': trainer });
    })
    .catch(next);
});

// GET Add a pokemon in an array
router.get('/add/:array', middlewares.isLogged, function (req, res, next) {
  const pokemonArray = req.params.array;
  if (pokemonArray === 'my_pokemon') {
    return res.render('trades/add-my-pokemon');
  } else if (pokemonArray === 'wish_list') {
    return res.render('trades/add-wish-list');
  }
});

// POST Add a pokemon in an array
router.post('/add/:array', middlewares.isLogged, function (req, res, next) {
  const pokemonList = req.body;
  const userId = res.locals.currentUser._id;
  const pokemonArray = req.params.array;
  Trainer.findById(userId)
    .then(trainer => {
      for (let key in pokemonList) {
        if (pokemonArray === 'my_pokemon') {
          trainer.my_pokemon.push(ObjectId(pokemonList[key]));
        } else if (pokemonArray === 'wish_list') {
          trainer.wish_list.push(ObjectId(pokemonList[key]));
        }
      }
      trainer.save();
      return res.redirect('/trades');
    })
    .catch(next);
});

// POST Delete a pokemon in array
router.post('/:index/:array/delete', middlewares.isLogged, function (req, res, next) {
  const userId = res.locals.currentUser._id;
  const index = req.params.index;
  const pokemonArray = req.params.array;
  Trainer.findById(userId)
    .populate(pokemonArray)
    .then(trainer => {
      if (pokemonArray === 'my_pokemon') {
        trainer.my_pokemon.splice(index, 1);
      } else if (pokemonArray === 'wish_list') {
        trainer.wish_list.splice(index, 1);
      }
      trainer.save();
      return res.redirect('/trades');
    })
    .catch(next);
});

// Exports
module.exports = router;
