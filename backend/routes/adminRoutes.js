import express from "express";
import { adminGetAllProducts, adminGetProductCounts, activateProduct, deleteProduct } from "../controllers/adminController.js";// import orderRouter from "./orderRoutes.js";
import jwtAuthenticate from "../middlewares/jwtAuthenticate.js";
import // getOrderItemStats,
// getAllOrderItems,
// updateOrderItemStatus,
"../controllers/orderController.js";

import {
  getOrderItemStats,
  getAllOrderItems,
  updateOrderItemStatus,
} from "../controllers/adminController.js";

const router = express.Router();

//User Management Routes

//Product Management Routes
router.get("/product", adminGetAllProducts);
router.get("/product/counts", adminGetProductCounts);
router.put("/product/activate/:id", activateProduct);
router.delete("/product/delete/:id", deleteProduct);

//Order Management Routes
router.use("/orders", jwtAuthenticate);

// router.route("/orders/stats").get(getOrderItemStats);
// router.route("/orders/").get(getAllOrderItems);
// router.route("/orders/:orderItemId").put(updateOrderItemStatus);

router.get("/orders/", getAllOrderItems);
router.put("/orders/:orderItemId", updateOrderItemStatus);
router.get("/orders/stats", getOrderItemStats);

export default router;
