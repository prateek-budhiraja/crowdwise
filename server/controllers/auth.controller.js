import { nanoid } from "nanoid";
import JWT from "jsonwebtoken";
import User from "../models/user.model.js";
import asyncHandler from "../services/asyncHandler.js";
import authRole from "../utils/authRole.js";
import config from "../config/index.js";
import { options } from "../config/cookieOptions.js";

/**************************************************
 * @LOGIN_GOOGLE
 * @REQUEST_TYPE POST
 * @route http://localhost:<PORT>/api/auth/login-google
 * @description Login a user with google account
 * @parameters google credential
 * @returns User
 **************************************************/
export const loginWithGoogle = asyncHandler(async (req, res) => {
	console.log("login with google");
	const { credential } = req.body;
	if (!credential) {
		throw new Error("No credential provided");
	}

	const gUser = JWT.decode(credential);
	if (!gUser) {
		throw new Error("Invalid credential");
	}

	const { name, email, picture } = gUser;

	let user = await User.findOne({ email });

	let token;

	if (!user) {
		user = await User.create({
			name,
			email,
			profile_picture: picture,
			role: authRole.BASIC,
		});
	}

	token = await user.getJwtToken();

	console.log("logged in", token);

	res.cookie("token", token, options);

	return res.status(201).json({
		success: true,
		user,
	});
});

/**************************************************
 * @LOGIN_ANONYMOUS
 * @REQUEST_TYPE POST
 * @route http://localhost:<PORT>/api/auth/login-anonymous
 * @description Login a user with anonymous account
 * @parameters none
 * @returns User
 **************************************************/
export const loginAnonymous = asyncHandler((_req, res) => {
	const token = JWT.sign(
		{
			_id: nanoid(),
			name: "Anonymous",
			email: "anonymous@crowdwise.com",
			role: authRole.BASIC,
		},
		config.JWT_SECRET,
		{
			expiresIn: config.JWT_EXPIRY,
		}
	);

	res.cookie("token", token, options);

	res.status(201).json({
		success: true,
		user: {
			_id: nanoid(),
			email: "anonymous@crowdwise.com",
			role: authRole.BASIC,
			name: "Anonymous",
		},
	});
});

/**************************************************
 * @LOGOUT
 * @REQUEST_TYPE GET
 * @route http://localhost:<PORT>/api/auth/logout
 * @description Logout a user
 * @parameters none
 * @returns none
 **************************************************/
export const logout = (req, res) => {
	res.cookie("token", null, {
		expires: new Date(Date.now()),
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: "Logged out successfully",
	});
};

/**************************************************
 * @CREATE_POWER_USER
 * @REQUEST_TYPE PUT
 * @route http://localhost:<PORT>/api/auth/update-role
 * @description Update a user's role
 * @parameters role, email
 * @returns User
 **************************************************/
export const createPowerUser = asyncHandler(async (req, res) => {
	const { email } = req.body;

	const user = await User.findOne({ email });
	if (!user) {
		throw new Error("User not found");
	}

	if (!(user?.phone_number || user?.aadhar_number)) {
		throw new Error("User has not completed KYC");
	}

	if (user.role === authRole.POWER) {
		throw new Error("User is already a power user");
	}

	user.role = authRole.POWER;
	await user.save();

	return res.status(200).json({
		success: true,
		message: "User role updated successfully",
		user,
	});
});

/**************************************************
 * @VALIDATE
 * @REQUEST_TYPE POST
 * @route http://localhost:<PORT>/api/auth/validate
 * @description Validate a user's token
 * @parameters none
 * @returns User
 * @middleware isLoggedIn
 **************************************************/
export const validate = asyncHandler(async (req, res) => {
	let token;
	if (
		req.cookies?.token ||
		(req.headers?.authorization &&
			req.headers?.authorization.startsWith("Bearer"))
	) {
		token = req.cookies?.token || req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Session expired. Please login again.",
		});
	}

	try {
		const decodedJwtPayload = await JWT.verify(token, config.JWT_SECRET);
		if (!decodedJwtPayload) {
			throw new Error("Bad session token");
		}

		if (decodedJwtPayload.email === "anonymous@crowdwise.com") {
			console.log("in anonymous");
			return logout(req, res);
		} else {
			let user = await User.findOne({ email: decodedJwtPayload.email });
			let token = await user.getJwtToken();

			res.cookie("token", token, options);

			console.log("logged in", token);

			return res.status(200).json({
				success: true,
				user,
			});
		}
	} catch (err) {
		console.log("193 Bad session token");
		throw new Error("Bad session token");
	}
});
