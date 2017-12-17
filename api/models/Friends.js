const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp-date-unix');

const { Schema } = mongoose;

const Friend = new Schema({
  friendname: String,
  status: { type: String, enum: ['friend', 'waiting', 'requested'] },
});

const Friends = new Schema({
  username: { type: String, index: true },
  friends: { type: [Friend], default: [] },
});

Friends.plugin(timestamps);

module.exports = mongoose.model('Friends', Friends);
