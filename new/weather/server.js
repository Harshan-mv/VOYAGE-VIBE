require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3030;

// Serve static files from the public folder
app.use(express.static('public'));


// Endpoint to get weather data
app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        const apiKey = process.env.WEATHER_API_KEY;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(weatherUrl);

        // Send the full weather data response
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(500).send('Error fetching weather data');
    }
});


console.log('Loaded API Key:', process.env.WEATHER_API_KEY);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
   

});
