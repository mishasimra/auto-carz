import { Router } from "express";
import {
  createInquiry,
  deleteInquiry,
  getInquiries,
  updateInquiryStatus
} from "../controllers/inquiryController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.route("/").get(protect, getInquiries).post(createInquiry);
router.route("/:id").put(protect, updateInquiryStatus).delete(protect, deleteInquiry);

export default router;
