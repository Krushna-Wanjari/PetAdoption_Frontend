import { useCallback, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { TOKEN_KEY, USER_KEY, UNAUTHORIZED_EVENT } from "../api/axiosClient";
import { AuthContext } from "./AuthContext";

function readStoredUser() {
  const storedUser = localStorage.getItem(USER_KEY);
  const storedToken = localStorage.getItem(TOKEN_KEY);
  if (!storedUser || !storedToken) return null;

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  // Lazy initializer reads localStorage once, synchronously, on first
  // render — no effect/loading flag needed for something this cheap.
  const [user, setUser] = useState(readStoredUser);

  function persistSession(token, userData) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
    setUser(userData);
  }

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  // The axios interceptor clears storage on a 401; mirror that into React state
  // so the header, routes and protected pages all react to the session ending.
  useEffect(() => {
    const handleUnauthorized = () => logout();
    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, [logout]);

  async function login(email, password) {
    const data = await loginUser({ email, password }); // JwtResponse
    const userData = {
      userId: data.userId,
      name: data.name,
      email: data.email,
      role: data.role,
    };
    persistSession(data.token, userData);
    return userData;
  }

  async function register(name, email, password) {
    // /api/auth/register only returns the created account, no token,
    // so we log in right after with the same credentials — the user
    // shouldn't have to type their password twice in one flow.
    await registerUser({ name, email, password });
    return login(email, password);
  }

  const value = {
    user,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
