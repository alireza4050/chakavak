const Post = require('../models/Post');
const Comment = require('../models/Comment');
const Friends = require('../models/Friends');
const debug = require('debug')('chakavak:post');
const { selectPostFields, selectCommentFields } = require('../utils/selectFields');
const { asyncHandleAll } = require('../utils/asyncHandler');

async function getPost(req, res) {
  const { postid } = req.params;
  const [post, comments] = await Promise.all([
    Post.findById(postid).then(selectPostFields),
    Comment.find({ postid }),
  ]);
  comments.map(selectCommentFields);
  res.json({ post, comments });
}

async function getPosts(req, res) {
  const { start = 0, num = 5 } = req.query;
  const posts = (await Post.find({ author: req.params.author })
    .sort({ createdAt: 1 })
    .skip(+start)
    .limit(+num))
    .map(selectPostFields);
  res.json(posts);
}

async function getFeed(req, res) {
  const { username } = req.user;
  const { start = 0, num = 5 } = req.query;
  const { friends } = await Friends
    .findOne({ username, 'friends.status': 'friend' });
  const friendNames = friends.map(({ friendname }) => friendname);
  const posts = (await Post.find({ author: { $in: friendNames } })
    .sort({ createdAt: 1 })
    .skip(+start)
    .limit(+num))
    .map(selectPostFields);
  res.json(posts);
}

async function addPost(req, res) {
  debug(req.file);
  const post = await new Post({
    author: req.user.username,
    location: req.body.location,
    content: req.body.content,
    image: { id: req.file.id, filename: req.file.filename },
  }).save();
  res.json(selectPostFields(post));
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
