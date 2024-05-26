const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const { doctorId } = req.body;
  try {
    const booking = new Booking({ doctor: doctorId, patient: req.user.id });
    await booking.save();
    res.status(201).send('Booking created');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getDoctorBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ doctor: req.params.doctorId }).populate('patient');
    res.json(bookings);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
