// routes/investmentRoutes.js
const express = require('express');
const router = express.Router();
const { getAllFunds, addFund, createInvestment, getInvestments } = require('../controllers/investmentController'); // Combine imports

// Define POST route for investing
router.post('/users/:userId/invest', createInvestment);

// Define GET route to fetch investments for a user
router.get('/users/:userId/investments', getInvestments);

// Get all investment funds
router.get('/', getAllFunds);

// Admin adds a new fund
router.post('/add-fund', addFund);

module.exports = router;
