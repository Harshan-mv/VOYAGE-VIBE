const mongoose = require('mongoose');

const fundSchema = new mongoose.Schema({
    fundName: { type: String, required: true },
    amount: { type: Number },
    returns: {
        threeYears: Number,
        fiveYears: Number,
        tenYears: Number,
    },
    investors: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            amount: Number
        }
    ]
});

module.exports = mongoose.model('Fund', fundSchema);
