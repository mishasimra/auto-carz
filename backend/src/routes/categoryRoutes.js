import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory
} from "../controllers/categoryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getCategories).post(protect, createCategory);
router.route("/:id").put(protect, updateCategory).delete(protect, deleteCategory);

export default router;
