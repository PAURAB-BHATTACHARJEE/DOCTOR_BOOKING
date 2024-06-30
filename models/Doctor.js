const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    branch: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    appointmentsAvailable: {
        type: Number,
        required: true,
        default: 20, // Assuming each doctor starts with 20 available appointments
    },
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
