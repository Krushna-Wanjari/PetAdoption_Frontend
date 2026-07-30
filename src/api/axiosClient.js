import axios from "axios";

// Base URL for the PetAdopt Spring Boot backend.
// Change this if your backend runs somewhere else (or move it into
// a VITE_API_BASE_URL env var later when you deploy).
const API_BASE_URL = "http://localhost:8080/api";

export const TOKEN_KEY = "petadopt_token";
export const USER_KEY = "petadopt_user";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT (if we have one) to every outgoing request.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// If the backend ever tells us the token is invalid/expired, drop the
// stale session so the UI can fall back to "logged out" state.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
