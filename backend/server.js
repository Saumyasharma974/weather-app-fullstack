import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import router from './routes/weatherRoutes.js';


dotenv.config();
connectDB();  // Connect to MongoDB

const app = express();
app.use(express.json());
app.use('/api/weather', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
