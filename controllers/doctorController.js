const Doctor = require('../models/Doctor');

exports.getAvailableDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ available: true });
    res.json(doctors);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.removeDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).send('Doctor not found');
    doctor.available = false;
    await doctor.save();
    res.send('Doctor removed');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
