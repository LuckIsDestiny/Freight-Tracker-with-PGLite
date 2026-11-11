import { db } from "../../lib/db.js";
import { AppError } from "../../utils/AppError.js";
import { formatInputData } from "../../utils/formatInputData.js";
import {
  createShipperSchema,
  updateShipperSchema,
  type ShipperSchema,
} from "./shipper.validation.js";

export const getShippers = async () => {
  const queryRes = await db.query<ShipperSchema>(`SELECT * FROM "Shipper"`);
  return queryRes.rows;
};

export const getShipperById = async (shipperId: string) => {
  const queryRes = await db.query<ShipperSchema>(
    `SELECT * FROM "Shipper" WHERE id = $1`,
    [shipperId],
  );
  const shipper = queryRes.rows[0];
  if (!shipper) {
    throw new AppError("Shipper not found", 404);
  }
  return shipper;
};

export const createShipper = async (data: Record<string, unknown>) => {
  const inputData = formatInputData(createShipperSchema, data);
  const queryRes = await db.query<ShipperSchema>(
    `INSERT INTO "Shipper" (${Object.keys(inputData)
      .map((key) => `"${key}"`)
      .join(", ")}) VALUES (${Object.keys(inputData)
      .map((_key, i) => `$${i + 1}`)
      .join(", ")}) RETURNING *`,
    Object.keys(inputData).map((key) => data[key]),
  );
  return queryRes.rows[0];
};

export const updateShipper = async (
  shipperId: string,
  data: Record<string, unknown>,
) => {
  const inputData = formatInputData(updateShipperSchema, data);
  const inputDataLength = Object.keys(inputData).length;
  if (inputDataLength === 0) {
    throw new AppError("Nothing to update", 400);
  }
  const queryRes = await db.query<ShipperSchema>(
    `UPDATE "Shipper" SET ${Object.keys(inputData)
      .map((key, i) => `"${key}" = $${i + 1}`)
      .join(
        ", ",
      )}, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $${inputDataLength + 1} RETURNING *`,
    [...Object.keys(inputData).map((key) => data[key]), shipperId],
  );
  return queryRes.rows[0];
};
