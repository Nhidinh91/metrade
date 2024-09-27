import express from "express";
import upload from "../configs/cloudinary.js";
import { uploadProduct, uploadProductImages } from "../controllers/sellerController.js";

const router = express.Router();

router.post("/upload", uploadProduct);
router.post("/imageUpload", upload.array("files", 4), uploadProductImages);

export default router;