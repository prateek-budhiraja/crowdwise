import { useState } from "react";
import PropTypes from "prop-types";

const DonateAmount = ({ handlePayment, setIsModal }) => {
	const [amount, setAmount] = useState(0);
	const handleSubmit = () => {
		setIsModal(false);
		handlePayment(amount);
	};

	return (
		<div
			id="popup-modal"
			tabIndex="-1"
			className="fixed z-50 inset-0 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-blur"
		>
			<div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
				<div className="relative bg-white rounded-lg shadow">
					<div className="p-6 text-end">
						<h3 className="mb-5 text-left text-lg font-normal text-gray-500">
							Enter the amount you want to donate?
						</h3>
						<input
							type="number"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg block w-full p-2.5 mb-6"
							placeholder="Amount"
							value={amount}
							onChange={(e) => setAmount(e.target.value)}
						/>
						<button
							onClick={handleSubmit}
							className="text-white bg-accentOrange font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
						>
							Proceed
						</button>
						<button
							onClick={() => setIsModal(false)}
							className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
						>
							No, cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

// PropTypes
DonateAmount.propTypes = {
	handlePayment: PropTypes.func.isRequired,
	setIsModal: PropTypes.func.isRequired,
};

export default DonateAmount;
