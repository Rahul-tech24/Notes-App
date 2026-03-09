import { registerUser, loginUser } from "../services/auth.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

    const result = await registerUser({ username, email, password });

    res.status(201).json(result);

  });

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

    const result = await loginUser({ email, password });

    res.json(result);

  });


export const getMe = asyncHandler(async (req, res) => {

  res.json(req.user);

});
