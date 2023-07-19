import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Nav = ({ context, setContext }) => {
	const { setUser } = useContext(UserContext);
	const navigate = useNavigate();

	const handleLogout = async () => {
		const res = await axios.get("/api/auth/logout");
		if (res.data.success) {
			setUser(null);
			toast.success("Logged out successfully");
			navigate("/");
		} else {
			toast.error("Something went wrong");
		}
	};

	return (
		<>
			<nav className="flex justify-between py-4 lg:py-6 pr-2 lg:px-10 items-center">
				<Link to="/dashboard">
					<img className="h-[35px] lg:h-[45px]" src="/assets/logo.png" alt="" />
				</Link>
				<ul className="flex gap-2 sm:gap-10">
					<li
						onClick={() => setContext("USER")}
						className={`${
							context === "USER" ? "text-orange-400" : ""
						} hover:text-orange-400 cursor-pointer`}
					>
						USERS
					</li>
					<li
						onClick={() => setContext("CAMPAIGN")}
						className={`${
							context === "CAMPAIGN" ? "text-orange-400" : ""
						} hover:text-orange-400 cursor-pointer`}
					>
						CAMPAIGNS
					</li>
				</ul>
				<button onClick={handleLogout} className="p-1 bg-gray-300 rounded-full">
					<img className="w-6" src="/assets/logout.png" alt="" />
				</button>
			</nav>
		</>
	);
};

export default Nav;
