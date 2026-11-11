import express, { Router } from "express";
import { validate } from "../../middleware/validate.js";
import { loginSchema, registerSchema } from "./auth.validation.js";
import * as authController from "./auth.controller.js";
import { auth } from "../../middleware/auth.js";

const router: Router = express.Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);

router.get("/me", auth, authController.getMe);

export default router;
