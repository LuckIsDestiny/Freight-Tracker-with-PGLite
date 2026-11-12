import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError.js";
import { z } from "zod";

export const errorHandler = async (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  if (err instanceof z.ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }
  if ("type" in err && err.type === "entity.parse.failed") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid JSON format" });
  }
  console.error(err);
  return res
    .status(500)
    .json({ success: false, message: "Internal server error" });
};
