// const passport = require('passport');
// const debug = require('debug')('chakavak:authctrl');
const User = require('../models/User');
const { selectUserFields } = require('../utils/selectFields');
const { asyncHandleAll } = require('../utils/asyncHandler');

async function me(req, res) {
  res.json(selectUserFields(req.user));
}

async function getUser(req, res) {
  const { username } = req.params;
  const user = await User.findOne({ username });
  res.json(selectUserFields(user));
}

async function register(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/');
    return;
  }
  const { email, username, password, name } = req.body;
  await User.init();
  User.register(new User({ email, username, name }), password, (err) => {
    if (err) throw err;
    res.redirect('/');
  });
  // user.authenticate(password, () => res.json({ user }));
  // passport.authenticate('local')(req, res, () => res.json({ user }));
}


function checkAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    next(new Error('Unauthorized Access'));
  }
  next();
}

module.exports = Object.assign(
  { checkAuth },
  asyncHandleAll({ me, getUser, register }),
);
