import { request } from "../lib/api";
import type {
  CreateShipperInput,
  Shipper,
  UpdateShipperInput,
} from "../types/shipper";

export const getAllShippers = async () => {
  return await request<Shipper[]>(`/shipper`);
};
export const getShipperById = async (shipperId: string) => {
  return await request<Shipper>(`/shipper/${shipperId}`);
};
export const createShipper = async (data: CreateShipperInput) => {
  return await request<Shipper>(`/shipper`, { method: "POST", body: data });
};
export const updateShipper = async (
  shipperId: string,
  data: UpdateShipperInput,
) => {
  return await request<Shipper>(`/shipper/${shipperId}`, {
    method: "PATCH",
    body: data,
  });
};
