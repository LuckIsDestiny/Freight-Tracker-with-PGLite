import { z } from "zod";

export const formatInputData = (
  schema: z.ZodObject,
  data: Record<string, unknown>,
) => {
  const output: Record<string, unknown> = {};
  const possibleFields = new Set(Object.keys(schema.shape));
  for (let field in data) {
    if (possibleFields.has(field)) {
      output[field] = `"${field}"`;
    }
  }
  return output;
};
