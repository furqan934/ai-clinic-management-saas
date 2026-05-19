import {
  createContext,
  useEffect,
  useState,
} from "react";

import api from "../services/api";

export const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, set_user] =
    useState(null);

  const [loading, set_loading] =
    useState(true);

  const load_user = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        set_loading(false);
        return;
      }

      const response =
        await api.get("/auth/me");

      set_user(response.data.user);
    } catch (error) {
      console.log(error);

      localStorage.removeItem("token");
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    load_user();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    set_user(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        set_user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};