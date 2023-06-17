import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { CampaignContext } from "../context/CampaignContext";
import CampaignCard from "./CampaignCard";
import Nav from "./Nav";
import ShimmerCards from "./ShimmerCards";
import { categories } from "../utils/categories";

const CategoryPage = () => {
	const { category } = useParams();
	const { campaigns, setCampaigns } = useContext(CampaignContext);
	const [filteredCampaigns, setFilteredCampaigns] = useState([]);

	useEffect(() => {
		window.scrollTo(0, 0);
		if (campaigns.length === 0) {
			fetchCampaigns();
		} else {
			const filter = campaigns.filter((campaign) => {
				return campaign.category.toLowerCase() === category.toLowerCase();
			});
			setFilteredCampaigns(filter);
		}
	}, []);

	const fetchCampaigns = async () => {
		try {
			const { data } = await axios.get("/api/campaigns");

			if (data?.success) {
				setCampaigns(data?.data);
				const campaigns = campaigns.filter((campaign) => {
					return campaign.category.toLowerCase() === category.toLowerCase();
				});
				setFilteredCampaigns(campaigns);
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
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ld:gap-8 justify-items-center md:justify-items-stretch px-6 md:px-10 my-8">
				{campaigns.length === 0 ? (
					<ShimmerCards count={8} />
				) : filteredCampaigns.length === 0 ? (
					<div className="text-gray-300 col-span-3 text-center text-2xl font-semibold">
						No Campaigns found for category{" "}
						<span className="text-accentOrange">{categories[category]}</span>!
					</div>
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

export default CategoryPage;
