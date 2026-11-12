import type { Role } from "../modules/auth/auth.validation.ts";

export {};

export type AuthUser = {
  id: string;
  role: Role;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}
