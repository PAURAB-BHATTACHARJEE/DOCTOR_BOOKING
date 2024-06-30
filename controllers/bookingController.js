const Booking = require('../models/Booking');
const Doctor = require('../models/Doctor');

exports.bookAppointment = async (req, res) => {
    const { patientName, age, gender, city, branch, doctorId, date } = req.body;

    try {
        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        if (doctor.appointmentsAvailable <= 0) {
            return res.status(400).json({ message: 'No more booking slots available for this date' });
        }

        const booking = await Booking.create({
            patientName,
            age,
            gender,
            city,
            branch,
            doctor: doctorId,
            date,
        });

        doctor.appointmentsAvailable -= 1;
        await doctor.save();

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
