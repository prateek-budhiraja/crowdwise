import formatMoneyINR from "../utils/formatMoneyINR";
import CategoryButton from "./CategoryButton";

function CampaignCard({ campaign }) {
	const goalPercentage = (campaign.raised / campaign.goal) * 100;

	return (
		<div className="rounded-lg border-2 border-gray-300 max-w-[500px] hover:scale-105 ease-in duration-200">
			<img
				className="max-h-[180px] w-full object-cover"
				src={campaign.banner}
				alt=""
			/>
			<div className="px-2 my-2">
				<div className="flex justify-between items-center">
					<h4 className="text-gray-600 -mb-1 text-sm">{campaign.location}</h4>
					<CategoryButton xs category={campaign.category} />
				</div>
				<h3 className="text-lg font-medium text-gray-300 mt-2 leading-none">
					{campaign.name}
				</h3>
				<h4 className="text-gray-600 mt-1 text-xs">By {campaign.created_by}</h4>
				<div className="w-full bg-lightGray rounded-full h-2 mt-2">
					<div
						className="bg-accentOrange h-2 rounded-full"
						style={{ width: `${goalPercentage}%` }}
					></div>
				</div>
				<h4 className="text-gray-300 mt-1.5">
					{formatMoneyINR(campaign.raised)} raised
				</h4>
			</div>
		</div>
	);
}

export default CampaignCard;
