import React, { useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    const token = sessionStorage.getItem('token');

    if (!city) {
      setError('Please enter a city name.');
      return;
    }

    try {
      const response = await axios.get(`/api/weather?city=${city}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setWeather(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching weather:', error);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setWeather(null);
    setCity('');
    setError('');
    alert('You have been logged out.');
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-lg shadow-lg w-96 mx-auto my-10 transition-transform transform hover:scale-105">
      <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-6">Weather App</h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-700 text-white font-semibold rounded-lg hover:bg-indigo-600 transition-all"
        >
          Get Weather
        </button>
      </form>

      <button
        onClick={handleLogout}
        className="px-6 py-2 mt-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-all"
      >
        Logout
      </button>

      {error && <p className="text-red-300 text-center">{error}</p>}

      {weather && (
        <div className="mt-6 text-center text-white">
          <h3 className="text-2xl font-bold">{weather.city.name}</h3>
          <p className="text-lg mt-2">Current Temperature: {Math.round(weather.list[0].main.temp - 273.15)}°C</p>
          <p className="text-lg">Weather: {weather.list[0].weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.list[0].weather[0].icon}@2x.png`}
            alt={weather.list[0].weather[0].description}
            className="mt-4 w-28 h-28"
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            {weather.list.slice(1, 6).map((day, index) => (
              <div key={index} className="bg-gray-800 rounded-lg p-4 shadow-md">
                <p className="text-lg font-semibold">{new Date(day.dt * 1000).toLocaleDateString()}</p>
                <p className="text-md">Temp: {Math.round(day.main.temp - 273.15)}°C</p>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="w-20 h-20 mx-auto"
                />
                <p className="text-sm text-gray-300">{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
