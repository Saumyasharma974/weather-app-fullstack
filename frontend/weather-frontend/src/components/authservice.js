// src/services/authService.js
import client from '../appwrite'; // Adjust the import as necessary
import { Account } from 'appwrite';

const account = new Account(client);

// Register a new user
export const registerUser = async (email, password, username) => {
  try {
    const userId = username; // Use the username as the userId
    const response = await account.create(userId, email, password);
    console.log('Registration successful:', response);
    return response;
  } catch (error) {
    console.error('Error during registration:', error.message);
    throw error; // Pass error up to handle in component
  }
};

// Login user with email and password
export const loginUser = async (email, password) => {
  try {
    // Check if a session already exists
    const session = await account.getSession('current');
    if (session) {
      console.log('User is already logged in:', session);
      return session; // You can return the session if already logged in
    }

    // Create an email session
    const response = await account.createEmailPasswordSession(email, password);
    console.log('Login successful:', response);
    
    // Store the session token in sessionStorage
    if (response.$id) {  // Assuming response contains a session ID or token
      sessionStorage.setItem('token', response.$id);
      console.log('Token stored in sessionStorage');
    } else {
      console.error('No token found in the login response.');
    }

    return response;
  } catch (error) {
    console.error('Error during login:', error.message);
    throw error; // Pass error up to handle in component
  }
};

// Logout the user
export const logoutUser = async () => {
  try {
    // Deleting the current session (logging out the user)
    const response = await account.deleteSession('current');
    console.log('Logout successful:', response);

    // Remove the token from sessionStorage upon logout
    sessionStorage.removeItem('token');
    console.log('Token removed from sessionStorage');
    
    return response;
  } catch (error) {
    console.error('Error during logout:', error.message);
    throw error; // Pass error up to handle in component
  }
};
