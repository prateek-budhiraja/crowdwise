import mongoose from "mongoose";
import categories from "../utils/campaignCategories.js";

const campaignSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "Campaign should have a title!"],
			minLength: [5, "Campaign title is too short!"],
		},
		description: {
			type: String,
			required: [true, "Campaign should have a title!"],
			minLength: [20, "Campaign description is too short!"],
		},
		goal: {
			type: Number,
			required: [true, "Goal amount is required!"],
		},
		category: {
			type: String,
			enum: Object.values(categories),
			required: [true, "Campaign category is required!"],
		},
		raised: {
			type: Number,
			default: 0,
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Provide campaign admin!"],
		},
		banner: {
			type: String,
			require: [true, "Provide Campaign banner!"],
		},
		slug: {
			type: String,
			required: [true, "Provide a slug to new campaign!"],
		},
		donators: [
			{
				donator_name: {
					type: String,
				},
				donator_email: {
					type: String,
					required: [true, "Email id is required to create a new account!"],
					validate: {
						validator: function (v) {
							return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
						},
						message: "Please enter a valid email address!",
					},
				},
				amount_donated: {
					type: Number,
					required: [true, "Donated amount is required"],
				},
			},
		],
	},
	{ timestamps: true }
);

export default mongoose.model("Campaign", campaignSchema);
