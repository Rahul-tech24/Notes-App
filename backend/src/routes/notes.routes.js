import express from "express";
import protect from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import {
  createNoteValidator,
  noteIdValidator,
  updateNoteValidator
} from "../validators/notes.validators.js";

import {
  createNoteController,
  getNotesController,
  getNoteController,
  updateNoteController,
  deleteNoteController
} from "../controllers/notes.controller.js";

const router = express.Router();


router.post("/", protect, createNoteValidator, validate, createNoteController);

router.get("/", protect, getNotesController);

router.get("/:id", protect, noteIdValidator, validate, getNoteController);

router.put("/:id", protect, updateNoteValidator, validate, updateNoteController);

router.delete("/:id", protect, noteIdValidator, validate, deleteNoteController);


export default router;
