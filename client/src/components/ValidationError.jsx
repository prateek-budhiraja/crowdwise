import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Nav from "./Nav";

const ValidationError = ({
	login,
	message = "Please login with a verified account to get started!",
}) => {
	const navigate = useNavigate();

	return (
		<>
			<Nav />
			<div className="flex justify-center items-center h-[80vh] px-4">
				<div className="text-center">
					<h1 className="text-xl md:text-3xl font-bold text-accentOrange mb-5">
						{message}
					</h1>
					<button
						onClick={() => navigate(login ? "/login" : "/verification")}
						className="py-1.5 px-5 bg-gray-300 font-medium text-accentOrange rounded-full hover:bg-accentOrange hover:text-gray-300"
					>
						{login ? "Login" : "Request Access"}
					</button>
				</div>
			</div>
		</>
	);
};

ValidationError.propTypes = {
	login: PropTypes.bool,
	message: PropTypes.string,
};

export default ValidationError;
