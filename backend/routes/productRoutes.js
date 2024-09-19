import express from "express";
import {
  getAllProducts,
  searchProducts,
  productDetail,
  uploadProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/detail/:id", productDetail);
router.get("/newsfeed", getAllProducts);
router.get("/search", searchProducts);
router.post("/upload", uploadProduct);


export default router;
