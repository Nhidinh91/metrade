import express from 'express';
const router = express.Router();

//Import category controllers
import {
  getProductsByCategory,
  getProductsByCategoryV1,
} from '../controllers/productControllers.js';
import {
  getCategories,
  getMainCategories,
  categoryHierarchy,
  getCategoryRelationships,
} from "../controllers/categoryControllers.js";

//ROUTES
router.get("/:categoryId", getProductsByCategory);
router.get("/main-category/main-relationship", categoryHierarchy);

//anh thử chạy bằng controller thi nó hiện ra sản phẩm nha
// router.get('/:categoryId', getProductsByCategoryV1);
// router.get("/main-category/:categoryId/relationships", getCategoryRelationships);
// router.get("/main-category/main", getMainCategories);
// router.get("/trung/:categoryId", getProductsByCategoryV1);
// router.get('/', getCategories);

export default router;
