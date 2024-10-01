import express from "express";
import cookieParser from 'cookie-parser';
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./configs/database.js";
import jwtAuthenticate from "./middlewares/jwtAuthenticate.js";
import authRoutes from "./routes/authRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js"
import cartRoutes from "./routes/cartRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(morgan("dev"));

// Middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/api/user", jwtAuthenticate);
app.use("/api/cart", jwtAuthenticate);
app.use("/api/seller", jwtAuthenticate);
app.use("/api/orders",jwtAuthenticate)

// Routes
app.use("/api/token", tokenRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders",  orderRoutes);
app.use("/api/seller", sellerRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
