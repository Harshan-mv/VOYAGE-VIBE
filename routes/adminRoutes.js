const express = require('express');
const adminController = require('../controllers/adminController');
const router = express.Router();

// Verify expert
router.post('/verify-expert/:expertId', adminController.verifyExpert);

// Verify place
router.post('/verify-place/:placeId', adminController.verifyPlace);

// Add new investment fund
router.post('/add-fund', adminController.addInvestmentFund);

// Fetch all pending experts
router.get('/experts', adminController.getPendingExperts);

// Approve an expert
router.put('/experts/:id/approve', adminController.approveExpert);

// Deny an expert
router.delete('/experts/:id/deny', adminController.denyExpert);

// View a single expert's details
router.get('/experts/:id', adminController.viewExpertDetails);
// Route to fetch verified experts with their travel details
router.get('/verified-experts', adminController.getVerifiedExpertsWithTravelDetails);
module.exports = router;
