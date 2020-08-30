const mongoose = require('mongoose');

// Create Schema

const MedSchema = new mongoose.Schema({
  name: String,
  requiresAuth: Boolean,
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    require: true,
  },
  photoUrl: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    require: true,
  },
  meds: [MedSchema],
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
