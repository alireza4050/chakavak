const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp-date-unix');

const { Schema } = mongoose;

const Post = new Schema({
  author: { type: String, index: true },
  content: String,
  location: Schema.Types.Mixed,
  comments: { type: Number, default: 0 },
  likes: { type: [String], default: [] },
  image: { id: Schema.Types.ObjectId, filename: String },
});

Post.plugin(timestamps);

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
