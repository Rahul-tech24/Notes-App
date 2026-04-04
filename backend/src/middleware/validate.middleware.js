import { validationResult } from "express-validator";
import ApiError from "../utils/apiError.js";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  return next(
    new ApiError(400, "Validation failed", errors.array({ onlyFirstError: true }))
  );
};

export default validate;
