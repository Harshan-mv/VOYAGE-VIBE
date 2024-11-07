const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const path = require('path');
const { viewInvestment, viewInvestmentData } = require('../controllers/userController'); // Import the functions

// User Registration
router.post('/register', userController.registerUser);

// User Login
router.post('/login', userController.loginUser);

// Fetch user dashboard (serving the HTML file)
router.get('/:userId/dashboard', userController.getUserDashboard);
// for fetching details
router.get('/:userId/details', userController.getUserDetails);
// In routes file (e.g., routes/user.js)
router.get('/places', userController.getPlacesForUser);
// Fetch place details by ID for payment
router.get('/places/:placeId', userController.getPlaceById);

router.get('/payment/:placeId', (req, res) => {
    // Serve the payment page
    res.sendFile(path.join(__dirname, '../public/payment.html')); // Adjust path as needed
});

// Serve the booking confirmation page
router.get('/booking-confirmation', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/booking-confirmation.html')); // Serve booking-confirmation.html
});

router.post('/payment/:placeId', userController.processPayment);
router.get('/places/:placeId', userController.getPlaceById);
// Serve the view-investment page
// Fetch funds for view investment page
// Serve investment view for a specific user
router.get('/:userId/view-investment', userController.viewInvestment); // This will render the view for investments
 // Render view page
router.get('/:userId/investments', viewInvestmentData); 












module.exports = router;
