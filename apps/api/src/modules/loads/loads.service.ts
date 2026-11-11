import { db } from "../../lib/db.js";
import {
  createLoadSchema,
  updateLoadSchema,
  type LoadSchema,
} from "./loads.validation.js";
import { AppError } from "../../utils/AppError.js";
import { formatInputData } from "../../utils/formatInputData.js";

export const getLoads = async () => {
  const queryRes = await db.query<LoadSchema>(`SELECT * FROM "Load"`);
  return queryRes.rows;
};

export const getLoadById = async (loadId: string) => {
  const queryRes = await db.query<LoadSchema>(
    `SELECT * FROM "Load" WHERE id = $1`,
    [loadId],
  );
  const load = queryRes.rows[0];
  if (!load) {
    throw new AppError("Load not found", 404);
  }
  return load;
};

export const createLoad = async (data: Record<string, unknown>) => {
  const inputData = formatInputData(createLoadSchema, data);
  const queryRes = await db.query<LoadSchema>(
    `INSERT INTO "Load" (${Object.keys(inputData)
      .map((key) => `"${key}"`)
      .join(
        ", ",
      )}) VALUES (${Object.values(inputData).map((_x, i) => `$${i + 1}`)}) RETURNING *`,
    Object.keys(inputData).map((key) => data[key]),
  );
  return queryRes.rows[0];
};

export const updateLoad = async (
  loadId: string,
  data: Record<string, unknown>,
) => {
  const inputData = formatInputData(updateLoadSchema, data);
  const inputDataLength = Object.keys(inputData).length;
  if (inputDataLength === 0) {
    throw new AppError("Nothing to update", 400);
  }
  const queryRes = await db.query<LoadSchema>(
    `UPDATE "Load" SET ${Object.keys(inputData)
      .map((key, i) => `"${key}" = $${i + 1}`)
      .join(
        ", ",
      )}, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $${inputDataLength + 2} RETURNING *`,
    [...Object.keys(inputData).map((key) => data[key]), loadId],
  );
  return queryRes.rows[0];
};
