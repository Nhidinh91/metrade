import express from "express";
import {
  getOrderHistory,
  getAllOrderItems,
  updateOrderItemStatus,
} from "../controllers/orderController.js";
import jwtAuthenthicate from "../middlewares/jwtAuthenticate.js";

// to merge route that make use of param of previous route that this route mounted on
// const router = express.Router({ mergeParams: true });
const router = express.Router();

// in normal site
router.route("/order-history").get(getOrderHistory);
// in admin site
router.route("/").get(getAllOrderItems);
router.route("/:orderItemId").put(updateOrderItemStatus);

export default router;
