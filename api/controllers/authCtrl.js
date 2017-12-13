// const debug = require('debug')('chakavak:authctrl');
const User = require('../models/User');
// const { selectUserFields } = require('../utils/selectFields');
const { asyncHandleAll } = require('../utils/asyncHandler');

async function register(req, res) {
  if (req.isAuthenticated()) throw new Error('Already logged in');
  const { email, username, password, name } = req.body;
  await User.init();
  await User.register(new User({ email, username, name }), password);
  res.end();
}

async function changePassword(req, res) {
  const { oldPassword, newPassword } = req.body;
  await req.user.changePassword(oldPassword, newPassword);
  res.end();
}

function checkAuth(req, res, next) {
  if (!req.isAuthenticated()) {
    next(new Error('Unauthorized Access'));
  }
  next();
}

module.exports = Object.assign({ checkAuth }, asyncHandleAll({
  register,
  changePassword,
}));
