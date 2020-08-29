const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  authRequired: {
    type: Boolean,
    required: true,
  },
});

const Medicine = mongoose.model('Medicine', MedicineSchema);
module.exports = Medicine;
