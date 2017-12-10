const mongoose = require('mongoose');

const { Schema } = mongoose;

const Friend = new Schema({
  friendId: String,
  status: { type: String, enum: ['friend', 'waiting', 'requested'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Friends = new Schema({
  username: { type: String, index: true },
  friends: [Friend],
  createdAt: { type: Date, default: Date.now },
});

Friend.pre('save', function updateTimeStamp(next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt) this.createdAt = currentDate;
  next();
});

module.exports = mongoose.model('Friends', Friends);
