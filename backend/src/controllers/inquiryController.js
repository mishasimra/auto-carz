import asyncHandler from "express-async-handler";
import Inquiry from "../models/Inquiry.js";

export const getInquiries = asyncHandler(async (_req, res) => {
  const inquiries = await Inquiry.find().populate("product").sort({ createdAt: -1 });
  res.json({ success: true, data: inquiries });
});

export const createInquiry = asyncHandler(async (req, res) => {
  const { name, phone, email, message, product } = req.body;

  if (!name || !phone || !message) {
    const error = new Error("Name, phone, and message are required");
    error.statusCode = 400;
    throw error;
  }

  const inquiry = await Inquiry.create({
    name,
    phone,
    email,
    message,
    product
  });

  res.status(201).json({
    success: true,
    message: "Inquiry submitted successfully",
    data: inquiry
  });
});

export const updateInquiryStatus = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    const error = new Error("Inquiry not found");
    error.statusCode = 404;
    throw error;
  }

  inquiry.status = req.body.status || inquiry.status;
  await inquiry.save();

  res.json({ success: true, data: inquiry });
});

export const deleteInquiry = asyncHandler(async (req, res) => {
  const inquiry = await Inquiry.findById(req.params.id);

  if (!inquiry) {
    const error = new Error("Inquiry not found");
    error.statusCode = 404;
    throw error;
  }

  await inquiry.deleteOne();
  res.json({ success: true, message: "Inquiry deleted" });
});
