const express = require('express');
const expertController = require('../controllers/expertController');
const router = express.Router();

// Expert registration
router.post('/register', expertController.registerExpert);

// Expert login
router.post('/login', expertController.loginExpert);

// Expert dashboard
router.get('/:expertId/dashboard', expertController.getExpertDashboard);

// Add a new place (only for verified experts)
router.post('/:expertId/addPlaceDetails', expertController.addPlaceDetails);


// Route for users to search for places (assuming this is still part of your requirements)
router.get('/search/:place', expertController.searchByPlace);
module.exports = router;
