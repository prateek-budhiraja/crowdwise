import PropTypes from "prop-types";
import CategoryButton from "./CategoryButton";
import formatMoneyINR from "../utils/formatMoneyINR";

const CampaignCard = ({ campaign }) => {
	const goalPercentage = (campaign?.raised / campaign?.goal) * 100;

	return (
		<div className="rounded-lg border-2 border-gray-300 max-w-[500px] hover:scale-105 ease-in duration-200">
			<img
				className="max-h-[180px] w-full object-cover"
				src={campaign?.banner || `/categoryImages/${campaign?.category}.jpg`}
				alt="campaign banner"
			/>
			<div className="px-2 my-2">
				<div className="flex justify-end">
					<CategoryButton xs category={campaign?.category} />
				</div>
				<h3 className="text-lg font-medium text-gray-300 mt-2 leading-none">
					{campaign?.title}
				</h3>
				<h4 className="text-gray-600 mt-1 text-xs">
					By {campaign?.created_by_name}
				</h4>
				<div className="w-full bg-lightGray rounded-full h-2 mt-2">
					<div
						className="bg-accentOrange h-2 rounded-full"
						style={{ width: `${goalPercentage}%` }}
					></div>
				</div>
				<h4 className="text-gray-300 mt-1.5">
					{formatMoneyINR(campaign?.raised)} raised
				</h4>
			</div>
		</div>
	);
};

// PropTypes
CampaignCard.propTypes = {
	campaign: PropTypes.shape({
		banner: PropTypes.string,
		category: PropTypes.string,
		created_by_name: PropTypes.string,
		goal: PropTypes.number,
		createdAt: PropTypes.string,
		description: PropTypes.string,
		donators: PropTypes.array,
		raised: PropTypes.number,
		slug: PropTypes.string,
		title: PropTypes.string,
		_id: PropTypes.string,
	}),
};

export default CampaignCard;
