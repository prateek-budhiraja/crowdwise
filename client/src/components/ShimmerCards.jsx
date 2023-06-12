import PropTypes from "prop-types";
import ShimmerCard from "./ShimmerCard";

const ShimmerCards = ({ count }) => {
	return (
		<>
			{[...Array(count)].map((_, index) => (
				<ShimmerCard key={index} />
			))}
		</>
	);
};

ShimmerCards.propTypes = {
	count: PropTypes.number.isRequired,
};

export default ShimmerCards;
