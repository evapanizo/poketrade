'use strict';

function requireUser (req, res, next) {
  const user = req.session.currentUser;

  if (!user) {
    return res.redirect('/');
  } else {
    next();
  }
}

module.exports = {
  requireUser
};
