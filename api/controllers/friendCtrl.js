const Friend = require('../models/Friends');
const { asyncHandleAll } = require('../utils/asyncHandler');

async function getFriends(req, res) {
  const { username } = req.user;
  const { start = 0, num = 5 } = req.query;
  const { friends } = await Friend.findOne({ username })
    .skip(+start)
    .limit(+num);

  res.json(friends);
}

async function requestFriendship(req, res) {
  const { username } = req.user;
  const { recipient } = req.body;
  await Promise.all([
    Friend.findOneAndUpdate(
      { username, $not: { 'friends.friendname': recipient } },
      { $push: { friends: { friendname: recipient, status: 'requested' } } },
    ),
    Friend.findOneAndUpdate(
      { username: recipient, $not: { 'friends.friendname': username } },
      { $push: { friends: { friendname: recipient, status: 'waiting' } } },
    ),
  ]);
  res.end();
}

async function acceptFriendship(req, res) {
  const { username } = req.user;
  const { recipient } = req.body;
  await Promise.all([
    Friend.findOneAndUpdate(
      { username, friends: { friendname: recipient, status: 'waiting' } },
      { $push: { friends: { friendname: recipient, status: 'friend' } } },
    ),
    Friend.findOneAndUpdate(
      { username: recipient, friends: { friendname: username, status: 'requested' } },
      { $push: { friends: { friendname: recipient, status: 'friend' } } },
    ),
  ]);
  res.end();
}

async function removeFriend(req, res) {
  const { username } = req.user;
  const { recipient } = req.body;
  await Promise.all([
    Friend.findOneAndUpdate(
      { username },
      { $pull: { friends: { friendname: recipient } } },
    ),
    Friend.findOneAndUpdate(
      { username: recipient },
      { $pull: { friends: { friendname: username } } },
    ),
  ]);
  res.end();
}

module.exports = asyncHandleAll({
  getFriends,
  requestFriendship,
  acceptFriendship,
  removeFriend,
});
