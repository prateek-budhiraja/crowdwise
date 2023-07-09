import JWT from "jsonwebtoken";
import asyncHandler from "../services/asyncHandler.js";
import config from "../config/index.js";
import User from "../models/user.model.js";

// check if user is logged in, also sets req.user
export const isLoggedIn = asyncHandler(async (req, _res, next) => {
	let token;
	if (
		req.cookies?.token ||
		(req.headers?.authorization &&
			req.headers?.authorization.startsWith("Bearer"))
	) {
		token = req.cookies?.token || req.headers.authorization.split(" ")[1];
	}

	if (!token) {
		console.log("No token found");
		throw new Error("Not authorized to access this route");
	}

	try {
		const decodedJwtPayload = await JWT.verify(token, config.JWT_SECRET);
		if (!decodedJwtPayload) {
			throw new Error();
		}

		if (decodedJwtPayload.email === "anonymous@crowdwise.com") {
			req.user = {
				_id: decodedJwtPayload._id,
				name: decodedJwtPayload.name,
				email: decodedJwtPayload.email,
				role: decodedJwtPayload.role,
			};
		} else {
			req.user = await User.findById(
				decodedJwtPayload._id,
				"name email role phone_number donations profile_picture"
			);
		}
		next();
	} catch (err) {
		throw new Error("Not authorized to access this route");
	}
});

// check if user is a power user, if they are already logged in!
export const isPowerUser = asyncHandler(async (req, _res, next) => {
	if (!req?.user) {
		throw new Error("Not logged in");
	}

	if (req?.user?.role === "POWER" || req?.user?.role === "ADMIN") {
		next();
	} else {
		throw new Error("Not authorized to access this route");
	}
});

// check if user is an admin, if they are already logged in!
export const isAdmin = asyncHandler(async (req, _res, next) => {
	if (!req?.user) {
		throw new Error("Not logged in");
	}

	if (req?.user?.role === "ADMIN") {
		next();
	} else {
		throw new Error("Not authorized to access this route");
	}
});
