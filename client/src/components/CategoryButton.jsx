import PropTypes from "prop-types";

const CategoryButton = ({ category, sm, xs }) => {
	return (
		<button
			className={`shrink-0 bg-lightGray text-gray-300 py-1.5 px-4 rounded-full hover:text-accentOrange 
      ${sm ? "text-sm" : ""} ${xs ? "text-xs" : ""}`}
		>
			{category}
		</button>
	);
};

// PropTypes
CategoryButton.propTypes = {
	category: PropTypes.string.isRequired,
	sm: PropTypes.bool,
	xs: PropTypes.bool,
};

export default CategoryButton;
