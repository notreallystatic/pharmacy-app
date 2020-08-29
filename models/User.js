const mongoose = require('mongoose'),
  moment = require('moment');

// Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: moment().format('MMM Do YYYY')
  },
  mobileNumber: {
    type: String,
    require: true
  },
  photoUrl: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;