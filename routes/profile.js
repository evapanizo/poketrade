'use strict';

// Packages
const express = require('express');
const router = express.Router();
const Trainer = require('../models/trainer');
const middlewares = require('../middlewares/middlewares');

// GET Profile View
router.get('/', middlewares.isLogged, (req, res, next) => {
  const userId = req.session.currentUser._id;
  // Render user's profile
  Trainer.findById(userId)
    .then(trainer => {
      // Assign default gender image
      if (!trainer.gender) {
        trainer.gender = '/images/male-female.png';
      }
      // Assign default avatar
      if (!trainer.avatar) {
        trainer.avatar = '/images/default-avatar.png';
      }
      res.render('profile/profile', { 'trainer': trainer });
    })
    .catch(next);
});

// POST Edit form
router.post('/', middlewares.isLogged, (req, res, next) => {
  const userId = req.session.currentUser._id;
  const trainer = req.body;
  Trainer.findByIdAndUpdate(userId, trainer)
    .then(() => {
      res.redirect('/profile');
    })
    .catch(next);
});

// GET Edit Profile View
router.get('/edit', middlewares.isLogged, (req, res, next) => {
  const userId = req.session.currentUser._id;
  // Render edit form
  Trainer.findById(userId)
    .then(trainer => {
      res.render('profile/edit', { 'trainer': trainer });
    })
    .catch(next);
});

// Exports
module.exports = router;
