// src/components/Home.js
import React from 'react';
import { FaCloudSun } from 'react-icons/fa'; // Import an icon of your choice

const Home = () => {
  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold mb-4">Welcome to the Weather App!</h2>
      <p className="mb-2">Your one-stop solution for checking weather conditions.</p>
      <p className="mb-4">Please register or log in to access the features.</p>
      <div className="text-6xl mb-4"> {/* Adjust size as needed */}
        <FaCloudSun /> {/* Render the icon */}
      </div>
    </div>
  );
};

export default Home;
