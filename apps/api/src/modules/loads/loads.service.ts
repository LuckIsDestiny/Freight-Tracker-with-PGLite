import { db } from "../../lib/db.js";
import {
  createLoadSchema,
  updateLoadSchema,
  type LoadSchema,
  type LoadStatus,
  type UpdateLoadStatusSchema,
} from "./loads.validation.js";
import { AppError } from "../../utils/AppError.js";
import { formatInputData } from "../../utils/formatInputData.js";

export const getLoads = async () => {
  const loads = (await db.query<LoadSchema>(`SELECT * FROM "Load"`)).rows;
  return loads;
};

export const getLoadById = async (loadId: string) => {
  const load = (
    await db.query<LoadSchema>(`SELECT * FROM "Load" WHERE id = $1`, [loadId])
  ).rows[0];
  if (!load) {
    throw new AppError("Load not found", 404);
  }
  return load;
};

export const createLoad = async (data: Record<string, unknown>) => {
  const inputData = formatInputData(createLoadSchema, data);
  const newLoad = (
    await db.query<LoadSchema>(
      `INSERT INTO "Load" (${Object.keys(inputData)
        .map((key) => `"${key}"`)
        .join(
          ", ",
        )}) VALUES (${Object.values(inputData).map((_x, i) => `$${i + 1}`)}) RETURNING *`,
      Object.keys(inputData).map((key) => data[key]),
    )
  ).rows[0];
  return newLoad;
};

export const updateLoad = async (
  loadId: string,
  data: Record<string, unknown>,
) => {
  const ifLoadExists = (
    await db.query<{ exists: boolean }>(
      `SELECT EXISTS (SELECT 1 FROM "Load" WHERE id = $1)`,
      [loadId],
    )
  ).rows[0];
  if (!ifLoadExists?.exists) {
    throw new AppError("Load not found", 404);
  }
  const inputData = formatInputData(updateLoadSchema, data);
  const inputDataLength = Object.keys(inputData).length;
  if (inputDataLength === 0) {
    throw new AppError("Nothing to update", 400);
  }
  const updatedLoad = (
    await db.query<LoadSchema>(
      `UPDATE "Load" SET ${Object.keys(inputData)
        .map((key, i) => `"${key}" = $${i + 1}`)
        .join(
          ", ",
        )}, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $${inputDataLength + 1} RETURNING *`,
      [...Object.keys(inputData).map((key) => data[key]), loadId],
    )
  ).rows[0];
  if (!updatedLoad) {
    throw new AppError(`Load could not be updated`, 409);
  }
  return updatedLoad;
};

const statusMap: Record<LoadStatus, LoadStatus[]> = {
  QUOTED: ["BOOKED", "CANCELED"],
  BOOKED: ["CANCELED", "IN_TRANSIT"],
  IN_TRANSIT: ["DELIVERED"],
  DELIVERED: [],
  CANCELED: [],
};

export const updateLoadStatus = async (
  loadId: string,
  newStatus: LoadStatus,
) => {
  const currentStatus = (
    await db.query<UpdateLoadStatusSchema>(
      `SELECT "status" from "Load" WHERE id = $1`,
      [loadId],
    )
  ).rows[0];
  if (!currentStatus) {
    throw new AppError(`Load not found`, 404);
  }
  let updatedLoad;
  if (statusMap[currentStatus.status].includes(newStatus)) {
    if (newStatus === "IN_TRANSIT") {
      updatedLoad = (
        await db.query<LoadSchema>(
          `UPDATE "Load" SET "status" = $1, "pickedUpAt" = CURRENT_TIMESTAMP WHERE id = $2 AND "status" = $3 RETURNING *`,
          [newStatus, loadId, currentStatus.status],
        )
      ).rows[0];
    } else if (newStatus === "DELIVERED") {
      updatedLoad = (
        await db.query<LoadSchema>(
          `UPDATE "Load" SET "status" = $1, "deliveredAt" = CURRENT_TIMESTAMP WHERE id = $2 AND "status" = $3 RETURNING *`,
          [newStatus, loadId, currentStatus.status],
        )
      ).rows[0];
    } else {
      updatedLoad = (
        await db.query<LoadSchema>(
          `UPDATE "Load" SET "status" = $1 WHERE id = $2 AND "status" = $3 RETURNING *`,
          [newStatus, loadId, currentStatus.status],
        )
      ).rows[0];
    }
    if (!updatedLoad) {
      throw new AppError(`Status could not be changed`, 409);
    }
    return updatedLoad;
  } else {
    throw new AppError(
      `Cannot update status from ${currentStatus.status} to ${newStatus}`,
      400,
    );
  }
};
