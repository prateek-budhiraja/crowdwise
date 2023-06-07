import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/index.js";
import dbConnect from "./config/dbConnect.js";
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
		origin: config.CLIENT_URL,
		credentials: true,
	})
);

app.use("/api", homeRouter);
app.use("/api/auth", authRouter);
app.use("/api/campaigns", campaignRouter);

export default app;
