const User = require('../models/User');
const { selectUserFields } = require('../utils/selectFields');
const { asyncHandleAll } = require('../utils/asyncHandler');

async function me(req, res) {
  res.json(selectUserFields(req.user));
}

async function getUser(req, res) {
  const user = await User.findByUsername(req.params.username);
  res.json(selectUserFields(user));
}

async function searchUsers(req, res) {
  const { q, start = 0, num = 3 } = req.query;
  const users = await User
    .find({ name: { $regex: q } })
    .skip(+start)
    .limit(+num);
  res.json(users.map(({ username, name, avatar }) => ({ username, name, avatar })));
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
  searchUsers,
  updateProfile,
  changeAvatar,
  changeCover,
});
