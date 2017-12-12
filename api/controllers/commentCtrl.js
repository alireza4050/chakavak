const Comment = require('../models/Comment');
const { selectCommentFields } = require('../utils/selectFields');
const { asyncHandleAll } = require('../utils/asyncHandler');

async function addComment(req, res) {
  const comment = await new Comment({
    author: req.user.username,
    postid: req.body.postid,
    content: req.body.content,
  });
  res.json(selectCommentFields(comment));
}

async function likeComment(req, res) {
  const { username } = req.user;
  await Comment.findByIdAndUpdate(req.body.id, { $push: { likes: username } });
  res.end();
}

async function dislikeComment(req, res) {
  const { username } = req.user;
  await Comment.findByIdAndUpdate(req.body.id, { $pull: { likes: username } });
  res.end();
}

module.exports = asyncHandleAll({
  addComment,
  likeComment,
  dislikeComment,
});

