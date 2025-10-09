import axios from "axios";

export const baseURL = "http://localhost:5000"; // tanpa /api

export const api = axios.create({ baseURL: baseURL });

// ikutkan token kalau ada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
