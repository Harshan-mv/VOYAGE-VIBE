const Expert = require('../models/Expert');
const bcrypt = require('bcrypt');
const Place = require('../models/Place');
const path = require('path');
const multer = require('multer');


// Utility function for error response
const sendErrorResponse = (res, message, status = 400) => {
    return res.status(status).json({ error: message });
};

// Register expert
exports.registerExpert = async (req, res) => {
    const { name, email, phone, job, socialMedia, jobProfile, password } = req.body;
    try {
        const existingExpert = await Expert.findOne({ email });
        if (existingExpert) {
            return sendErrorResponse(res, 'Expert already registered with this email', 400);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newExpert = new Expert({ name, email, phone, job, socialMedia, jobProfile, password: hashedPassword });
        await newExpert.save();
        res.status(201).json({ message: 'Expert registered successfully' });
    } catch (error) {
        sendErrorResponse(res, error.message);
    }
};

// Login expert
exports.loginExpert = async (req, res) => {
    const { email, password } = req.body;
    try {
        const expert = await Expert.findOne({ email });
        if (!expert) return res.status(404).json({ error: 'Expert not found' });

        // Check if the expert is verified
        if (!expert.verified) {
            return res.status(403).json({ error: 'Expert not verified by admin' });
        }

        const match = await bcrypt.compare(password, expert.password);
        if (!match) return res.status(401).json({ error: 'Invalid credentials' });

        res.json({ message: 'Login successful', expertId: expert._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Fetch expert dashboard
exports.getExpertDashboard = async (req, res) => {
    const expertId = req.params.expertId;
    res.sendFile(path.join(__dirname, '../public/expert.html')); // Adjust the path if necessary
};


// Set up multer for file uploads
// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Directory where photos will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generate unique filenames
    }
});

const upload = multer({ storage: storage }).single('photo');


// Add place details by expert
// Modify addPlaceDetails to include photo
exports.addPlaceDetails = (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.error('Multer Error:', err);
            return res.status(500).json({ error: 'Photo upload failed' });
        }

        const { placeName, travelType, bestMonths, festiveSeason, activities, totalCost, safetyReports, recommendedStays } = req.body;
        const photo = req.file ? `/uploads/${req.file.filename}` : null;

        // Check for missing fields
        if (!placeName || !travelType || !bestMonths || !festiveSeason || !activities || !totalCost || !safetyReports || !recommendedStays || !photo) {
            return res.status(400).json({ error: 'All fields are required, including a photo' });
        }

        try {
            const placeDetails = new Place({
                placeName,
                travelType,
                bestMonths,
                festiveSeason,
                activities,
                totalCost,
                safetyReports,
                recommendedStays,
                photo,  // Save the photo URL
                addedBy: req.params.expertId
            });

            await placeDetails.save();
            res.status(200).json({ message: 'Place details added successfully!' });
        } catch (error) {
            console.error('Database Error:', error);
            res.status(500).json({ error: 'Failed to add place details' });
        }
    });
};


// Search by place (optional)
exports.searchByPlace = async (req, res) => {
    const place = req.params.place;
    try {
        const places = await Place.find({ placeName: new RegExp(place, 'i') });
        res.status(200).json(places);
    } catch (error) {
        sendErrorResponse(res, 'Place not found', 404);
    }
};
