import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import slugify from "../utils/slugify.js";

export const getProducts = asyncHandler(async (req, res) => {
  const { search = "", category, featured } = req.query;
  const query = {};

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { shortDescription: { $regex: search, $options: "i" } }
    ];
  }

  if (featured === "true") {
    query.featured = true;
  }

  if (category) {
    const categoryDoc = await Category.findOne({
      $or: [{ slug: category }, { _id: category }]
    });

    if (categoryDoc) {
      query.category = categoryDoc._id;
    }
  }

  const products = await Product.find(query)
    .populate("category")
    .sort({ createdAt: -1 });

  res.json({ success: true, data: products });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate("category");

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  res.json({ success: true, data: product });
});

export const createProduct = asyncHandler(async (req, res) => {
  const { name, shortDescription, description, price, category, images, featured, specs, inStock } =
    req.body;

  if (!name || !shortDescription || !description || !price || !category) {
    const error = new Error("Missing required product fields");
    error.statusCode = 400;
    throw error;
  }

  const product = await Product.create({
    name,
    shortDescription,
    description,
    price,
    category,
    images: images || [],
    featured: Boolean(featured),
    specs: specs || [],
    inStock: inStock ?? true,
    slug: slugify(name)
  });

  const populatedProduct = await product.populate("category");
  res.status(201).json({ success: true, data: populatedProduct });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  const fields = [
    "name",
    "shortDescription",
    "description",
    "price",
    "category",
    "images",
    "featured",
    "specs",
    "inStock"
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  product.slug = slugify(product.name);
  await product.save();
  const populatedProduct = await product.populate("category");

  res.json({ success: true, data: populatedProduct });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  await product.deleteOne();
  res.json({ success: true, message: "Product deleted" });
});
