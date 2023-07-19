import { useState } from "react";
import Nav from "./Nav";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { toast } from "react-hot-toast";
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
