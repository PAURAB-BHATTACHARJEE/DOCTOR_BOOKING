const express = require('express');
const { registerDoctor, registerPatient, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register/doctor', registerDoctor);
router.post('/register/patient', registerPatient);
router.post('/login', login);

module.exports = router;
