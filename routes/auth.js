'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Trainer = require('../models/trainer');

// get sign up view
router.get('/signup', middlewares.isAnon, function (req, res, next) {
  res.render('auth/signup');
});

// post sign up form
router.post('/signup', middlewares.isAnon, middlewares.emptyFields, middlewares.isCreated, function (req, res, next) {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  Trainer.create({ 'username': username, 'password': hashedPassword })
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
        return res.redirect('/login');
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/profile');
      } else {
        res.redirect('/login');
      }
    });
});

// post logout

router.post('/logout', middlewares.isLogged, function (req, res, next) {
  req.session.destroy((err) => next(err));
  res.redirect('/');
});

// Exports
module.exports = router;
