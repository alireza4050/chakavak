const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Friends = require('../models/Friends');
const debug = require('debug')('chakavak:post');
const { selectUserFields, selectPostFields, selectCommentFields } = require('../utils/selectFields');
const { asyncHandleAll } = require('../utils/asyncHandler');

async function getPost(req, res) {
  const { postid } = req.params;
  const [post, comments] = await Promise.all([
    Post.findById(postid).then(selectPostFields),
    Comment.find({ postid }),
  ]);
  post.author = await User.findByUsername(post.author).then(selectUserFields);
  comments.map(selectCommentFields);
  res.json({ post, comments });
}

async function getPosts(req, res) {
  const { start = 0, num = 5 } = req.query;
  const posts = (await Post.find({ author: req.params.author })
    .sort({ createdAt: -1 })
    .skip(+start)
    .limit(+num))
    .map(selectPostFields);
  await Promise.all(posts
    .map(post => User
      .findByUsername(post.author)
      .then(selectUserFields)
      .then((user) => { post.author = user; }))); // eslint-disable-line no-param-reassign
  res.json(posts);
}

async function getFeed(req, res) {
  const { username } = req.user;
  const { start = 0, num = 5 } = req.query;
  const { friends } = await Friends
    .findOne({ username, 'friends.status': 'friend' });
  const friendNames = friends.map(({ friendname }) => friendname);
  // include users own posts in feed
  friendNames.push(username);
  const posts = (await Post.find({ author: { $in: friendNames } })
    .sort({ createdAt: -1 })
    .skip(+start)
    .limit(+num))
    .map(selectPostFields);
  await Promise.all(posts
    .map(post => User
      .findByUsername(post.author)
      .then(selectUserFields)
      .then((user) => { post.author = user; }))); // eslint-disable-line no-param-reassign
  res.json(posts);
}

async function addPost(req, res) {
  debug(req.file);
  const newPost = { author: req.user.username };
  if (req.body.content) newPost.content = req.body.content;
  if (req.body.location) newPost.location = req.body.location;
  if (req.file) {
    const { id, filename } = req.file;
    newPost.image = { id, filename };
  }
  const post = await new Post(newPost).save().then(selectPostFields);
  post.author = selectUserFields(req.user);
  res.json(post);
}

async function likePost(req, res) {
  const { username } = req.user;
  await Post.findByIdAndUpdate(req.body.id, { $push: { likes: username } });
  res.end();
}

async function dislikePost(req, res) {
  const { username } = req.user;
  await Post.findByIdAndUpdate(req.body.id, { $pull: { likes: username } });
  res.end();
}

module.exports = asyncHandleAll({
  getPost,
  getPosts,
  getFeed,
  addPost,
  likePost,
  dislikePost,
});
