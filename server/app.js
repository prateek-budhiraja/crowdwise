import express from "express";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import homeRouter from "./routes/home.route.js";
import authRouter from "./routes/auth.route.js";
import campaignRouter from "./routes/campaign.route.js";

dbConnect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
	cors({
		origin: process.env.CLIENT_URL || "http://localhost:3000",
		credentials: true,
	})
);

app.use("/api", homeRouter);
app.use("/api/auth", authRouter);
app.use("/api/campaigns", campaignRouter);

export default app;
