/* const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

// Route for expert to add place details
// router.post('/experts/:expertId/addPlaceDetails', travelController.addPlaceDetails);

// router.post('/experts/:expertId/add-place', travelController.addPlaceDetails);
router.post('/:expertId/addPlaceDetails', travelController.addPlaceDetails);

// Route for users to search for places
router.get('/search/:place', travelController.searchByPlace);

module.exports = router; */
