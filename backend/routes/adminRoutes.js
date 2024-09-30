import express from "express";


const router = express.Router();
import {
  getAllUsers,
  getAllUserCount,
  updateUserStatus,
} from "../controllers/adminController.js";

//User Management Routes
router.get("/users", getAllUsers);
router.get("/users/count", getAllUserCount);
router.post("/users/:id", updateUserStatus);

//Product Management Routes


//Order Management Routes


export default router;
