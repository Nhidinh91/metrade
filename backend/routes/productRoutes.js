import express from "express";
import jwtAuthenticate from "../middlewares/jwtAuthenticate.js";
import {
  getAllProducts,
  searchProducts,
  productDetail,
  uploadProduct,
  uploadProductImages
} from "../controllers/productController.js";
import upload from "../configs/cloudinary.js";

const router = express.Router();


router.get("/detail/:id", productDetail);
router.get("/newsfeed", getAllProducts);
router.get("/search", searchProducts);

router.use(jwtAuthenticate);
router.post("/upload", uploadProduct);
router.post('/imageUpload', upload.array('files', 4), uploadProductImages);

export default router;
