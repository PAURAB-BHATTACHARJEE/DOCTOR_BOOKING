const express = require('express');
const router = express.Router();
const { bookAppointment } = require('../controllers/bookingController');

router.post('/', bookAppointment);

module.exports = router;
