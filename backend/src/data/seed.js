import dotenv from "dotenv";
import connectDatabase from "../config/db.js";
import Category from "../models/Category.js";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import User from "../models/User.js";
import { categories, products, reviews } from "./seedData.js";
import slugify from "../utils/slugify.js";

dotenv.config();

const seed = async () => {
  await connectDatabase();
  await Promise.all([
    User.deleteMany(),
    Category.deleteMany(),
    Product.deleteMany(),
    Review.deleteMany()
  ]);

  const admin = await User.create({
    name: "Auto Carz Admin",
    email: process.env.ADMIN_EMAIL || "admin@cartechnic.com",
    password: process.env.ADMIN_PASSWORD || "ChangeMe123!"
  });

  const createdCategories = await Category.insertMany(categories);
  const categoryMap = new Map(createdCategories.map((category) => [category.slug, category._id]));

  await Product.insertMany(
    products.map((product) => ({
      name: product.name,
      slug: slugify(product.name),
      shortDescription: product.shortDescription,
      description: product.description,
      price: product.price,
      category: categoryMap.get(product.categorySlug),
      featured: product.featured,
      images: product.images,
      specs: product.specs
    }))
  );

  await Review.insertMany(reviews);

  console.log(`Seed completed for ${admin.email}`);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
