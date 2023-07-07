import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Profile = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const [totalAmountDonated, setTotalAmountDonated] = useState(0);
	useEffect(() => {
		console.log(user);
		console.log(!user || user.email === "anonymous@crowdwise.com");
		if (!user || user.email === "anonymous@crowdwise.com") {
			toast.error("Please login with Google account to view your profile");
			navigate("/login");
		} else {
			console.log("in else");
			let total = 0;
			user.donations.forEach((donation) => {
				total += donation.amount_donated;
			});
			setTotalAmountDonated(total);
		}
	}, []);

	console.log("outside", user);

	return (
		<>
			<Nav />
			<div className="text-gray-300 p-4 lg:px-[40px]">
				<img
					src={user?.profile_picture || "/assets/profile.jpg"}
					alt="profile"
					className="h-[80px] w-[80px] lg:h-[100px] lg:w-[100px] rounded-full mt-8 mx-auto"
				/>
				<h1 className="text-center mt-4 text-lg font-bold">{user?.name}</h1>
				<div>
					<h2 className="mt-6 text-xl lg:text-3xl font-medium text-accentOrange underline">
						Donations
					</h2>
					<ul>
						{user?.donations?.map((donation) => (
							<li key={donation._id} className="mt-1 lg:mt-2">
								<div className="flex justify-between lg:text-lg lg:font-medium gap-[40px]">
									<Link to={`/browse/${donation?.campaign_slug}`}>
										<h3>{donation?.campaign_name}</h3>
									</Link>
									<h3>₹{donation?.amount_donated}</h3>
								</div>
							</li>
						))}
					</ul>
					<hr className="mt-2" />
					{/* total amount donated */}
					<div className="flex justify-between lg:text-lg lg:font-medium gap-[40px] text-accentOrange mt-2">
						<h3>Total Amount Donated</h3>
						<h3>₹{totalAmountDonated}</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
