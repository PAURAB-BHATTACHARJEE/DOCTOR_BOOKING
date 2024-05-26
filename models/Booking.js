const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', BookingSchema);
