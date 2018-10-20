'use strict';

// Packages
const express = require('express');
const router = express.Router();

// GET
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

// Exports
module.exports = router;
