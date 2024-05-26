const express = require('express');
const { getPatients } = require('../controllers/patientController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', auth('doctor'), getPatients);

module.exports = router;
