import config from "./index.js";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);
const dbConnect = () => {
	mongoose
		.connect(config.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((conn) => console.log(`Connected to DB: ${conn.connection.host}`))
		.catch((err) => {
			console.log(`Connection to DB failed: ${err.message}`);
			process.exit(1);
		});
};

export default dbConnect;
