import express from 'express';
const router = express.Router();

//Import category controllers
import {
  getProductsByCategory,
  getProductsByCategoryV1,
} from '../controllers/productControllers.js';
import { getCategories } from '../controllers/categoryControllers.js';

//ROUTES
// router.get("/:categoryId", getProductsByCategory);

//anh thử chạy bằng controller thi nó hiện ra sản phẩm nha
router.get('/:categoryId', getProductsByCategoryV1);
// router.get("/trung/:categoryId", getProductsByCategoryV1);
router.get('/', getCategories);

export default router;
