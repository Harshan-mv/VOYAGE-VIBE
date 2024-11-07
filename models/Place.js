const mongoose = require('mongoose'); // Add this line to import mongoose

// Define the schema for Place details added by an expert
const placeSchema = new mongoose.Schema({
    placeName: { type: String, required: true },
    travelType: { type: String, required: true },
    bestMonths: { type: String, required: true },
    festiveSeason: { type: String, required: true },
    activities: { type: String, required: true },
    totalCost: { type: Number, required: true },
    safetyReports: { type: String, required: true },
    recommendedStays: { type: String, required: true },
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Expert', required: true }, // Link to the expert who added the details
    photo: { type: String, required: false } // New field for photo URL
});

// Avoid model recompilation error during hot reload
module.exports = mongoose.models.Place || mongoose.model('Place', placeSchema);
