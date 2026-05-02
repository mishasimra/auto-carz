import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getProducts).post(protect, createProduct);
router.get("/:slug", getProductBySlug);
router.route("/admin/:id").put(protect, updateProduct).delete(protect, deleteProduct);

export default router;
