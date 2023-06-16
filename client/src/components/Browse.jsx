import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { categories } from "../utils/categories";
import { CampaignContext } from "../context/CampaignContext";
import CampaignCard from "./CampaignCard";
import Nav from "./Nav";
import ShimmerCards from "./ShimmerCards";
import CategoryButton from "./CategoryButton";

const Browse = () => {
	const { campaigns, setCampaigns } = useContext(CampaignContext);
	const [filteredText, setFilteredText] = useState("");
	const [filteredCampaigns, setFilteredCampaigns] = useState([]); // [1
	const [sortDate, setSortDate] = useState("newest");
	const [sortAmount, setSortAmount] = useState("mostFunded");

	useEffect(() => {
		window.scrollTo(0, 0);
		if (campaigns.length === 0) {
			fetchCampaigns();
		} else {
			setFilteredCampaigns(campaigns);
		}
	}, []);

	const fetchCampaigns = async () => {
		try {
			const { data } = await axios.get("/api/campaigns");

			if (data?.success) {
				setCampaigns(data?.data);
				setFilteredCampaigns(data?.data);
			} else {
				toast.error("Failed to load campaigns!");
			}
		} catch (error) {
			toast.error("Failed to load campaigns!", {
				duration: 10000,
			});
		}
	};

	const handleSearch = (e) => {
		e.preventDefault();
		const filteredCampaigns = campaigns.filter((campaign) => {
			return campaign.title.toLowerCase().includes(filteredText.toLowerCase());
		});
		setFilteredCampaigns(filteredCampaigns);
	};

	const handleSort = (e) => {
		const sortedCampaigns = [...filteredCampaigns];
		if (e.target.value === "newest") {
			setSortDate("newest");
			sortedCampaigns.sort((a, b) => {
				return new Date(b.createdAt) - new Date(a.createdAt);
			});
		} else if (e.target.value === "oldest") {
			setSortDate("oldest");
			sortedCampaigns.sort((a, b) => {
				return new Date(a.createdAt) - new Date(b.createdAt);
			});
		} else if (e.target.value === "mostFunded") {
			setSortAmount("mostFunded");
			sortedCampaigns.sort((a, b) => {
				return b.donators.length - a.donators.length;
			});
		} else if (e.target.value === "leastFunded") {
			setSortAmount("leastFunded");
			sortedCampaigns.sort((a, b) => {
				return a.donators.length - b.donators.length;
			});
		}
		setFilteredCampaigns(sortedCampaigns);
	};

	return (
		<>
			<Nav />
			<div className="my-5 py-2 px-8 flex flex-row lg:justify-center overflow-x-scroll scrollbar-hide gap-2">
				{Object.keys(categories)?.map((key) => (
					<Link className="shrink-0" to={`/c/${key}`} key={key}>
						<CategoryButton category={categories[key]} />
					</Link>
				))}
			</div>
			<div className="px-10 flex justify-between gap-2 text-sm md:text-base">
				<form className="w-full flex gap-2" onSubmit={handleSearch}>
					<input
						onSubmit={handleSearch}
						value={filteredText}
						onChange={(e) => setFilteredText(e.target.value)}
						autoComplete="off"
						type="text"
						id="search"
						className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full max-w-[450px] p-1.5 md:px-2.5"
						placeholder="Search for a campaign..."
					/>
					<button
						type="submit"
						className="bg-accentOrange rounded-lg text-gray-300 font-medium px-3 py-1.5 md:p-2.5"
					>
						Search
					</button>
				</form>
				<div className="flex gap-2 shrink-0">
					<button
						onClick={() =>
							handleSort({
								target: {
									value: sortDate === "newest" ? "oldest" : "newest",
								},
							})
						}
						className="bg-accentOrange rounded-full text-gray-300 font-medium px-3 py-1.5 md:p-2.5"
					>
						<img
							src="/assets/calendar1.svg"
							className="w-[20px] md:w-[25px]"
							alt=""
						/>
					</button>
					<button
						onClick={() =>
							handleSort({
								target: {
									value:
										sortAmount === "mostFunded" ? "leastFunded" : "mostFunded",
								},
							})
						}
						className="bg-accentOrange rounded-full text-gray-300 font-medium px-3 py-1.5 md:p-2.5"
					>
						<img
							src="/assets/money1.svg"
							className="w-[20px] md:w-[25px]"
							alt=""
						/>
					</button>
				</div>
			</div>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ld:gap-8 justify-items-center md:justify-items-stretch px-6 md:px-10 my-8">
				{campaigns.length === 0 ? (
					<ShimmerCards count={8} />
				) : (
					filteredCampaigns.map((campaign) => (
						<Link key={campaign?.slug} to={`/browse/${campaign?.slug}`}>
							<CampaignCard campaign={campaign} />
						</Link>
					))
				)}
			</div>
		</>
	);
};

export default Browse;
