'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Trainer = require('../models/trainer');
const sms = require('../helpers/messages');
const vars = require('../helpers/constants');
const helpers = require('../helpers/helpers');

// get sign up view
router.get('/signup', middlewares.isAnon, function (req, res, next) {
  res.render('auth/signup');
});

// post sign up form
router.post('/signup', middlewares.isAnon, middlewares.emptyFields, middlewares.isCreated, function (req, res, next) {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const trainer = {
    'username': username,
    'password': hashedPassword,
    'avatar': helpers.getPathImages(vars.constants.defaultAvatar),
    'gender': helpers.getPathImages(vars.constants.defaultGenderImage),
    'age': 0,
    'location': 'N/A',
    'description': 'N/A',
    'telegram': 'N/A'
  };
  Trainer.create(trainer)
    .then(newUser => {
      req.session.currentUser = newUser;
      res.redirect('/profile');
    })
    .catch(next);
});

// get login view
router.get('/login', middlewares.isAnon, function (req, res, next) {
  res.render('auth/login');
});

// post login view
router.post('/login', middlewares.isAnon, middlewares.emptyFields, function (req, res, next) {
  const { username, password } = req.body;
  Trainer.findOne({ username })
    .then(user => {
      if (!user) {
        req.flash('error', sms.messages.noUserMessage);
        return res.redirect('/auth/login');
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.redirect('/profile');
      } else {
        req.flash('error', sms.messages.incorrectPass);
        return res.redirect('/auth/login');
      }
    });
});

// post logout
// la asincronia se maneja con promises y callbacks como en este ejemplo con el condicional
router.post('/logout', middlewares.isLogged, function (req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      next(err);
    } else {
      res.redirect('/');
    }
  });
});

// Exports
module.exports = router;
