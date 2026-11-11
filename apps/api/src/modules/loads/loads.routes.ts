import express, { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { createLoadSchema, loadIdParamSchema } from "./loads.validation.js";
import * as loadController from "./loads.controller.js";
import { auth } from "../../middleware/auth.js";

const router: Router = express.Router();

router.use(auth);

router.get("/", loadController.getLoads);
router.get(
  "/:loadId",
  validate(loadIdParamSchema, "params"),
  loadController.getLoadById,
);
router.post("/", validate(createLoadSchema), loadController.createLoad);
router.patch(
  "/:loadId",
  validate(loadIdParamSchema, "params"),
  loadController.updateLoad,
);

export default router;
