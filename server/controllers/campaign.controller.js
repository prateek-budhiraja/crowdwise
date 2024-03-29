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

	campaigns.forEach((campaign) => {
		campaign.donators = campaign.donators.filter(
			(donation) => donation.verified
		);
	});

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

	campaign.donators = campaign.donators.filter((donation) => donation.verified);

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
		created_by_name: req.user.name,
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

	campaign.donators.push({
		donator_name: req.user.name,
		donator_email: req.user.email,
		amount_donated: amount,
		verified: false,
		order_id: order.id,
	});

	const updated = await campaign.save();

	if (!updated) {
		throw new Error("Campaign could not be updated");
	}

	return res.status(200).json({
		success: true,
		data: order,
		RAZORPAY_KEY_ID: config.RAZORPAY_KEY_ID,
		user: req.user,
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

	const campaign = await Campaign.findOne({ slug });
	if (!campaign) {
		throw new Error("No campaign found");
	}

	let amount_donated = 0;
	campaign?.donators.forEach((donation) => {
		if (donation.order_id === razorpay_order_id) {
			amount_donated = donation.amount_donated;
			campaign.raised += amount_donated;
			donation.verified = true;
			donation.payment_id = razorpay_payment_id;
		}
	});
	await campaign.save();

	if (req?.user?.email !== "anonymous@crowdwise.com") {
		console.log("setting user donations", req.user);
		req?.user?.donations.push({
			campaign_name: campaign.title,
			campaign_slug: campaign.slug,
			amount_donated: amount_donated,
			payment_id: razorpay_payment_id,
		});

		const updatedUser = await req.user.save();
		if (!updatedUser) {
			throw new Error("Payment could not be updated");
		}
	}

	res.redirect(
		`${config.CLIENT_URL}/paymentsuccess?reference=${razorpay_payment_id}`
	);
});

/**************************************************
 * @VERIFY_CAMPAIGN
 * @REQUEST_TYPE PUT
 * @route http://localhost:<PORT>/api/admin/campaigns/:slug/verify
 * @description Verify campaign
 * @parameters
 * @returns
 * ***************************************************/
export const verifyCampaign = asyncHandler(async (req, res) => {
	const { slug } = req.params;

	const campaign = await Campaign.findOne({ slug });
	if (!campaign) {
		throw new Error("No campaign found");
	}

	campaign.verified = true;
	await campaign.save();

	res.status(200).json({
		success: true,
		data: campaign,
	});
});

/**************************************************
 * @REJECT_CAMPAIGN
 * @REQUEST_TYPE DELETE
 * @route http://localhost:<PORT>/api/admin/campaigns/:slug/reject
 * @description Reject campaign
 * @returns message
 * ***************************************************/
export const rejectCampaign = asyncHandler(async (req, res) => {
	const { slug } = req.params;
	const { message } = req.body;

	const campaign = await Campaign.findOne({ slug });
	if (!campaign) {
		throw new Error("No campaign found");
	}

	await campaign.remove();

	res.status(200).json({
		success: true,
		message: message,
	});
});

/**************************************************
 * @SET_INACTIVE
 * @REQUEST_TYPE PUT
 * @route http://localhost:<PORT>/api/admin/campaigns/:slug/inactive
 * @description Set campaign inactive
 * @returns
 * ***************************************************/
export const setInactive = asyncHandler(async (req, res) => {
	const { slug } = req.params;

	const campaign = await Campaign.findOne({ slug });
	if (!campaign) {
		throw new Error("No campaign found");
	}

	campaign.open = false;
	await campaign.save();

	res.status(200).json({
		success: true,
		message: "Campaign is inactive now",
	});
});

/**************************************************
 * @SET_ACTIVE
 * @REQUEST_TYPE PUT
 * @route http://localhost:<PORT>/api/admin/campaigns/:slug/active
 * @description Set campaign active
 * @returns
 * ***************************************************/
export const setActive = asyncHandler(async (req, res) => {
	const { slug } = req.params;
	const campaign = await Campaign.findOne({ slug });
	if (!campaign) {
		throw new Error("No campaign found");
	}

	campaign.open = true;
	await campaign.save();

	res.status(200).json({
		success: true,
		message: "Campaign is active now",
	});
});
