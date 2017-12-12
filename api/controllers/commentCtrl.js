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

module.exports = asyncHandleAll({
  addComment,
});

