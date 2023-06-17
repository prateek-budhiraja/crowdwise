import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { categories } from "../utils/categories";
import { toast } from "react-hot-toast";
import Error from "./Error";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import CampaignSuccessful from "./CampaignSuccessful";

const StartACampaign = () => {
	const { user } = useContext(UserContext);
	const [data, setData] = useState({
		title: "Campaign Title",
		description: "Your message...",
		category: "select",
		goal: 0,
		banner: "",
	});
	const [step, setStep] = useState(0);

	const nextPage = () => {
		setStep((prevState) => prevState + 1);
	};

	const prevPage = () => {
		setStep((prevState) => prevState - 1);
	};

	if (!user) {
		toast.error("You need to be logged in to start a campaign!");

		return <LoginMessage />;
	} else if (user?.role !== "POWER") {
		if (user.email === "anonymous@crowdwise.com") {
			toast.error("Guest Users cannot start a campaign!");
			return <LoginMessage />;
		}
		toast.error("You need to verify your email to start a campaign!");
		return <LoginMessage verify />;
	} else {
		switch (step) {
			case 0:
				return <Initial nextPage={nextPage} setData={setData} data={data} />;
			case 1:
				return (
					<GetTextInformation
						nextPage={nextPage}
						prevPage={prevPage}
						data={data}
						setData={setData}
					/>
				);
			case 2:
				return (
					<SetMoreInfo
						data={data}
						prevPage={prevPage}
						setData={setData}
						nextPage={nextPage}
					/>
				);
			case 3:
				return <Submit data={data} />;
			default:
				return <Error />;
		}
	}
};

const Initial = ({ nextPage, setData, data }) => {
	const [campaignCategory, setCampaignCategory] = useState(data?.category);

	const handleNext = (e) => {
		e.preventDefault();
		if (campaignCategory === "select") {
			toast.error("Please select a category!");
			return;
		}

		setData((prevState) => ({ ...prevState, category: campaignCategory }));
		nextPage();
		toast.success("Category selected successfully!");
	};

	return (
		<form className="max-w-[400px] mx-auto mt-20">
			<h1 className="text-3xl font-bold text-accentOrange mb-5">
				Select a Campaign category
			</h1>
			<select
				id="select"
				value={campaignCategory}
				defaultChecked={campaignCategory}
				onChange={(e) => setCampaignCategory(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5"
			>
				<option value="select">Choose a category</option>
				{Object.keys(categories).map((category) => (
					<option key={category} value={category}>
						{categories[category]}
					</option>
				))}
			</select>
			<button
				onClick={handleNext}
				className="w-full mt-5 py-2 text-lg bg-accentOrange rounded-full text-gray-300 font-medium"
			>
				Next
			</button>
		</form>
	);
};

const GetTextInformation = ({ nextPage, prevPage, setData, data }) => {
	const [title, setTitle] = useState(data?.title);
	const [description, setDescription] = useState(data?.description);

	const handleNext = (e) => {
		e.preventDefault();

		if (title === "" || description === "" || title === "Campaign Title") {
			toast.error("Please fill in all the fields!");
			return;
		}

		if (description.length < 150) {
			toast.error("Description should be at least 150 characters long!");
			return;
		}

		setData((prevState) => ({ ...prevState, title, description }));
		nextPage();
		toast.success("Information saved successfully!");
	};

	return (
		<form className="max-w-[400px] mx-auto mt-20">
			<h1 className="text-3xl font-bold text-accentOrange mb-5">
				Fill in the below information
			</h1>
			<label
				className="font-medium block mb-1 text-lg text-gray-300 mt-5"
				htmlFor="title"
			>
				Campaign Title
			</label>
			<input
				type="text"
				id="title"
				value={title === "Campaign Title" ? "" : title}
				onChange={(e) => setTitle(e.target.value)}
				className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
				placeholder={title}
				required
			/>
			<label
				htmlFor="message"
				className="font-medium block mb-1 text-lg text-gray-300 mt-5"
			>
				Description of your campaign
			</label>
			<textarea
				id="message"
				rows="10"
				value={description === "Your message..." ? "" : description}
				onChange={(e) => setDescription(e.target.value)}
				className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
				required
				placeholder={description}
			></textarea>
			<div className="flex mt-5 gap-2">
				<button
					onClick={prevPage}
					className="w-1/2 py-2 text-lg bg-accentOrange rounded-full text-gray-300 font-medium"
				>
					Prev
				</button>
				<button
					onClick={handleNext}
					className="w-1/2 py-2 text-lg bg-accentOrange rounded-full text-gray-300 font-medium"
				>
					Next
				</button>
			</div>
		</form>
	);
};

const SetMoreInfo = ({ nextPage, prevPage, setData, data }) => {
	const [goal, setGoal] = useState(data?.goal);
	const [banner, setBanner] = useState(data?.banner);

	const handlePrev = (e) => {
		e.preventDefault();
		if (goal <= 0) setData((prevState) => ({ ...prevState, goal, banner }));
		prevPage();
	};

	const handleFinish = (e) => {
		e.preventDefault();

		if (goal <= 0) {
			toast.error("Goal should be greater than 0!");
			return;
		}

		setData((prevState) => ({ ...prevState, goal, banner }));
		nextPage();
	};

	return (
		<form className="max-w-[400px] mx-auto mt-20">
			<h1 className="text-3xl font-bold text-accentOrange mb-5">
				Submit some more Information
			</h1>
			<label
				htmlFor="message"
				className="font-medium block mb-1 text-lg text-gray-300 mt-5"
			>
				Campaign Goal
			</label>
			<input
				type="number"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
				placeholder="Goal"
				value={goal}
				onChange={(e) => setGoal(e.target.value)}
			/>

			<label
				htmlFor="message"
				className="font-medium block mb-1 text-lg text-gray-300 mt-5"
			>
				Campaign Banner URL
			</label>
			<input
				type="text"
				className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5"
				placeholder="https://example.com/image.png"
				value={banner}
				onChange={(e) => setBanner(e.target.value)}
			/>

			<div className="flex mt-5 gap-2">
				<button
					onClick={handlePrev}
					className="w-1/2 py-2 text-lg bg-accentOrange rounded-full text-gray-300 font-medium"
				>
					Prev
				</button>
				<button
					onClick={handleFinish}
					className="w-1/2 py-2 text-lg bg-accentOrange rounded-full text-gray-300 font-medium"
				>
					Finish
				</button>
			</div>
		</form>
	);
};

const Submit = ({ data }) => {
	const [status, setStatus] = useState("PENDING");

	useEffect(() => {
		createCampaign();
	}, []);

	const createCampaign = async () => {
		try {
			const res = await axios.post("/api/campaigns", data);
			console.log(res.data);
			if (res?.data?.success) {
				toast.success("Campaign submitted successfully!");
				setStatus("SUCCESS");
			} else {
				toast.error("Something went wrong!");
				setStatus("FAIL");
			}
		} catch (err) {
			console.log(err?.response?.data?.message);
			toast.error(err?.response?.data?.message || "Something went wrong!", {
				duration: 10000,
			});
			setStatus("FAIL");
		}
	};

	if (status === "FAIL") return <Error />;
	else if (status === "SUCCESS") return <CampaignSuccessful />;
	else
		return (
			<div className="text-center mt-10">
				<div role="status">
					<svg
						aria-hidden="true"
						className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-accentOrange"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span className="sr-only">Loading...</span>
				</div>
			</div>
		);
};

const LoginMessage = ({ verify }) => {
	const navigate = useNavigate();
	return (
		<div className="flex justify-center items-center h-screen">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-accentOrange mb-5">
					{verify
						? "Only Verified users can start a Campaign!"
						: "Only Logged in Users can create a Campaign!"}
				</h1>
				<button
					onClick={() => navigate(verify ? "/email-verification" : "/login")}
					className="py-1.5 px-5 bg-gray-300 font-medium text-accentOrange rounded-full hover:bg-accentOrange hover:text-gray-300"
				>
					{verify ? "Request Verification" : "Login"}
				</button>
			</div>
		</div>
	);
};

// PropTypes
Initial.propTypes = {
	nextPage: PropTypes.func,
	setData: PropTypes.func,
	data: PropTypes.object,
};

GetTextInformation.propTypes = {
	nextPage: PropTypes.func,
	prevPage: PropTypes.func,
	data: PropTypes.object,
	setData: PropTypes.func,
};

SetMoreInfo.propTypes = {
	nextPage: PropTypes.func,
	prevPage: PropTypes.func,
	data: PropTypes.object,
	setData: PropTypes.func,
};

Submit.propTypes = {
	data: PropTypes.object,
};

LoginMessage.propTypes = {
	verify: PropTypes.bool,
};

export default StartACampaign;
