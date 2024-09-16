import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from './configs/database.js';
import jwtAuthenticate from './middleware/jwtAuthenticate.js';
import authRoutes from './routes/authRoutes.js';

import categoryRoutes from './routes/categoryRoutes.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();
app.use(cors());

// Middleware
// A middleware function in Express.js that is used to parse incoming JSON payloads in HTTP requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes)

// Connect to MongoDB
connectDB();

app.use(morgan("dev"));

// Handle CORS
// app.use(cors());
app.use(cors());
app.use(express.json());
app.use("/api/user", jwtAuthenticate);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
