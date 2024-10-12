import axios from 'axios'; // Import axios at the top

const getWeather = async (req, res) => {
    const city = req.query.city;  // Get city from query params
    if (!city) {
        return res.status(400).json({ message: 'City is required' });
    }

    try {
        const apiKey = process.env.WEATHER_API_KEY;
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
        );

        const weatherData = response.data;
        res.status(200).json(weatherData);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching weather data' });
    }
};

export { getWeather }; // Use export syntax instead of module.exports
