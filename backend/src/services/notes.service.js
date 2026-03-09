import Note from "../models/Note.js";

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
    totalPages: Math.ceil(total / limit),
    total
  };

};

export const getNoteById = async (noteId, userId) => {

  const note = await Note.findOne({
    _id: noteId,
    user: userId
  });

  if (!note) {
    throw new Error("Note not found");
  }

  return note;

};

export const updateNote = async (noteId, userId, data) => {

  const note = await Note.findOneAndUpdate(
    {
      _id: noteId,
      user: userId
    },
    data,
    { new: true }
  );

  if (!note) {
    throw new Error("Note not found");
  }

  return note;

};

export const deleteNote = async (noteId, userId) => {

  const note = await Note.findOneAndDelete({
    _id: noteId,
    user: userId
  });

  if (!note) {
    throw new Error("Note not found");
  }

  return { message: "Note deleted" };

};