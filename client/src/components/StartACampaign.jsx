import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { categories } from "../utils/categories";
import { toast } from "react-hot-toast";
import Error from "./Error";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function StartACampaign() {
	const { user } = useContext(UserContext);
	const [data, setData] = useState({
		title: "Campaign Title",
		description: "Your message...",
		category: "select",
		goal: 0,
		banner: "",
	});
	const [step, setStep] = useState(0);

	function nextPage() {
		setStep((prevState) => prevState + 1);
	}

	function prevPage() {
		setStep((prevState) => prevState - 1);
	}

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
}

function Initial({ nextPage, setData, data }) {
	const [campaignCategory, setCampaignCategory] = useState(data?.category);

	function handleNext(e) {
		e.preventDefault();
		if (campaignCategory === "select") {
			toast.error("Please select a category!");
			return;
		}

		setData((prevState) => ({ ...prevState, category: campaignCategory }));
		nextPage();
		toast.success("Category selected successfully!");
	}

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
}

function GetTextInformation({ nextPage, prevPage, setData, data }) {
	const [title, setTitle] = useState(data?.title);
	const [description, setDescription] = useState(data?.description);

	function handleNext(e) {
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
	}

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
}

function SetMoreInfo({ nextPage, prevPage, setData, data }) {
	const [goal, setGoal] = useState(data?.goal);
	const [banner, setBanner] = useState(data?.banner);

	function handlePrev(e) {
		e.preventDefault();
		if (goal <= 0) setData((prevState) => ({ ...prevState, goal, banner }));
		prevPage();
	}

	function handleFinish(e) {
		e.preventDefault();

		if (goal <= 0) {
			toast.error("Goal should be greater than 0!");
			return;
		}

		setData((prevState) => ({ ...prevState, goal, banner }));
		nextPage();
	}

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
}

function Submit({ data }) {
	useEffect(() => {
		createCampaign();
	}, []);

	async function createCampaign() {
		const res = await axios.post("/api/campaigns", data);
		console.log(res);
	}

	return <h1>Loading...</h1>;
}

function LoginMessage({ verify }) {
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
}

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
