import axios from "axios";
import { queryClient } from "../lib/queryClient";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL?.trim() + "/api" || "http://localhost:5000/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {

    if (error.response?.status === 401) {

      localStorage.removeItem("token");

      queryClient.clear();

      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }

    }

    return Promise.reject(error);
  }
);

export default api;
