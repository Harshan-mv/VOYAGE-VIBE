const mongoose = require('mongoose');

const expertSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    job: { type: String },
    socialMedia: { type: String },
    jobProfile: { type: String },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    placesAdded: [{ placeId: mongoose.Schema.Types.ObjectId }]
});

module.exports = mongoose.model('Expert', expertSchema);
