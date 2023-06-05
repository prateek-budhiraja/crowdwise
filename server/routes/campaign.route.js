import { Router } from "express";
import { isLoggedIn, isPowerUser } from "../middlewares/auth.middleware.js";

import {
	createCampaign,
	getCampaign,
	getCampaigns,
	donateToCampaign,
	verifyPayment,
} from "../controllers/campaign.controller.js";

const router = Router();

router.get("/", getCampaigns);
router.get("/:slug", getCampaign);
router.post("/", isLoggedIn, isPowerUser, createCampaign);
router.post("/:slug/donate", isLoggedIn, donateToCampaign);
router.post("/:slug/donate/verify", verifyPayment);

export default router;
