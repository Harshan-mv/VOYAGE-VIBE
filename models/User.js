const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String },
    password: { type: String, required: true },
    investments: [
        {
            fundName: { type: String },
            amount: { type: Number },
            returns: {
                threeYears: Number,
                fiveYears: Number,
                tenYears: Number,
            }
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
