import express from "express";
import { profile, updateProfile } from "../controllers/userController.js";
import { uploadUserAvatar } from "../middlewares/uploadPhotos.js";
import orderRouter from "./orderRoutes.js";
// import orderRouter from "./categoryRoutes.js";

//
const router = express.Router(); // == userRouter
// const orderRouter = express.Router({ mergeParams: true });

router.use("/profile/detail/:id/orders/", orderRouter);

router.get("/profile/detail/:id", profile);

router.patch(
  "/profile/update/:id",
  uploadUserAvatar.single("avatar"),
  updateProfile
);

//Order
// router.post("/profile");

export default router;
