import { request } from "../lib/api";
import type {
  CreateCarrierInput,
  Carrier,
  UpdateCarrierInput,
} from "../types/carrier";

export const getAllCarriers = async () => {
  return await request<Carrier[]>(`/carrier`);
};
export const getCarrierById = async (carrierId: string) => {
  return await request<Carrier>(`/carrier/${carrierId}`);
};
export const createCarrier = async (data: CreateCarrierInput) => {
  return await request<Carrier>(`/carrier`, { method: "POST", body: data });
};
export const updateCarrier = async (
  carrierId: string,
  data: UpdateCarrierInput,
) => {
  return await request<Carrier>(`/carrier/${carrierId}`, {
    method: "PATCH",
    body: data,
  });
};
