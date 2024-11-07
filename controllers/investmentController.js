const Fund = require('../models/Fund');
const Investment = require('../models/Investment');

// Get all investment funds
const getAllFunds = async (req, res) => {
    try {
        const funds = await Fund.find();
        res.json(funds);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add new investment fund (admin)
const addFund = async (req, res) => {
    const { fundName, amount, returns } = req.body;
    try {
        const newFund = new Fund({ fundName, amount, returns });
        await newFund.save();
        res.json({ message: 'Fund added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Create a new investment
const createInvestment = async (req, res) => {
    const userId = req.params.userId;
    const { fundId, amount } = req.body;

    try {
        const investment = await Investment.create({ userId, fundId, amount });
        return res.status(200).json({ success: true, investment });
    } catch (error) {
        console.error('Investment error:', error);
        return res.status(500).json({ success: false, message: 'Investment failed' });
    }
};

// Get investments for a user
const getInvestments = async (req, res) => {
    const userId = req.params.userId;

    try {
        const investments = await Investment.find({ userId });
        return res.status(200).json({ success: true, investments });
    } catch (error) {
        console.error('Error fetching investments:', error);
        return res.status(500).json({ success: false, message: 'Failed to fetch investments' });
    }
};

module.exports = {
    getAllFunds,
    addFund,
    createInvestment,
    getInvestments
};
