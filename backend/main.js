import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import connectDB from './configs/database.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
app.use(cors());

// Middleware
// A middleware function in Express.js that is used to parse incoming JSON payloads in HTTP requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

