import { Router } from "express";

import {
	createCampaign,
	getCampaign,
	getCampaigns,
	// updateCampaign,
	// deleteCampaign,
} from "../controllers/campaign.controller.js";

const router = Router();

router.get("/", getCampaigns);
router.get("/:slug", getCampaign);
router.post("/", createCampaign);
// router.put("/:slug", updateCampaign);
// router.delete("/:slug", deleteCampaign);

export default router;
