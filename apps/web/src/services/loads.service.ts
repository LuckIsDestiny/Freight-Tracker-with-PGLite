import { request } from "../lib/api";
import type {
  CreateLoadInput,
  Load,
  UpdateLoadInput,
  UpdateLoadStatusInput,
} from "../types/load";

export const getAllLoads = async () => {
  return await request<Load[]>(`/loads`);
};
export const getLoadById = async (loadId: string) => {
  return await request<Load>(`/loads/${loadId}`);
};
export const createLoad = async (data: CreateLoadInput) => {
  return await request<Load>(`/loads`, { method: "POST", body: data });
};
export const updateLoad = async (loadId: string, data: UpdateLoadInput) => {
  return await request<Load>(`/loads/${loadId}`, {
    method: "PATCH",
    body: data,
  });
};
export const updateLoadStatus = async (
  loadId: string,
  data: UpdateLoadStatusInput,
) => {
  return await request<Load>(`/loads/${loadId}/status`, {
    method: "POST",
    body: data,
  });
};
