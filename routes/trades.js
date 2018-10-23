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
    });
});

// GET Add a pokemon in my_pokemon array
router.get('/add/my-pokemon', middlewares.isLogged, function (req, res, next) {
  return res.render('trades/add-my-pokemon');
});

// GET Add a pokemon in wish_list array
router.get('/add/wish-list', middlewares.isLogged, function (req, res, next) {
  return res.render('trades/add-wish-list');
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
      return res.redirect('/trades');
    });
});

// POST Add a pokemon in wish_list array
router.post('/add/wish-list', middlewares.isLogged, function (req, res, next) {
  const pokemonList = req.body;
  const userId = res.locals.currentUser._id;
  Trainer.findById(userId)
    .then(trainer => {
      for (let key in pokemonList) {
        trainer.wish_list.push(ObjectId(pokemonList[key]));
      }
      trainer.save();
      return res.redirect('/trades');
    });
});

// POST Delete a pokemon in my_pokemon array
router.post('/:index/my_pokemon/delete', middlewares.isLogged, function (req, res, next) {
  const userId = res.locals.currentUser._id;
  const index = req.params.index;
  Trainer.findById(userId)
    .populate('my_pokemon')
    .then(trainer => {
      trainer.my_pokemon.splice(index, 1);
      trainer.save();
      return res.redirect('/trades');
    })
    .catch(next);
});

// POST Delete a pokemon in wish_list array
router.post('/:index/wish-list/delete', middlewares.isLogged, function (req, res, next) {
  const userId = res.locals.currentUser._id;
  const index = req.params.index;
  Trainer.findById(userId)
    .populate('wish_list')
    .then(trainer => {
      trainer.wish_list.splice(index, 1);
      trainer.save();
      return res.redirect('/trades');
    })
    .catch(next);
});

// Exports
module.exports = router;
