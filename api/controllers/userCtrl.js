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

module.exports = asyncHandleAll({
  me,
  getUser,
});
