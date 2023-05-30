import dotenv from "dotenv";
dotenv.config();

const config = {
	PORT: process.env.PORT,
	MONGO_URI: process.env.MONGO_URI,

	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRY: process.env.JWT_EXPIRY,

	RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID,
	RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET,
};

export default config;
