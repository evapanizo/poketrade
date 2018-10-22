'use strict';

// Packages
const express = require('express');
const router = express.Router();
const middlewares = require('../middlewares/middlewares');

// GET
router.get('/', middlewares.isAnon, function (req, res, next) {
  res.render('index');
});

// Exports
module.exports = router;
