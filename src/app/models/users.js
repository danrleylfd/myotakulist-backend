const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const schema = new mongoose.Schema({
  discordID: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  discrim: {
    type: String,
    required: false,
    unique: true,
    lowercase: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
}, { timestamps: true });

schema.pre('save', async function (next) {
  this.discrim = `@${this.email.split("@")[0]}`;
  if(!this.password) return next();
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

module.exports = mongoose.model('User', schema);
