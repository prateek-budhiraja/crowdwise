import { Router } from "express";
import { isLoggedIn, isAdmin } from "../middlewares/auth.middleware.js";
import {
	createAdmin,
	createPowerUser,
	getAllUsers,
} from "../controllers/auth.controller.js";
import {
	rejectCampaign,
	setActive,
	setInactive,
	verifyCampaign,
} from "../controllers/campaign.controller.js";

const router = Router();

router.put("/create-power-user", isLoggedIn, isAdmin, createPowerUser);
router.put("/create-admin", isLoggedIn, isAdmin, createAdmin);
router.put("/campaigns/:slug/verify", isLoggedIn, isAdmin, verifyCampaign);
router.delete("/campaigns/:slug/reject", isLoggedIn, isAdmin, rejectCampaign);
router.put("/campaigns/:slug/inactive", isLoggedIn, isAdmin, setInactive);
router.put("/campaigns/:slug/active", isLoggedIn, isAdmin, setActive);
router.get("/get-all-users", isLoggedIn, isAdmin, getAllUsers);

export default router;
