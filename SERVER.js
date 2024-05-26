const express = require('express');
const path = require('path'); // Import the path module
const cors = require('cors');
const connectDB = require('./config/DB');
const authRoutes = require('./routes/authRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const app = express();


// Connect to database
connectDB();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/bookings', bookingRoutes);

// console.log('MONGO_URI:', process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
