import express from "express";
import { adminGetAllProducts, adminGetProductCounts, activateProduct, deleteProduct } from "../controllers/adminController.js";

const router = express.Router();
import {
  getAllUsers,
  getAllUserCount,
  updateUserStatus,
} from "../controllers/adminController.js";

//User Management Routes
router.get("/users", getAllUsers);
router.get("/users/count", getAllUserCount);
router.post("/users/:id", updateUserStatus);

//Product Management Routes
router.get("/product", adminGetAllProducts);
router.get("/product/counts", adminGetProductCounts);
router.put("/product/activate/:id", activateProduct);
router.delete("/product/delete/:id", deleteProduct);

//Order Management Routes


export default router;
