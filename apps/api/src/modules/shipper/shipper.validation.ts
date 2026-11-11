import { z } from "zod";

export const createShipperSchema = z.object({
  contactPerson: z.string().trim().min(2),
  contactPhone: z.string().trim().min(2).optional(),
  contactEmail: z.string().trim().min(2).optional(),
  company: z.string().trim().min(2),
});

export const updateShipperSchema = createShipperSchema.partial();

export const shipperSchema = z.object({
  id: z.uuid(),
  contactPerson: z.string(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),
  company: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const shipperIdParamSchema = z.object({
  shipperId: z.uuid(),
});

export type ShipperIdParamSchema = z.infer<typeof shipperIdParamSchema>;
export type CreateShipperSchema = z.infer<typeof createShipperSchema>;
export type UpdateShipperSchema = z.infer<typeof updateShipperSchema>;
export type ShipperSchema = z.infer<typeof shipperSchema>;
