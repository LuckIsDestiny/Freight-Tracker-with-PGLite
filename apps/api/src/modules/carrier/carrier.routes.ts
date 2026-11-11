import express, { Router } from "express";
import { validate } from "../../middleware/validate.js";
import {
  createCarrierSchema,
  carrierIdParamSchema,
} from "./carrier.validation.js";
import * as carrierController from "./carrier.controller.js";
import { auth } from "../../middleware/auth.js";

const router: Router = express.Router();

router.use(auth);

router.get("/", carrierController.getCarriers);
router.get(
  "/:carrierId",
  validate(carrierIdParamSchema, "params"),
  carrierController.getCarrierById,
);
router.post(
  "/",
  validate(createCarrierSchema),
  carrierController.createCarrier,
);
router.patch(
  "/:carrierId",
  validate(carrierIdParamSchema, "params"),
  carrierController.updateCarrier,
);

export default router;
