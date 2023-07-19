import { useState, useContext } from "react";
import { toast } from "react-hot-toast";
import { UserContext } from "../context/UserContext";
import Nav from "./Nav";
import User from "./User";
import Campaign from "./Campaign";
import Login from "./Login";

const Dashboard = () => {
	const [context, setContext] = useState("USER");
	const { user } = useContext(UserContext);

	if (!user) {
		toast.error("You are not logged in!");
		return <Login />;
	}

	return (
		<>
			<Nav setContext={setContext} context={context} />
			{context === "USER" ? <User /> : <Campaign />}
		</>
	);
};

export default Dashboard;
