export {};

export const role = ["USER", "ADMIN"] as const;

export type Role = (typeof role)[number];

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
