import express from "express";
import {
  getOrderHistory,
  // getAllOrderItems,
  // updateOrderItemStatus,
  // getOrderItemStats,
} from "../controllers/orderController.js";
import jwtAuthenthicate from "../middlewares/jwtAuthenticate.js";

// to merge route that make use of param of previous route that this route mounted on
// const router = express.Router({ mergeParams: true });
const router = express.Router();


router.route("/order-history").get(getOrderHistory);




export default router;
