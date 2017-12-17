const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp-date-unix');

const { Schema } = mongoose;

const Comment = new Schema({
  postid: { type: Schema.Types.ObjectId, index: true },
  content: String,
  author: String,
  likes: { type: [String], default: [] },
});

Comment.plugin(timestamps);

Comment.methods.like = async function like(username) {
  if (this.likes.includes(username)) return;
  this.likes.push(username);
  this.save();
};

Comment.methods.dislike = async function dislike(username) {
  const idx = this.likes.indexOf(username);
  if (idx === -1) return;
  this.likes.splice(idx, 1);
  this.save();
};

module.exports = mongoose.model('Comment', Comment);
