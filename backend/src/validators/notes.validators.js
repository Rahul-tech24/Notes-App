import { body, param } from "express-validator";

export const noteIdValidator = [
  param("id")
    .isMongoId()
    .withMessage("Invalid note id")
];

export const createNoteValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 150 })
    .withMessage("Title must be 150 characters or fewer"),
  body("content")
    .isString()
    .withMessage("Content must be a string")
    .custom((value) => value.trim().length > 0)
    .withMessage("Content is required")
];

export const updateNoteValidator = [
  ...noteIdValidator,
  body()
    .custom((_, { req }) => {
      const allowedFields = ["title", "content"];
      const receivedFields = Object.keys(req.body ?? {});
      const invalidFields = receivedFields.filter(
        (field) => !allowedFields.includes(field)
      );

      if (invalidFields.length > 0) {
        throw new Error(
          `Invalid update fields: ${invalidFields.join(", ")}`
        );
      }

      if (!receivedFields.some((field) => allowedFields.includes(field))) {
        throw new Error("At least one of title or content is required");
      }

      return true;
    }),
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ max: 150 })
    .withMessage("Title must be 150 characters or fewer"),
  body("content")
    .optional()
    .isString()
    .withMessage("Content must be a string")
    .custom((value) => value.trim().length > 0)
    .withMessage("Content is required")
];
