import type { Request, Response } from "express";
import * as loadService from "./loads.service.js";
import type {
  CreateLoadSchema,
  LoadIdParamSchema,
  UpdateLoadSchema,
} from "./loads.validation.js";

export const getLoads = async (_req: Request, res: Response) => {
  const loads = await loadService.getLoads();
  res.status(200).json({ success: true, data: loads });
};

export const getLoadById = async (req: Request, res: Response) => {
  const { loadId } = req.params as LoadIdParamSchema;
  const load = await loadService.getLoadById(loadId);
  res.status(200).json({ success: true, data: load });
};

export const createLoad = async (req: Request, res: Response) => {
  const data: CreateLoadSchema = req.body;
  const load = await loadService.createLoad(data);
  res.status(201).json({ success: true, data: load });
};

export const updateLoad = async (req: Request, res: Response) => {
  const { loadId } = req.params as LoadIdParamSchema;
  const data: UpdateLoadSchema = req.body;
  const load = await loadService.updateLoad(loadId, data);
  res.status(200).json({ success: true, data: load });
};
