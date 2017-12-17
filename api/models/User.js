const util = require('util');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const timestamps = require('mongoose-timestamp-date-unix');
const { isEmail, normalizeEmail } = require('validator');

const { Schema } = mongoose;

const User = new Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: { isAsync: false, validator: isEmail },
    index: true,
  },
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    validate: /^[a-z][_a-z0-9]{4,20}/,
    index: true,
  },
  password: {
    type: String,
    // minlength: 8,
  },
  // active: { type: Boolean, default: false },
  name: { type: String, required: true },
  intro: { type: String, default: 'عضو جدید خانواده چکاوک' },
  avatar: { id: Schema.Types.ObjectId, filename: String },
  cover: { id: Schema.Types.ObjectId, filename: String },
  tags: [String],
});

User.plugin(passportLocalMongoose, {
  usernameField: 'username',
  passwordField: 'password',
  limitAttempts: true,
  usernameLowerCase: true,
  usernameQueryFields: ['email'],
});

User.plugin(timestamps);

// promisify passport-local-mongoose methods
User.statics.register = util.promisify(User.statics.register);
User.methods.changePassword = util.promisify(User.methods.changePassword);

User.pre('save', function updateTimeStamp(next) {
  const currentDate = new Date();
  this.updatedAt = currentDate;
  if (!this.createdAt) this.createdAt = currentDate;
  next();
});

User.pre('validate', function normalize(next) {
  this.email = normalizeEmail(this.email);
  next();
});

module.exports = mongoose.model('User', User);
