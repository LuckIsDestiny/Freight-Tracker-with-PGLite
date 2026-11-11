import { z } from "zod";

export const loadStatus = [
  "QUOTED",
  "BOOKED",
  "CANCELED",
  "IN_TRANSIT",
  "DELIVERED",
] as const;

export type LoadStatus = (typeof loadStatus)[number];

export const createLoadSchema = z.object({
  origin: z.string().trim().min(2),
  destination: z.string().trim().min(2),
  shipperId: z.string().trim().pipe(z.uuid()),
  carrierId: z.string().trim().pipe(z.uuid()).optional(),
  estimatedPickupDate: z.string().trim().pipe(z.coerce.date()).optional(),
  estimatedDeliveryDate: z.string().trim().pipe(z.coerce.date()).optional(),
});

export const updateLoadSchema = createLoadSchema
  .omit({ shipperId: true })
  .partial();

export const loadSchema = z.object({
  id: z.uuid(),
  origin: z.string(),
  destination: z.string(),
  status: z.enum(loadStatus),
  shipperId: z.uuid(),
  carrierId: z.uuid().optional(),
  estimatedPickupDate: z.date().optional(),
  estimatedDeliveryDate: z.date().optional(),
  pickedUpAt: z.date().optional(),
  deliveredAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const loadIdParamSchema = z.object({
  loadId: z.uuid(),
});

export type LoadIdParamSchema = z.infer<typeof loadIdParamSchema>;
export type CreateLoadSchema = z.infer<typeof createLoadSchema>;
export type UpdateLoadSchema = z.infer<typeof updateLoadSchema>;
export type LoadSchema = z.infer<typeof loadSchema>;
