import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReviews,
  updateReview
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getReviews).post(protect, createReview);
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

export default router;
