import express from "express";
import homeRouter from "./routes/home.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", homeRouter);

export default app;
