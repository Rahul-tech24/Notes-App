import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/apiError.js";

const sanitizeUser = (user) => {
  const { password, ...safeUser } = user.toObject();
  return safeUser;
};

export const registerUser = async ({ username, email, password }) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  const token = generateToken(user._id);

  return { user: sanitizeUser(user), token };
};

export const loginUser = async ({ email, password }) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user._id);

  return { user: sanitizeUser(user), token };
};
