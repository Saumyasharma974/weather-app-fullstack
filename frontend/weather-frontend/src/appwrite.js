// appwrite.js
import { Client } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite endpoint
  .setProject('670903ec00113a352536'); // Replace with your actual project ID

export default client;
