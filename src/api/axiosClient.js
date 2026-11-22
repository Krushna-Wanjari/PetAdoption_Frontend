import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

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

// If the backend tells us the token is invalid/expired, drop the stale session.
// A CustomEvent is dispatched as well: clearing localStorage alone leaves the
// React auth state untouched, so the navbar would keep rendering "logged in"
// while every request came back 401.
export const UNAUTHORIZED_EVENT = "petadopt:unauthorized";

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
      window.dispatchEvent(new CustomEvent(UNAUTHORIZED_EVENT));
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
