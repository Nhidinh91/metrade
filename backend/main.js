import express from "express";
import dotenv from "dotenv";
import connectDB from "./configs/database.js";
import authRoutes from "./routes/authRoutes.js";

import { logger } from "./middlewares/logger.js";

dotenv.config();

const app = express();

// Middleware
// A middleware function in Express.js that is used to parse incoming JSON payloads in HTTP requests
app.use(express.json());
app.use(logger);
// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.status(500).json({
    message: "This is resposne",
  });
});
// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
