import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Nav from "./Nav";
import ValidationError from "./ValidationError";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const Verification = () => {
	const { user } = useContext(UserContext);
	const [phone, setPhone] = useState(0);
	const [aadhar, setAadhar] = useState(0);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (phone > 9999999999 || phone < 1000000000) {
			return toast.error("Invalid Phone Number");
		} else if (aadhar > 999999999999 || aadhar < 100000000000) {
			return toast.error("Invalid Aadhar Number");
		}

		try {
			const { data } = await axios.put("/api/auth/request-verification", {
				phone_number: phone,
				aadhar_number: aadhar,
			});
			if (data?.success) {
				toast.success("Verification request submitted successfully!");
			}
		} catch (error) {
			console.log(error);
			toast.error(error?.response?.data?.message);
		}
	};

	if (!user || user.email === "anonymous@crowdwise.com") {
		return (
			<ValidationError
				login
				message="You need to login with your Google account to access this page!"
			/>
		);
	} else if (user.role === "POWER") {
		return (
			<>
				<Nav />
				<div className="mx-5 mt-[200px]">
					<h1 className="text-xl text-center px-4 text-accentOrange font-semibold lg:text-3xl">
						You are already verified!
					</h1>
					<Link to="/">
						<button className="mt-5 w-full block shrink-0 py-2 lg:text-lg bg-accentOrange rounded-full text-gray-300 font-medium">
							Home
						</button>
					</Link>
				</div>
			</>
		);
	} else {
		return (
			<>
				<Nav />
				<form className="max-w-[400px] mx-auto mt-20 p-4">
					<h1 className="text-2xl lg:text-3xl font-bold text-accentOrange mb-5">
						Fill in the below information
					</h1>
					<label
						className="font-medium block mb-1 lg:text-lg text-gray-300 mt-5"
						htmlFor="phone"
					>
						Phone Number
					</label>
					<input
						type="number"
						id="phone"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
						placeholder="Enter your phone number"
						required
					/>
					<label
						className="font-medium block mb-1 lg:text-lg text-gray-300 mt-5"
						htmlFor="aadhaar"
					>
						Aadhar Number
					</label>
					<input
						type="number"
						id="aadhaar"
						value={aadhar}
						onChange={(e) => setAadhar(e.target.value)}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
						placeholder="Enter your phone number"
						required
					/>
					<button
						onClick={handleSubmit}
						className="w-full mt-5 py-2 lg:text-lg bg-accentOrange rounded-full text-gray-300 font-medium"
					>
						Submit
					</button>
				</form>
			</>
		);
	}
};

export default Verification;
