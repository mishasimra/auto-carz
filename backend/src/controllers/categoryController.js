import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";
import slugify from "../utils/slugify.js";

export const getCategories = asyncHandler(async (_req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json({ success: true, data: categories });
});

export const createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    const error = new Error("Category name is required");
    error.statusCode = 400;
    throw error;
  }

  const category = await Category.create({
    name,
    description,
    slug: slugify(name)
  });

  res.status(201).json({ success: true, data: category });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  category.name = req.body.name || category.name;
  category.description = req.body.description ?? category.description;
  category.slug = slugify(category.name);

  await category.save();

  res.json({ success: true, data: category });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    const error = new Error("Category not found");
    error.statusCode = 404;
    throw error;
  }

  await category.deleteOne();
  res.json({ success: true, message: "Category deleted" });
});
