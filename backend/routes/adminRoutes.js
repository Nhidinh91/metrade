import express from "express";
import orderRouter from "./orderRoutes.js";
import jwtAuthenticate from "../middlewares/jwtAuthenticate.js";

const router = express.Router();

//User Management Routes

//Product Management Routes

//Order Management Routes
router.use("/transactions", jwtAuthenticate, orderRouter);

export default router;
