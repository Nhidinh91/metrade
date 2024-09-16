import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from './configs/database.js';
import jwtAuthenticate from './middlewares/jwtAuthenticate.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';


dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(morgan("dev"));

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/user", jwtAuthenticate);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
