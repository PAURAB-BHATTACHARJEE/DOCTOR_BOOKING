const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  department: String,
  city: String,
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
