import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

type ParamFormat = "body" | "params" | "query";

export const validate = (schema: z.ZodType, format: ParamFormat = "body") => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (format === "query") {
        res.locals[format] = schema.parse(req[format]);
      } else {
        req[format] = schema.parse(req[format]);
      }
    } catch (err) {
      next(err);
    }
  };
};
