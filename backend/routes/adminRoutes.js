import express from "express";
import { adminGetAllProducts, adminGetProductCounts, activateProduct, deleteProduct } from "../controllers/adminController.js";

const router = express.Router();

//User Management Routes


//Product Management Routes
router.get("/product", adminGetAllProducts);
router.get("/product/counts", adminGetProductCounts);
router.put("/product/activate/:id", activateProduct);
router.delete("/product/delete/:id", deleteProduct);

//Order Management Routes


export default router;
