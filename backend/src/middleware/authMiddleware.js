import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const resolveUserFromToken = async (authHeader) => {
  if (!authHeader?.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.userId).select("-password");

  return user;
};

export const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  const user = await resolveUserFromToken(authHeader);

  if (!user) {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }

  req.user = user;
  next();
});

export const optionalProtect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    next();
    return;
  }

  const user = await resolveUserFromToken(authHeader);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 401;
    throw error;
  }

  req.user = user;
  next();
});
