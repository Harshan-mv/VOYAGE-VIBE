/* const Travel = require('../models/Travel');

// Add travel details by expert
exports.addPlaceDetails = async (req, res) => {
    const { placeName, travelType, bestMonths, festiveSeason, activities, totalCost, safetyReports, recommendedStays } = req.body;

    // Log the entire request body to debug
    console.log('Request Body:', req.body);

    // Check if required fields are missing
    if (!placeName || !travelType || !bestMonths || !festiveSeason || !activities || !totalCost || !safetyReports || !recommendedStays) {
        console.error('Missing required fields');
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const placeDetails = new Travel({
            placeName,
            travelType,
            bestMonths,
            festiveSeason,
            activities,
            totalCost,
            safetyReports,
            recommendedStays,
            addedBy: req.params.expertId
        });

        await placeDetails.save();
        res.status(200).json({ message: 'Place details added successfully!' });
    } catch (error) {
        console.error('Error while saving place details:', error);
        res.status(500).json({ error: 'Failed to add place details' });
    }
};


// Search travel details by place
exports.searchByPlace = async (req, res) => {
    const place = req.params.place;

    try {
        // Use a case-insensitive regular expression to search for places
        const travelDetails = await Travel.find({ placeName: new RegExp(place, 'i') }); // Adjusted the key to `placeName`
        
        if (travelDetails.length > 0) {
            res.status(200).json(travelDetails);
        } else {
            res.status(404).json({ message: 'No travel details found for this place.' });
        }
    } catch (error) {
        console.error('Error while retrieving travel details:', error);
        res.status(500).json({ error: 'Error retrieving travel details' });
    }
};
 */