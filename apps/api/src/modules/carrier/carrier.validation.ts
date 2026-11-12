import { z } from "zod";

export const createCarrierSchema = z.object({
  mcNumber: z.string().trim().min(9).max(15),
  contactPerson: z.string().trim().min(2),
  contactPhone: z.string().trim().min(2),
  contactEmail: z.string().trim().min(2).optional(),
  name: z.string().trim().min(2),
});

export const updateCarrierSchema = createCarrierSchema.partial();

export const carrierSchema = z.object({
  id: z.uuid(),
  mcNumber: z.string(),
  contactPerson: z.string(),
  contactPhone: z.string(),
  contactEmail: z.string().optional(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const carrierIdParamSchema = z.object({
  carrierId: z.uuid(),
});

export type CarrierIdParamSchema = z.infer<typeof carrierIdParamSchema>;
export type CreateCarrierSchema = z.infer<typeof createCarrierSchema>;
export type UpdateCarrierSchema = z.infer<typeof updateCarrierSchema>;
export type CarrierSchema = z.infer<typeof carrierSchema>;
