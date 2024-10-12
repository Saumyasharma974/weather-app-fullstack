// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from './authservice'; 

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the username for valid characters
    const validUserId = username.match(/^[a-zA-Z0-9_.-]{1,36}$/);
    if (!validUserId) {
      alert("Username must be alphanumeric and can contain '.', '-', and '_' (max 36 characters).");
      return;
    }

    try {
      // Call registerUser function from authService
      await registerUser(email, password, username);
      setError(''); // Clear any previous errors
      onRegister(); // Notify parent to change state (e.g., show login)
    } catch (error) {
      setError(error.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="bg-gray-800/80 backdrop-blur-md shadow-xl rounded-lg p-6 md:p-8 w-96">
      <h2 className="text-3xl font-bold text-center mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
          required
        />
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
