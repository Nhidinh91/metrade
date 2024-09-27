import express from "express";
import {
  getAllProducts,
  searchProducts,
  productDetail,
  getProductsByUserId,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/detail/:id", productDetail);
router.get("/newsfeed", getAllProducts);
router.get("/search", searchProducts);
router.get("/selling-page/inventory/:userId", getProductsByUserId);

export default router;
