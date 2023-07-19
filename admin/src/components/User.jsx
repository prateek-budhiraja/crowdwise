import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";

const User = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { data } = await axios.get("/api/admin/get-all-users");
				console.log(data);
				if (data.success) setUsers(data.users);
				else throw new Error("Something went wrong");
			} catch (error) {
				toast.error(error.message);
				console.log(error);
			}
		};
		fetchUser();
	}, []);

	const handleUpgrade = async (user, role) => {
		try {
			if (role === "UPGRADE") {
				const { data } = await axios.put("/api/admin/create-power-user", {
					email: user,
				});
				if (data.success) {
					toast.success("User upgraded to power user");
				} else {
					throw new Error(data);
				}
			} else if (role === "ADMIN") {
				const { data } = await axios.put("/api/admin/create-admin", {
					email: user,
				});
				if (data.success) {
					toast.success("User upgraded to power user");
				} else {
					throw new Error(data);
				}
			}
		} catch (error) {
			toast.error(error?.response?.data?.message || error.message);
		}
	};

	return (
		<div className="p-2 mt-5">
			<h1 className="text-xl text-center md:text-left text-orange-400 font-semibold mb-4">
				Manage Users
			</h1>
			{users.map((user) => (
				<div
					key={user._id}
					className="flex md:justify-between items-center p-2 flex-col md:flex-row gap-3"
				>
					<div className="flex items-center gap-3">
						<img
							className="w-10 h-10 rounded-full"
							src={user.profile_picture}
							alt="user-profile"
						/>
						<div>
							<h1 className="text-lg font-semibold">{user.name}</h1>
							<p className="text-sm text-gray-500">{user.email}</p>
						</div>
					</div>
					<div className="flex gap-4">
						<button
							onClick={() => handleUpgrade(user.email, "UPGRADE")}
							className="bg-gray-300 text-black rounded px-2 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={
								!(user.phone_number && user.aadhar_number) ||
								user.role === "POWER"
							}
						>
							UPGRADE
						</button>
						<button
							onClick={() => handleUpgrade(user.email, "ADMIN")}
							className="bg-gray-300 text-black rounded px-2 disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={
								!(user.phone_number && user.aadhar_number) ||
								user.role === "ADMIN"
							}
						>
							MAKE ADMIN
						</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default User;
