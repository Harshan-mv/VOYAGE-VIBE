const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
    placeName: { type: String, required: true },
    travelType: { type: String, required: true },
    bestMonths: { type: String },
    festiveSeason: { type: String },
    activities: { type: String },
    totalCost: { type: Number },
    safetyReports: { type: String },
    recommendedStays: { type: String },
    isVerified: { type: Boolean, default: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert' },
});

// Avoid overwriting the model if it has already been compiled
module.exports = mongoose.models.Travel || mongoose.model('Travel', travelSchema);
