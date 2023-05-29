import { nanoid } from "nanoid";
import Campaign from "../models/campaign.model.js";
import asyncHandler from "../services/asyncHandler.js";

/**************************************************
 * @GET_CAMPAIGNS
 * @REQUEST_TYPE GET
 * @route http://localhost:<PORT>/api/campaigns
 * @description Get all campaigns
 * @parameters none
 * @returns Campaigns
 **************************************************/
export const getCampaigns = asyncHandler(async (_req, res) => {
	const campaigns = await Campaign.find();
	if (!campaigns) {
		throw new Error("No campaigns found!");
	}

	res.status(200).json({
		success: true,
		data: campaigns,
	});
});

/**************************************************
 * @GET_CAMPAIGN
 * @REQUEST_TYPE GET
 * @route http://localhost:<PORT>/api/campaigns/:slug
 * @description Get a campaign by slug
 * @parameters id
 * @returns Campaign
 ***************************************************/
export const getCampaign = asyncHandler(async (req, res) => {
	const campaign = await Campaign.findOne({ slug: req.params.slug });
	if (!campaign) {
		throw new Error("No campaign found!");
	}

	res.status(200).json({
		success: true,
		data: campaign,
	});
});

/**************************************************
 * @CREATE_CAMPAIGN
 * @REQUEST_TYPE POST
 * @route http://localhost:<PORT>/api/campaigns
 * @description Create a campaign
 * @parameters title, description, goal, category, banner
 * @returns Campaign
 ****************************************************/
export const createCampaign = asyncHandler(async (req, res) => {
	const { title, description, goal, category, banner } = req.body;

	const slug = title.toLowerCase().split(" ").join("-");

	const slugAlreadyExist = await Campaign.findOne({ slug });
	if (slugAlreadyExist) {
		slug = `${slug}-${nanoid(4)}`;
	}

	const campaign = await Campaign.create({
		title,
		description,
		goal,
		category,
		banner,
		slug,
		created_by: req.user._id,
	});

	if (!campaign) {
		throw new Error("Campaign could not be created");
	}

	res.status(201).json({
		success: true,
		data: campaign,
	});
});
