import express from "express";
import { getAllOrders } from "../controllers/orderController.js";

const router = express.Router({ mergeParams: true });

//get all routes for this user
router.get("/", getAllOrders);


//get a

export default router;
