import { db } from "../../lib/db.js";
import { AppError } from "../../utils/AppError.js";
import bcrypt from "bcrypt";
import jwt, { type SignOptions } from "jsonwebtoken";
import type {
  LoginSchema,
  RegisterSchema,
  UserSchema,
} from "./auth.validation.js";
import { env } from "../../config/env.js";

export const register = async (data: RegisterSchema) => {
  const alreadyRegistered = (
    await db.query<{ exists: boolean }>(
      `SELECT EXISTS (SELECT 1 FROM "User" WHERE "email" = $1)`,
      [data.email],
    )
  ).rows[0];

  if (alreadyRegistered?.exists) {
    throw new AppError("Email already exists", 409);
  }

  const encryptedPassword = await bcrypt.hash(data.password, 10);

  const user = (
    await db.query<Omit<UserSchema, "passwordHash">>(
      `INSERT INTO "User" ("name", "email", "passwordHash") VALUES ($1, $2, $3) RETURNING "id", "name", "email", "role", "createdAt", "updatedAt"`,
      [data.name, data.email, encryptedPassword],
    )
  ).rows[0];

  return user;
};

export const login = async (data: LoginSchema) => {
  const user = (
    await db.query<UserSchema>(`SELECT * FROM "User" WHERE "email" = $1`, [
      data.email,
    ])
  ).rows[0];

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isValid = await bcrypt.compare(data.password, user.passwordHash);

  if (!isValid) {
    throw new AppError("Invalid email or password", 401);
  }

  const jwtPayload = { id: user.id, role: user.role };

  const jwtToken = jwt.sign(jwtPayload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRES_IN,
  } as SignOptions);

  const { passwordHash, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token: jwtToken };
};
