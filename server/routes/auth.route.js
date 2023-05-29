import { Router } from "express";
import {
	loginAnonymous,
	loginWithGoogle,
	logout,
	createPowerUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login-anonymous", loginAnonymous);
router.post("/login-google", loginWithGoogle);
router.get("/logout", logout);
router.put("/update-role", createPowerUser);

export default router;
