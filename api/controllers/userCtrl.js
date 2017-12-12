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
  const { user } = req;
  const { name, intro, tags } = req.body;
  Object.assign(user, { name, intro, tags });
  await user.save();
  res.json(selectUserFields(user));
}

async function changeAvatar(req, res) {
  const { user } = req;
  const { id, filename } = req.file;
  user.avatar = { id, filename };
  await user.save();
  res.json(selectUserFields(user));
}

async function changeCover(req, res) {
  const { user } = req;
  const { id, filename } = req.file;
  user.cover = { id, filename };
  await user.save();
  res.json(selectUserFields(user));
}

module.exports = asyncHandleAll({
  me,
  getUser,
  updateProfile,
  changeAvatar,
  changeCover,
});
