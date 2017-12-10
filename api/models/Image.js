const mongoose = require('mongoose');

const { Schema } = mongoose;

const Image = new Schema({
  createdAt: { type: Date, default: Date.now },
  img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('Image', Image);
