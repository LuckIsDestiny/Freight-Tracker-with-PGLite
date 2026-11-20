import { createContext } from "react";
import type { LoginInput, User } from "../types/auth";

export type AuthContextType = {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (data: LoginInput) => Promise<User>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
