const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Register User
exports.registerUser = async (req, res) => {
    const { email, password, country, phone, gender } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            email,
            password, // Storing plain text password
            country,
            phone,
            gender,
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        res.status(201).json({
            _id: user._id,
            email: user.email,
            country: user.country,
            phone: user.phone,
            gender: user.gender,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Authenticate User
exports.authUser = async (req, res) => {
    const { email, password } = req.body;
    console.log('Auth request received:', email, password);

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found with email:', email);
            return res.status(400).json({ message: 'Invalid email or password' });
        }
       
        if (user.password !== password) {
            console.log(user.password);
            console.log(password);
            console.log('Password does not match for user:', email);
            
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });

        console.log('User authenticated successfully:', email);

        res.json({
            _id: user._id,
            email: user.email,
            country: user.country,
            phone: user.phone,
            gender: user.gender,
            token,
        });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
