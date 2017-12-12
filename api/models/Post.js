const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
  author: { type: String, index: true },
  content: String,
  location: { type: Schema.Types.Mixed, default: null },
  comments: { type: Number, default: 0 },
  likes: { type: [String], default: [] },
  image: String,
});

// TODO: use toJSON and toObject to select fields
// TODO: use simple postid combined with author username as selector
Post.methods.like = async function like(username) {
  if (this.likes.includes(username)) return;
  this.likes.push(username);
  this.save();
};

Post.methods.dislike = async function dislike(username) {
  const idx = this.likes.indexOf(username);
  if (idx === -1) return;
  this.likes.splice(idx, 1);
  this.save();
};

module.exports = mongoose.model('Post', Post);
