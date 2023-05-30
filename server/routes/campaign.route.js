import { Router } from "express";

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
router.post("/", createCampaign);
router.post("/:slug/donate", donateToCampaign);
router.post("/:slug/donate/verify", verifyPayment);

export default router;
