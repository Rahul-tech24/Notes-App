import api from "./axios";

export const getNotes = async (params) => {

  const response = await api.get("/notes", { params });

  return response.data;

};

export const createNote = async (data) => {

  const response = await api.post("/notes", data);

  return response.data;

};

export const deleteNote = async (id) => {

  const response = await api.delete(`/notes/${id}`);

  return response.data;

};