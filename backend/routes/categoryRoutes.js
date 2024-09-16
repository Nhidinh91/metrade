import express from "express";
const router = express.Router();

//Import category controllers
import {getProductsByCategory} from '../controllers/productController.js'
import {getCategories} from '../controllers/categoryController.js'

//ROUTES
router.get('/:categoryId', getProductsByCategory)
router.get('/', getCategories)


export default router;