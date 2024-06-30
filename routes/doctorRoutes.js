// routes/doctorRoutes.js
const express = require('express');
const { getDoctorsByCityAndBranch } = require('../controllers/doctorController');
const router = express.Router();

router.get('/', getDoctorsByCityAndBranch);

module.exports = router;
