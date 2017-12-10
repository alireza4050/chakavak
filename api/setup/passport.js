const passport = require('passport');
const User = require('../models/User');

function setupPassport(app) {
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
}

module.exports = setupPassport;
