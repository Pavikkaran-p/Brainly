import { Router } from "express";
import { googleAuthController, signinController, signupController } from "../controllers/auth.controller.js";

const router = Router();

router.post("/google", googleAuthController);
router.post("/signup", signupController);
router.post("/signin", signinController);
export default router;