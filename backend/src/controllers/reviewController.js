import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";

const normalizeReviewPayload = ({ name, rating, message, approved }) => ({
  name: typeof name === "string" ? name.trim() : "",
  rating: Number(rating),
  message: typeof message === "string" ? message.trim() : "",
  approved: Boolean(approved)
});

export const getReviews = asyncHandler(async (_req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json({ success: true, data: reviews });
});

export const createReview = asyncHandler(async (req, res) => {
  const { name, rating, message } = normalizeReviewPayload(req.body);

  if (!name || !message || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    const error = new Error("Please provide a valid name, rating, and review message");
    error.statusCode = 400;
    throw error;
  }

  const review = await Review.create({
    name,
    rating,
    message,
    approved: true
  });

  res.status(201).json({
    success: true,
    data: review
  });
});

export const getAdminReviews = asyncHandler(async (_req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json({ success: true, data: reviews });
});

export const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    const error = new Error("Review not found");
    error.statusCode = 404;
    throw error;
  }

  const updates = normalizeReviewPayload(req.body);

  if (req.body.name !== undefined) {
    review.name = updates.name;
  }

  if (req.body.rating !== undefined) {
    if (!Number.isInteger(updates.rating) || updates.rating < 1 || updates.rating > 5) {
      const error = new Error("Rating must be an integer between 1 and 5");
      error.statusCode = 400;
      throw error;
    }

    review.rating = updates.rating;
  }

  if (req.body.message !== undefined) {
    if (!updates.message) {
      const error = new Error("Review message is required");
      error.statusCode = 400;
      throw error;
    }

    review.message = updates.message;
  }

  if (req.body.approved !== undefined) {
    review.approved = updates.approved;
  }

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
