const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    verifiedExperts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expert' }],
    verifiedPlaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' }]
});

module.exports = mongoose.model('Admin', adminSchema);
