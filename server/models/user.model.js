import mongoose from "mongoose";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import role from "../utils/authRole.js";

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "Name is required!"],
	},
	email: {
		type: String,
		unique: [true, "Account already exist!"],
		required: [true, "Email id is required to create a new account!"],
		lowercase: true,
		validate: {
			validator: function (v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: "Please enter a valid email address!",
		},
	},
	role: {
		type: String,
		enum: Object.values(role),
		default: role.BASIC,
		required: [true, "User role is required!"],
	},
	profile_picture: {
		type: String,
	},
	phone_number: {
		type: Number,
		unique: [true, "Phone number already linked with another account"],
		minLength: [10, "Phone number must be 10 digits!"],
		maxLength: [10, "Phone number must be 10 digits!"],
	},
	aadhar_number: {
		type: Number,
		unique: [true, "Aadhar Number is already linked with another account!"],
		minLength: [12, "Enter a valid aadhar number!"],
		maxLength: [12, "Enter a valid aadhar number!"],
	},
	donations: [
		{
			campaign_name: {
				type: String,
				required: [true, "Campaign name is reqired"],
			},
			campaign_slug: {
				type: String,
				required: [true, "Campaign slug is required"],
			},
			amount_donated: {
				type: Number,
				required: [true, "Donated amount is required"],
			},
		},
	],
});

userSchema.methods = {
	// generate jwt token
	getJwtToken: async function () {
		return JWT.sign(
			{
				_id: this._id,
				email: this.email,
				role: this.role,
			},
			config.JWT_SECRET,
			{
				expiresIn: config.JWT_EXPIRY,
			}
		);
	},
};

export default mongoose.model("User", userSchema);
