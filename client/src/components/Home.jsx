import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import Nav from "./Nav";
import CampaignCard from "./CampaignCard";
import CategoryButton from "./CategoryButton";
import { CampaignContext } from "../context/CampaignContext";
import { categories } from "../utils/categories";
import ShimmerCards from "./ShimmerCards";

const Home = () => {
	const { setCampaigns } = useContext(CampaignContext);
	const [filteredCampaigns, setFilteredCampaigns] = useState([]); // [1]

	useEffect(() => {
		fetchCampaigns();
	}, []);

	const fetchCampaigns = async () => {
		try {
			const { data } = await axios.get("/api/campaigns");

			if (data?.success) {
				setCampaigns(data?.data);
				const filteredCampaigns = data?.data?.slice(0, 8);
				setFilteredCampaigns(filteredCampaigns);
			} else {
				toast.error("Failed to load campaigns!");
			}
		} catch (error) {
			toast.error("Failed to load campaigns!", {
				duration: 10000,
			});
		}
	};

	return (
		<>
			<Nav />
			<div className="py-5 lg:py-10 px-4 bg-[url('/assets/world.svg')] text-center bg-no-repeat bg-cover bg-center">
				<h1 className="text-2xl lg:text-4xl font-bold text-gray-300">
					Raise funds for medical emergencies and social causes
				</h1>
				<Link to="/start-a-campaign">
					<button className="mt-5 lg:mt-10 lg:text-xl py-2 px-4 lg:px-6 rounded-full bg-lightGray font-medium text-accentOrange hover:bg-accentOrange hover:text-lightGray">
						Create a Campaign 🚀
					</button>
				</Link>
			</div>
			<div className="mt-5 py-2 px-8 flex flex-row lg:justify-center overflow-x-scroll scrollbar-hide gap-2">
				{Object.keys(categories)?.map((key) => (
					<Link className="shrink-0" to={`/c/${key}`} key={key}>
						<CategoryButton category={categories[key]} />
					</Link>
				))}
			</div>
			<div>
				<h1 className="underline text-xl lg:text-3xl font-semibold text-center px-5 mt-8 text-accentOrange">
					Active Campaigns
				</h1>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ld:gap-8 justify-items-center md:justify-items-stretch px-6 md:px-10 my-8">
					{filteredCampaigns.length === 0 ? (
						<ShimmerCards count={6} />
					) : (
						filteredCampaigns.map((campaign) => (
							<Link to={`/browse/${campaign?.slug}`} key={campaign?.slug}>
								<CampaignCard campaign={campaign} />
							</Link>
						))
					)}
				</div>
				<Link to="/browse">
					<h4 className="text-gray-300 mb-10 lg:text-xl hover:text-accentOrange text-center">
						Browse More
					</h4>
				</Link>
			</div>
		</>
	);
};

export default Home;
