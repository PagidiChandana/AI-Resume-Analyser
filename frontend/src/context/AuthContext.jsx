import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("ara_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("ara_token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("ara_token", token);
    } else {
      localStorage.removeItem("ara_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("ara_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("ara_user");
    }
  }, [user]);

  const login = async (payload) => {
    const response = await authService.login(payload);
    setUser(response.data.user);
    setToken(response.data.token);
    return response;
  };

  const register = async (payload) => {
    const response = await authService.register(payload);
    setUser(response.data.user);
    setToken(response.data.token);
    return response;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      isAdmin: user?.role === "admin",
      login,
      register,
      logout
    }),
    [user, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
