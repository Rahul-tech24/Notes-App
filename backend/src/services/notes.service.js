import Note from "../models/Note.js";
import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";

const ensureValidNoteId = (noteId) => {
  if (!mongoose.isValidObjectId(noteId)) {
    throw new ApiError(400, "Invalid note id");
  }
};

export const createNote = async ({ title, content, userId }) => {

  const note = await Note.create({
    title,
    content,
    user: userId
  });

  return note;

};

export const getNotes = async (userId, page = 1, limit = 10, search = "") => {

  const skip = (page - 1) * limit;

  const query = {
    user: userId,
    title: { $regex: search, $options: "i" }
  };

  const notes = await Note.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Note.countDocuments(query);

  return {
    notes,
    page,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    total
  };

};

export const getNoteById = async (noteId, userId) => {
  ensureValidNoteId(noteId);

  const note = await Note.findOne({
    _id: noteId,
    user: userId
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return note;

};

export const updateNote = async (noteId, userId, data) => {
  ensureValidNoteId(noteId);

  const allowedFields = ["title", "content"];
  const updates = Object.fromEntries(
    Object.entries(data).filter(([key]) => allowedFields.includes(key))
  );

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No valid fields to update");
  }

  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      user: userId
    },
    updates,
    {
      new: true,
      runValidators: true
    }
  );

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return note;

};

export const deleteNote = async (noteId, userId) => {
  ensureValidNoteId(noteId);

  const note = await Note.findOneAndDelete({
    _id: noteId,
    user: userId
  });

  if (!note) {
    throw new ApiError(404, "Note not found");
  }

  return { message: "Note deleted" };

};
