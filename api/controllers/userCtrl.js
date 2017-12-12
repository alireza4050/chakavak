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

async function updateProfile(req, res) {
  const { username } = req.user;
  const { name, intro, tags } = req.body;
  const user = await User.findOneAndUpdate({ username }, { name, intro, tags });
  res.json(selectUserFields(user));
}

module.exports = asyncHandleAll({
  me,
  getUser,
  updateProfile,
});
