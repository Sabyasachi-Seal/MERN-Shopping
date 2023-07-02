import express from "express";
const router = express.Router();
import {
  authUser,
  deleteUser,
  getProfile,
  getUserById,
  getUsers,
  registerUser,
  updateProfile,
  updateUserById,
} from "../controllers/userController.js";
import { protect, admin } from "../middlewares/authMiddles.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserById);

export default router;
