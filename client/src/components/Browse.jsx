import { useContext } from "react";
import { Link } from "react-router-dom";
import { CampaignContext } from "../context/CampaignContext";
import CampaignCard from "./CampaignCard";
import Nav from "./Nav";
import ShimmerCards from "./ShimmerCards";

const Browse = () => {
	const { campaigns } = useContext(CampaignContext);

	return (
		<>
			<Nav />
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ld:gap-8 justify-items-center md:justify-items-stretch px-6 md:px-10 my-8">
				{campaigns.length === 0 ? (
					<ShimmerCards count={8} />
				) : (
					campaigns.map((campaign) => (
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