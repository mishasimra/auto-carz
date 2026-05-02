import { Router } from "express";
import { getProfile, loginAdmin } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", protect, getProfile);

export default router;
