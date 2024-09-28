import express from "express";
import orderRouter from "./orderRoutes.js";

const router = express.Router();

//User Management Routes

//Product Management Routes

//Order Management Routes
router.use("/transactions", orderRouter);

export default router;
