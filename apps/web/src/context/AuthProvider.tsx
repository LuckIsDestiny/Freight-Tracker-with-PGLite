import type React from "react";
import { AuthContext } from "./AuthContext";
import { clearToken, getToken } from "../lib/token";
import { useCallback, useEffect, useState } from "react";
import type { User, LoginInput } from "../types/auth";
import { getMe, login } from "../services/auth.service";

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => getToken());
  const [user, setUser] = useState<User | null>(null);

  const userLogin = async (data: LoginInput) => {
    const user = await login(data);
    setUser(user);
    setToken(() => getToken());
    return user;
  };

  const logout = useCallback(() => {
    clearToken();
    setToken(null);
    setUser(null);
  }, []);

  useEffect(() => {
    let ignore = false;
    if (!token || user) {
      return;
    }
    getMe()
      .then((user) => {
        if (!ignore) {
          setUser(user);
        }
      })
      .catch((err) => {
        if (!ignore) {
          console.error(
            err instanceof Error ? err.message : "Something went wrong",
          );
        }
      });
    return () => {
      ignore = true;
    };
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: token !== null,
        login: userLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
