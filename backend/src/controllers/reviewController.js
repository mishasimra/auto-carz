import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";

export const getReviews = asyncHandler(async (_req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json({ success: true, data: reviews });
});

export const createReview = asyncHandler(async (req, res) => {
  const { customerName, rating, comment, vehicle, featured } = req.body;

  if (!customerName || !rating || !comment) {
    const error = new Error("Missing required review fields");
    error.statusCode = 400;
    throw error;
  }

  const review = await Review.create({
    customerName,
    rating,
    comment,
    vehicle,
    featured: Boolean(featured)
  });

  res.status(201).json({ success: true, data: review });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== undefined) {
      review[key] = value;
    }
  });

  await review.save();
  res.json({ success: true, data: review });
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  await review.deleteOne();
  res.json({ success: true, message: "Review deleted" });
});
