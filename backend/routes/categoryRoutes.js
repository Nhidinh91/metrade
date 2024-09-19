import express from "express";
const router = express.Router();

//Import category controllers
import {getProductsByCategory} from '../controllers/productController.js'
import { categoryHierarchy } from "../controllers/categoryController.js";

//ROUTES

//Routes to categories
router.get('/:categoryId', getProductsByCategory)
router.get("/main-category/main-relationship", categoryHierarchy);



export default router;