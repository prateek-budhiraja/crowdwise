import express from "express";
import dbConnect from "./config/dbConnect.js";
import cookieParser from "cookie-parser";
import homeRouter from "./routes/home.route.js";
import authRouter from "./routes/auth.route.js";

dbConnect();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", homeRouter);
app.use("/api/auth", authRouter);

export default app;
