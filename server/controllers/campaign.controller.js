import { nanoid } from "nanoid";
import Razorpay from "razorpay";
import crypto from "crypto";
import Campaign from "../models/campaign.model.js";
import asyncHandler from "../services/asyncHandler.js";
import config from "../config/index.js";

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

	if (!(title && description && goal && category)) {
		throw new Error("Please fill all the fields");
	}

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

/**************************************************
 * @DONATE_TO_CAMPAIGN
 * @REQUEST_TYPE PUT
 * @route http://localhost:<PORT>/api/campaigns/:slug/donate
 * @description Donate to a campaign
 * @parameters amount
 * @returns Campaign
 ***************************************************/
export const donateToCampaign = asyncHandler(async (req, res) => {
	const { amount } = req.body;

	if (!amount) {
		throw new Error("Please enter an amount to donate");
	}

	const campaign = await Campaign.findOne({ slug: req.params.slug });
	if (!campaign) {
		throw new Error("No campaign found!");
	}

	const instance = new Razorpay({
		key_id: config.RAZORPAY_KEY_ID,
		key_secret: config.RAZORPAY_KEY_SECRET,
	});

	const order = await instance.orders.create({
		amount: amount * 100,
		currency: "INR",
	});

	if (!order) {
		throw new Error("Order could not be created");
	}

	campaign.donations.push({
		donator_name: req.user.name,
		donator_email: req.user.email,
		amount_donated: amount,
		verified: false,
		order_id: order.id,
	});

	return res.status(200).json({
		success: true,
		data: order,
		RAZORPAY_KEY_ID: config.RAZORPAY_KEY_ID,
		user: {
			name: "Anonymous",
			email: "anonymous@crowdwise.com",
			phone_number: "9999999999",
		},
	});
});

/**************************************************
 * @VERIFY_PAYMENT
 * @REQUEST_TYPE POST
 * @route http://localhost:<PORT>/api/campaigns/:slug/donate/verify
 * @description Verify payment
 * @parameters
 * @returns
 ***************************************************/
export const verifyPayment = asyncHandler(async (req, res) => {
	const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
		req.body;

	const { slug } = req.params;

	const body = razorpay_order_id + "|" + razorpay_payment_id;

	const expectedSignature = crypto
		.createHmac("sha256", "zPv4l1jW2nInvjbx3z3XRIee")
		.update(body.toString())
		.digest("hex");
	if (razorpay_signature !== expectedSignature) {
		throw new Error("Invalid payment");
	}

	const campaign = Campaign.findOne({ slug });
	if (!campaign) {
		throw new Error("No campaign found");
	}

	let amount_donated = 0;
	campaign.donations.forEach((donation) => {
		if (donation.order_id === razorpay_order_id) {
			amount_donated = donation.amount_donated;
			donation.verified = true;
			donation.payment_id = razorpay_payment_id;
		}
	});
	await campaign.save();

	if (req?.user?.email !== "anonymous@crowdwise.com") {
		req.user.donations.push({
			campaign_name: campaign.title,
			campaign_slug: campaign.slug,
			amount_donated: amount_donated,
			payment_id: razorpay_payment_id,
		});
	}

	return res.status(200).json({
		success: true,
		data: "Payment verified",
	});
});
