// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Weather from './components/weather'; // Weather component
import Login from './components/loginuser'; 
import Register from './components/Register'; // Register component
import Home from './components/Home'; // Home component
import { Account } from 'appwrite'; // Adjust the import based on your setup

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await Account.getSession('current');
        if (session) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('No active session:', error);
      }
    };

    checkSession();

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
    setShowRegister(false); // Ensure registration form is closed
  };

  const handleRegister = () => {
    setShowRegister(false);
    setShowLogin(true); // Redirect to login after registration
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLogin(false);
    setShowRegister(false); // Close forms on logout
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    const newTheme = !isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-gray-800'}`}>
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-blue-600">
        <h1 className="text-xl font-bold">Weather App</h1>
        <div className="flex space-x-4">
          <button onClick={toggleTheme} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Logout</button>
          ) : (
            <>
              <button onClick={() => { setShowLogin(true); setShowRegister(false); }} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Login</button>
              <button onClick={() => { setShowRegister(true); setShowLogin(false); }} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
            </>
          )}
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center p-8">
        {/* Conditional Rendering for Forms and Components */}
        {showRegister && (
          <Register onRegister={handleRegister} />
        )}
        {showLogin && (
          <Login onLogin={handleLogin} />
        )}
        {isAuthenticated && !showRegister && !showLogin && (
          <Weather />
        )}
        {!isAuthenticated && !showLogin && !showRegister && (
          <Home /> 
        )}
      </div>
    </div>
  );
};

export default App; // Corrected line
