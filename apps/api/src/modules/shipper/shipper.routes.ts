import express, { Router } from "express";
import { validate } from "../../middleware/validate.js";
import {
  createShipperSchema,
  shipperIdParamSchema,
} from "./shipper.validation.js";
import * as shipperController from "./shipper.controller.js";
import { auth } from "../../middleware/auth.js";

const router: Router = express.Router();

router.use(auth);

router.get("/", shipperController.getShippers);
router.get(
  "/:shipperId",
  validate(shipperIdParamSchema, "params"),
  shipperController.getShipperById,
);
router.post(
  "/",
  validate(createShipperSchema),
  shipperController.createShipper,
);
router.patch(
  "/:shipperId",
  validate(shipperIdParamSchema, "params"),
  shipperController.updateShipper,
);

export default router;
