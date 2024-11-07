const User = require('../models/User'); // User Model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const mongoose = require('mongoose');
const Place = require('../models/Place');
const Fund = require('../models/Fund');


// Register User
exports.registerUser = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email,
            phone,
            address,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Store the user ID in the session or send it in the redirect URL
        req.session.userId = user._id; // Storing in session (if using express-session)

        // Redirect to the unique user dashboard
       // Redirect to user dashboard
       return res.json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};




// Serve User Dashboard (HTML file)
exports.getUserDashboard = async (req, res) => {
    try {
        const userId = req.params.userId;
        // Fetch user data or render the dashboard as needed
        res.sendFile(path.join(__dirname, '../public/user.html'));  // Serving the user's dashboard
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// serve to show details 
exports.getUserDetails = async (req, res) => {
    const userId = req.params.userId;

    // Validate the userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid User ID' });
    }

    try {
        // Find the user by ID
        const user = await User.findById(userId).select('name email phone address');
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Send the user details as JSON
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Get places for a user dashboard
exports.getPlacesForUser = async (req, res) => {
    try {
        const places = await Place.find({}); // Adjust query as needed
        res.status(200).json(places);
    } catch (error) {
        console.error('Error fetching places:', error);
        res.status(500).json({ error: 'Failed to fetch places' });
    }
};
     



exports.getPlaceById = async (req, res) => {
    const { placeId } = req.params;
    
    try {
        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({ error: 'Place not found' });
        }

        res.status(200).json(place);
    } catch (error) {
        console.error('Error fetching place details:', error);
        res.status(500).json({ error: 'Failed to fetch place details' });
    }
};


exports.processPayment = async (req, res) => {
    const { placeId } = req.params;
    const { userId, paymentDetails } = req.body; // Ensure userId is coming from the request body

    try {
        // Validate placeId and userId
        if (!mongoose.Types.ObjectId.isValid(placeId)) {
            console.error('Invalid place ID:', placeId);
            return res.status(400).json({ error: 'Invalid place ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            console.error('Invalid user ID:', userId);
            return res.status(400).json({ error: 'Invalid user ID' });
        }

        // Fetch the place details by ID
        const place = await Place.findById(placeId);
        if (!place) {
            console.error('Place not found with ID:', placeId);
            return res.status(404).json({ error: 'Place not found' });
        }

        // Fetch user details by ID
        const user = await User.findById(userId);
        if (!user) {
            console.error('User not found with ID:', userId);
            return res.status(404).json({ error: 'User not found' });
        }

        // Simulate payment processing
        console.log('Payment Details:', paymentDetails); // Ensure this is not undefined
        const paymentSuccessful = true; // Replace with real payment logic

        if (!paymentSuccessful) {
            console.error('Payment failed for place:', placeId);
            return res.status(400).json({ error: 'Payment failed' });
        }

        // Respond with success
        console.log('Payment successful for placeId:', placeId);
        res.status(200).json({ message: 'Payment successful!', place, user });

    } catch (error) {
        console.error('Payment processing error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




// Controller function to serve view investment page with fund data
// Controller function to serve view investment page with fund data
// Controller function to serve view investment page
// userController.js
// Controller function to serve view investment page with fund data
exports.viewInvestment = async (req, res) => {
    try {
        const userId = req.params.userId; // Get userId from URL parameters
        const funds = await Fund.find(); // Fetch all fund data from MongoDB

        // Pass the userId to the HTML view by embedding it into the HTML
        res.sendFile(path.join(__dirname, '../public/view-investment.html'), { userId });
    } catch (error) {
        console.error('Error fetching funds:', error);
        res.status(500).send('Internal Server Error');
    }
};


// Controller function to fetch investment data
exports.viewInvestmentData = async (req, res) => {
    try {
        const funds = await Fund.find();
        res.json(funds); // Send data as JSON
    } catch (error) {
        console.error('Error fetching funds:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



