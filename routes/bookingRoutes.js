const express = require('express');
const { createBooking, getDoctorBookings } = require('../controllers/bookingController');
const auth = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', auth('patient'), createBooking);
router.get('/:doctorId', auth('doctor'), getDoctorBookings);

module.exports = router;
