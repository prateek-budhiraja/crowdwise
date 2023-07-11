import { Router } from "express";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js";
import {
	createAdmin,
	createPowerUser,
} from "../controllers/auth.controller.js";
import {
	rejectCampaign,
	setInactive,
	verifyCampaign,
} from "../controllers/campaign.controller.js";

const router = Router();

router.put("/create-power-user", isLoggedIn, isAdmin, createPowerUser);
router.put("/create-admin", isLoggedIn, isAdmin, createAdmin);
router.put("/campaigns/:slug/verify", isLoggedIn, isAdmin, verifyCampaign);
router.delete("/campaigns/:slug/reject", isLoggedIn, isAdmin, rejectCampaign);
router.put("/campaigns/:slug/inactive", isLoggedIn, isAdmin, setInactive);

export default router;
