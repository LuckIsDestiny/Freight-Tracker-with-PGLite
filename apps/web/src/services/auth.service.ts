import { request } from "../lib/api";
import { setToken } from "../lib/token";
import type {
  LoginInput,
  LoginResponse,
  RegisterInput,
  User,
} from "../types/auth";

export const register = async (data: RegisterInput) => {
  return await request<User>(`/auth/register`, {
    method: "POST",
    body: data,
    skipAuthHandling: true,
  });
};
export const login = async (data: LoginInput) => {
  const loginResponse = await request<LoginResponse>(`/auth/login`, {
    method: "POST",
    body: data,
    skipAuthHandling: true,
  });
  setToken(loginResponse.token);
  return loginResponse.user;
};
export const getMe = async () => {
  return await request<User>(`/auth/me`);
};
