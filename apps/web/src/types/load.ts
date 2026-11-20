export const loadStatus = [
  "QUOTED",
  "BOOKED",
  "CANCELED",
  "IN_TRANSIT",
  "DELIVERED",
] as const;

export type LoadStatus = (typeof loadStatus)[number];

export type Load = {
  id: string;
  origin: string;
  destination: string;
  status: LoadStatus;
  shipperId: string;
  carrierId: string | null;
  estimatedPickupDate: string | null;
  estimatedDeliveryDate: string | null;
  pickedUpAt: string | null;
  deliveredAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateLoadInput = {
  origin: string;
  destination: string;
  shipperId: string;
  carrierId?: string;
  estimatedPickupDate?: string;
  estimatedDeliveryDate?: string;
};

export type UpdateLoadInput = {
  origin?: string;
  destination?: string;
  carrierId?: string;
  estimatedPickupDate?: string;
  estimatedDeliveryDate?: string;
};

export type UpdateLoadStatusInput = {
  status: LoadStatus;
};
