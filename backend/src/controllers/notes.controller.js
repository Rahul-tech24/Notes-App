import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} from "../services/notes.service.js";

import asyncHandler from "../utils/asyncHandler.js";

export const createNoteController = asyncHandler(async (req, res) => {
        

    const { title, content } = req.body;

    const note = await createNote({
      title,
      content,
      userId: req.user._id
    });

    res.status(201).json(note);

  } );
  
export const getNotesController = asyncHandler(async (req, res) => {

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = req.query.search || "";

  const result = await getNotes(
    req.user._id,
    page,
    limit,
    search
  );

    res.json(result);
    
});



export const getNoteController = asyncHandler(async (req, res) => {
  

    const note = await getNoteById(
      req.params.id,
      req.user._id
    );

    res.json(note);

  });

export const updateNoteController = asyncHandler(async (req, res) => {

    const updatedNote = await updateNote(
      req.params.id,
      req.user._id,
      req.body
    );

    res.json(updatedNote);

  });

export const deleteNoteController = asyncHandler(async (req, res) => {

    const result = await deleteNote(
      req.params.id,
      req.user._id
    );

    res.json(result);

});
  