import { db } from "../../lib/db.js";
import { AppError } from "../../utils/AppError.js";
import { formatInputData } from "../../utils/formatInputData.js";
import {
  createShipperSchema,
  updateShipperSchema,
  type ShipperSchema,
} from "./shipper.validation.js";

export const getShippers = async () => {
  const shippers = (await db.query<ShipperSchema>(`SELECT * FROM "Shipper"`))
    .rows;
  return shippers;
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
  const shipper = (
    await db.query<ShipperSchema>(
      `INSERT INTO "Shipper" (${Object.keys(inputData)
        .map((key) => `"${key}"`)
        .join(", ")}) VALUES (${Object.keys(inputData)
        .map((_key, i) => `$${i + 1}`)
        .join(", ")}) RETURNING *`,
      Object.keys(inputData).map((key) => data[key]),
    )
  ).rows[0];
  return shipper;
};

export const updateShipper = async (
  shipperId: string,
  data: Record<string, unknown>,
) => {
  const ifShipperExists = (
    await db.query<{ exists: boolean }>(
      `SELECT EXISTS (SELECT 1 FROM "Shipper" WHERE id = $1)`,
      [shipperId],
    )
  ).rows[0];
  if (!ifShipperExists?.exists) {
    throw new AppError("Shipper not found", 404);
  }
  const inputData = formatInputData(updateShipperSchema, data);
  const inputDataLength = Object.keys(inputData).length;
  if (inputDataLength === 0) {
    throw new AppError("Nothing to update", 400);
  }
  const updatedShipper = (
    await db.query<ShipperSchema>(
      `UPDATE "Shipper" SET ${Object.keys(inputData)
        .map((key, i) => `"${key}" = $${i + 1}`)
        .join(
          ", ",
        )}, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $${inputDataLength + 1} RETURNING *`,
      [...Object.keys(inputData).map((key) => data[key]), shipperId],
    )
  ).rows[0];
  if (!updatedShipper) {
    throw new AppError(`Shipper could not be updated`, 409);
  }
  return updatedShipper;
};
