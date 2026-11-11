import { db } from "../../lib/db.js";
import { AppError } from "../../utils/AppError.js";
import { formatInputData } from "../../utils/formatInputData.js";
import {
  createCarrierSchema,
  updateCarrierSchema,
  type CarrierSchema,
} from "./carrier.validation.js";

export const getCarriers = async () => {
  const queryRes = await db.query<CarrierSchema>(`SELECT * FROM "Carrier"`);
  return queryRes.rows;
};

export const getCarrierById = async (carrierId: string) => {
  const queryRes = await db.query<CarrierSchema>(
    `SELECT * FROM "Carrier" WHERE id = $1`,
    [carrierId],
  );
  const carrier = queryRes.rows[0];
  if (!carrier) {
    throw new AppError("Carrier not found", 404);
  }
  return carrier;
};

export const createCarrier = async (data: Record<string, unknown>) => {
  const inputData = formatInputData(createCarrierSchema, data);
  const queryRes = await db.query<CarrierSchema>(
    `INSERT INTO "Carrier" (${Object.keys(inputData)
      .map((key) => `"${key}"`)
      .join(", ")}) VALUES (${Object.keys(inputData)
      .map((_key, i) => `$${i + 1}`)
      .join(", ")}) RETURNING *`,
    Object.keys(inputData).map((key) => data[key]),
  );
  return queryRes.rows[0];
};

export const updateCarrier = async (
  carrierId: string,
  data: Record<string, unknown>,
) => {
  const inputData = formatInputData(updateCarrierSchema, data);
  const inputDataLength = Object.keys(inputData).length;
  if (inputDataLength === 0) {
    throw new AppError("Nothing to update", 400);
  }
  const queryRes = await db.query<CarrierSchema>(
    `UPDATE "Carrier" SET ${Object.keys(inputData)
      .map((key, i) => `"${key}" = $${i + 1}`)
      .join(
        ", ",
      )}, "updatedAt" = CURRENT_TIMESTAMP WHERE "id" = $${inputDataLength + 1} RETURNING *`,
    [...Object.keys(inputData).map((key) => data[key]), carrierId],
  );
  return queryRes.rows[0];
};
