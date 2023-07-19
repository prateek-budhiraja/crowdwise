import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config/index.js";
import dbConnect from "./config/dbConnect.js";
import homeRouter from "./routes/home.route.js";
import authRouter from "./routes/auth.route.js";
import campaignRouter from "./routes/campaign.route.js";
import adminRouter from "./routes/admin.route.js";

dbConnect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedDomains = config.CLIENT_URL.split(",");
app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true);

			if (allowedDomains.indexOf(origin) === -1) {
				var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
				return callback(new Error(msg), false);
			}
			return callback(null, true);
		},
		credentials: true,
	})
);

app.use("/api", homeRouter);
app.use("/api/auth", authRouter);
app.use("/api/campaigns", campaignRouter);
app.use("/api/admin", adminRouter);

export default app;
