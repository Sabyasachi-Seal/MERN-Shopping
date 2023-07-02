import express from "express";
const router = express.Router();
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProducts,
  getProductsById,
  getTopRatedProducts,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middlewares/authMiddles.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopRatedProducts);
router
  .route("/:id")
  .get(getProductsById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);
router.route("/:id/reviews").post(protect, createProductReview);

export default router;
