import { Router } from "express";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js";
import { createPowerUser } from "../controllers/auth.controller.js";
import {
	rejectCampaign,
	setInactive,
	verifyCampaign,
} from "../controllers/campaign.controller";

const router = Router();

router.put("/update-role", isLoggedIn, isAdmin, createPowerUser);
router.put("/campaigns/:slug/verify", isLoggedIn, isAdmin, verifyCampaign);
router.delete("/campaigns/:slug/reject", isLoggedIn, isAdmin, rejectCampaign);
router.put("/campaigns/:slug/inactive", isLoggedIn, isAdmin, setInactive);

export default router;
