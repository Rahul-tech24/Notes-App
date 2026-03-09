import User from "../models/User.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async ({ username, email, password }) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  const token = generateToken(user._id);

  return { user, token };
};

export const loginUser = async ({ email, password }) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = generateToken(user._id);

  return { user, token };
};