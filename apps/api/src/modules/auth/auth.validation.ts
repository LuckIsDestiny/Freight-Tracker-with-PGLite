import { z } from "zod";
import { role } from "../../types/express.d.js";

export const registerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().pipe(z.email()),
  password: z.string().trim().min(8),
});

export const loginSchema = z.object({
  email: z.string().trim().pipe(z.email()),
  password: z.string().trim(),
});

export const userSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string(),
  role: z.enum(role),
  passwordHash: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type UserSchema = z.infer<typeof userSchema>;
export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
