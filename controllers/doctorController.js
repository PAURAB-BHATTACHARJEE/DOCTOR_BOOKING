// controllers/doctorController.js
const Doctor = require('../models/Doctor');

exports.getDoctorsByCityAndBranch = async (req, res) => {
  const { city, branch } = req.query;

  try {
    const doctors = await Doctor.find({ city, branch });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
