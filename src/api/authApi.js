import axiosClient from "./axiosClient";

/**
 * POST /api/auth/register
 * Body: { name, email, password }
 * Returns UserResponse: { userId, name, email, role, createdAt }
 * NOTE: this endpoint does NOT return a token — you have to log in
 * separately afterwards.
 */
export function registerUser({ name, email, password }) {
  return axiosClient
    .post("/auth/register", { name, email, password })
    .then((res) => res.data);
}

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns JwtResponse: { token, tokenType, userId, name, email, role }
 */
export function loginUser({ email, password }) {
  return axiosClient
    .post("/auth/login", { email, password })
    .then((res) => res.data);
}
