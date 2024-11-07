const Admin = require('../models/Admin');
const Expert = require('../models/Expert');
const Place = require('../models/Place');
const Fund = require('../models/Fund');

// Fetch pending experts
exports.getPendingExperts = async (req, res) => {
    try {
        const pendingExperts = await Expert.find({ verified: false });
        res.json(pendingExperts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching pending experts' });
    }
};

// Verify expert
exports.verifyExpert = async (req, res) => {
    const { expertId } = req.params;
    try {
        const expert = await Expert.findById(expertId);
        if (!expert) throw new Error('Expert not found');
        expert.verified = true;
        await expert.save();
        res.json({ message: 'Expert verified successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Approve an expert
exports.approveExpert = async (req, res) => {
    const { id } = req.params;
    try {
        const expert = await Expert.findById(id);
        if (!expert) return res.status(404).json({ error: 'Expert not found' });
        expert.verified = true;
        await expert.save();
        res.json({ message: 'Expert approved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to approve expert' });
    }
};
// Deny an expert
exports.denyExpert = async (req, res) => {
    const { id } = req.params;
    try {
        const expert = await Expert.findById(id);
        if (!expert) {
            return res.status(404).json({ error: 'Expert not found' });
        }
        // Delete expert if found
        await Expert.findByIdAndDelete(id);
        res.json({ message: 'Expert denied and removed successfully' });
    } catch (error) {
        res.status(500).json({ error: `Failed to deny expert: ${error.message}` });
    }
};


// View a single expert's details
exports.viewExpertDetails = async (req, res) => {
    const { id } = req.params;
    try {
        // Populate placesAdded with place details
        const expert = await Expert.findById(id).populate('placesAdded');
        if (!expert) return res.status(404).json({ error: 'Expert not found' });
        res.json(expert);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch expert details' });
    }
};
  

// Fetch all verified experts and their added travel places
exports.getVerifiedExpertsWithTravelDetails = async (req, res) => {
    try {
        const verifiedExperts = await Expert.find({ verified: true }).populate('placesAdded').exec();
        res.json(verifiedExperts);  // Send verified experts as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch verified experts' });
    }
};





// Verify place
exports.verifyPlace = async (req, res) => {
    const { placeId } = req.params;
    try {
        const place = await Place.findById(placeId);
        if (!place) throw new Error('Place not found');
        place.isVerified = true;
        await place.save();
        res.json({ message: 'Place verified successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Add investment fund
exports.addInvestmentFund = async (req, res) => {
    const { fundName, fundAmount, returns } = req.body;
    
    try {
        const parsedReturns = JSON.parse(returns); // Parse the returns JSON string
        const newFund = new Fund({
            fundName,
            amount: fundAmount,
            returns: parsedReturns // Use parsed returns data
        });
        await newFund.save();
        res.json({ message: 'Investment fund added successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


