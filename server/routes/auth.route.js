import { Router } from "express";
import {
	loginAnonymous,
	loginWithGoogle,
	logout,
	validate,
} from "../controllers/auth.controller.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login-anonymous", loginAnonymous);
router.post("/login-google", loginWithGoogle);
router.get("/logout", logout);
router.post("/validate", isLoggedIn, validate);

export default router;
