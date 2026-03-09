import express from "express";
import protect from "../middleware/auth.middleware.js";

import {
  createNoteController,
  getNotesController,
  getNoteController,
  updateNoteController,
  deleteNoteController
} from "../controllers/notes.controller.js";

const router = express.Router();


router.post("/", protect, createNoteController);

router.get("/", protect, getNotesController);

router.get("/:id", protect, getNoteController);

router.put("/:id", protect, updateNoteController);

router.delete("/:id", protect, deleteNoteController);


export default router;