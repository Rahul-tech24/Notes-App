import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/apiError.js";

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new ApiError(401, "No token provided"));
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(new ApiError(401, "User no longer exists"));
    }

    req.user = user;
    return next();
  } catch (error) {
    return next(new ApiError(401, "Not authorized"));
  }
};

export default protect;
