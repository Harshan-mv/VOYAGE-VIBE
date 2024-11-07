// models/investment.js
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    fundId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Fund' },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Investment', investmentSchema);
