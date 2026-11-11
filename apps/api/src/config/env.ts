import "dotenv/config";
import { AppError } from "../utils/AppError.js";

const getEnv = (variable: string) => {
  const envVar = process.env[variable];
  if (!envVar) {
    throw new AppError(`Environment variable not set: ${variable}`, 500);
  }
  return envVar;
};

const PORT = process.env.PORT || 5000;

const JWT_SECRET = getEnv("JWT_SECRET");

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export const env = {
  PORT,
  JWT_SECRET,
  JWT_EXPIRES_IN,
};
