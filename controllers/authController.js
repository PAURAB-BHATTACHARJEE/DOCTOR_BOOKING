const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

exports.registerDoctor = async (req, res) => {
  const { name, email, password, department, city } = req.body;
  try {
    const doctor = new Doctor({ name, email, password: await bcrypt.hash(password, 10), department, city });
    await doctor.save();
    res.status(201).send('Doctor registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.registerPatient = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const patient = new Patient({ name, email, password: await bcrypt.hash(password, 10) });
    await patient.save();
    res.status(201).send('Patient registered');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = role === 'doctor' ? await Doctor.findOne({ email }) : await Patient.findOne({ email });
    if (!user) return res.status(400).send('Invalid email or password');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).send('Invalid email or password');

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
