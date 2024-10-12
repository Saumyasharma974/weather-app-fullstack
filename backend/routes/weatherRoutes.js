// weatherRoutes.js
import express from 'express'; // Use ES6 import syntax
import { getWeather } from '../controllers/weathercontrollers.js';// Ensure the path is correct
const router = express.Router();

// GET /api/weather?city=London
router.get('/', getWeather);

export default router; // Use export default
