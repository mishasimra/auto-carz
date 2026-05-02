import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";
import Inquiry from "../models/Inquiry.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [products, categories, reviews, inquiries, newInquiries] = await Promise.all([
    Product.countDocuments(),
    Category.countDocuments(),
    Review.countDocuments(),
    Inquiry.countDocuments(),
    Inquiry.countDocuments({ status: "new" })
  ]);

  res.json({
    success: true,
    data: { products, categories, reviews, inquiries, newInquiries }
  });
});
