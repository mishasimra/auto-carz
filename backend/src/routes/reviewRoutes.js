import { Router } from "express";
import {
  createReview,
  deleteReview,
  getAdminReviews,
  getReviews,
  updateReview
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(getReviews).post(createReview);
router.get("/admin", protect, getAdminReviews);
router.route("/:id").put(protect, updateReview).delete(protect, deleteReview);

export default router;
