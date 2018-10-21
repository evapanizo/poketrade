// Packages
const User = require('../models/trainer');

// Are user or password empty?
function emptyFields (req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.redirect(`/auth${req.path}`);
  } else {
    next();
  }
}

// Is user logged?
function isLogged (req, res, next) {
  const user = req.session.currentUser;
  if (!user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
}

// Is user logged and trying to acces signup or login routes?
function isAnon (req, res, next) {
  const user = req.session.currentUser;
  if (user) {
    res.redirect('/profile');
  } else {
    next();
  }
}

// Is user already in the database?
function isCreated (req, res, next) {
  const { username } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user) {
        res.render('auth/signup');
      } else {
        next();
      }
    })
    .catch(next);
}

module.exports = {
  emptyFields,
  isLogged,
  isAnon,
  isCreated
};
