// no tengo el model de users
const User = require('../models/users');
// comprobar que los campos de user y pass no estan vacios
function emptyFields (req, res, next) {
  const { username, password } = req.body;
  if (!username || !password) {
    res.render('users/signup', { error: 'The fields should not be empty' });
  } else {
    next();
  }
}
// comprobar que el user esta logeado
function isLogged (req, res, next) {
  const user = req.session.currentUser;
  if (!user) {
    res.redirect('/users/login');
  } else { next(); }
}

function isAnon (req, res, next) {
  const user = req.session.currentUser;
  if (user) {
    res.redirect('/users/profile');
  } else { next(); }
}
// comprobar que el user no esta usado ya
function isCreated (req, res, next) {
  const { username } = req.body;
  User.findOne({ username })
    .then((user) => {
      if (user) {
        res.render('users/signup', { error: 'The user already exists, choose another name' });
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
