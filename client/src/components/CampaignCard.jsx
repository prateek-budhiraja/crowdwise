import PropTypes from "prop-types";
import formatMoneyINR from "../utils/formatMoneyINR";
import CategoryButton from "./CategoryButton";

const CampaignCard = ({ campaign }) => {
	const raised = campaign?.donators.reduce(
		(acc, donation) => acc + donation.amount_donated,
		0
	);
	const goalPercentage = (raised / campaign?.goal) * 100;

	return (
		<div className="rounded-lg border-2 border-gray-300 w-[400px] md:w-[100%] max-w-[500px] hover:scale-105 ease-in duration-200">
			<img
				className="h-[220px] rounded-lg w-full object-cover"
				src={campaign?.banner || `/categoryImages/${campaign?.category}.jpg`}
				alt="campaign banner"
			/>
			<div className="px-2 my-2">
				<div className="flex justify-end">
					<CategoryButton xs category={campaign?.category} />
				</div>
				<h3 className="truncate text-lg font-medium text-gray-300 mt-2 leading-none">
					{campaign?.title}
				</h3>
				<h4 className="text-gray-600 mt-1 text-xs">
					By {campaign?.created_by_name}
				</h4>
				<div className="w-full bg-lightGray rounded-full h-2 mt-2">
					<div
						className="bg-accentOrange h-2 rounded-full"
						style={{
							width: `${goalPercentage}%`,
							maxWidth: "100%",
						}}
					></div>
				</div>
				<h4 className="text-gray-300 mt-1.5">
					{formatMoneyINR(raised)} raised of {formatMoneyINR(campaign?.goal)}
				</h4>
			</div>
		</div>
	);
};

// PropTypes
CampaignCard.propTypes = {
	campaign: PropTypes.shape({
		banner: PropTypes.string,
		category: PropTypes.string.isRequired,
		created_by_name: PropTypes.string.isRequired,
		goal: PropTypes.number.isRequired,
		createdAt: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		donators: PropTypes.array,
		raised: PropTypes.number,
		slug: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		_id: PropTypes.string.isRequired,
	}),
};

export default CampaignCard;
