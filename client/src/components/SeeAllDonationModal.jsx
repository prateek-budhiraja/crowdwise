// import { useState } from "react";
import PropTypes from "prop-types";

const SeeAllDonationModal = ({ donations, setIsSeeAllDonationModal }) => {
	// const [amount, setAmount] = useState(0);
	console.log(donations);
	return (
		<div
			id="popup-modal"
			tabIndex="-1"
			className="fixed z-50 inset-0 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-blur"
		>
			<div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg">
				<div className="relative bg-white rounded-lg shadow max-h-[80vh] overflow-y-auto">
					<div className="p-6">
						<div className="flex justify-between items-center mb-5">
							<h2 className="text-2xl text-accentOrange">Donations</h2>
							<button
								onClick={() => setIsSeeAllDonationModal(false)}
								className="text-gray-500 bg-white hover:bg-accentOrange rounded-lg border border-gray-200 text-sm font-medium px-3 py-1.5 hover:text-white"
							>
								Close
							</button>
						</div>
						<ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
							{donations.map((donation) => (
								<li key={donation?.payment_id} className="pb-3 sm:pb-4">
									<div className="flex items-center space-x-4">
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-gray-900 truncate dark:text-white">
												{donation?.donator_name}
											</p>
											<p className="text-sm text-gray-500 truncate dark:text-gray-400">
												{donation?.donator_email}
											</p>
										</div>
										<div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
											₹{donation?.amount_donated}
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

// PropTypes
SeeAllDonationModal.propTypes = {
	donations: PropTypes.number.isRequired,
	setIsSeeAllDonationModal: PropTypes.func.isRequired,
};

export default SeeAllDonationModal;
