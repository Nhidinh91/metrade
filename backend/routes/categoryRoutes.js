import express from "express";
const router = express.Router();

//Import category controllers
import {getProductsByCategory} from '../controllers/productControllers.js'
import {getCategories} from '../controllers/categoryControllers.js'

//ROUTES
router.get('/:categoryId', getProductsByCategory)
router.get('/', getCategories)


export default router;