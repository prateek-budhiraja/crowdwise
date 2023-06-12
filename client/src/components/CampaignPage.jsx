import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { CampaignContext } from "../context/CampaignContext";
import razorpayGenerateOptions from "../utils/razorpayOptions";
import { categories } from "../utils/categories";
import formatMoneyINR from "../utils/formatMoneyINR";
import Nav from "./Nav";
import ShimmerCampaignPage from "./ShimmerCampaignPage";
import DonateAmount from "./DonateAmount";

const CampaignPage = () => {
	const { campaign_slug } = useParams();
	const { campaigns } = useContext(CampaignContext);
	const [campaignData, setCampaignData] = useState(null);
	const [readMore, setReadMore] = useState(false);
	const [isModal, setIsModal] = useState(false);

	const setAdditionalProperties = (campaign) => {
		const raised = campaign?.donators.reduce(
			(acc, donation) => acc + donation.amount_donated,
			0
		);
		campaign.raised = raised;

		campaign.goalPercentage = (raised / campaign.goal) * 100;

		campaign.campaignAge = Math.ceil(
			(new Date() - new Date(campaign.createdAt)) / (1000 * 60 * 60 * 24)
		);
	};

	useEffect(() => {
		let campaign = campaigns.find(
			(campaign) => campaign.slug === campaign_slug
		);

		if (!campaign) {
			fetchCampaign();
		} else {
			setAdditionalProperties(campaign);
			setCampaignData(campaign);
		}
	}, [campaigns, campaign_slug]);

	const fetchCampaign = async () => {
		try {
			const { data } = await axios.get("/api/campaigns/" + campaign_slug);

			if (data?.success) {
				setAdditionalProperties(data?.data);
				setCampaignData(data?.data);
			} else {
				toast.error("Failed to load campaign!", {
					duration: 10000,
				});
			}
		} catch (error) {
			toast.error("Failed to load campaign!", {
				duration: 10000,
			});
		}
	};

	const handlePayment = async (amount) => {
		let response;
		try {
			response = await axios.post(
				`http://localhost:4000/api/campaigns/${campaign_slug}/donate`,
				{ amount }
			);
		} catch (error) {
			console.log(error);
			return toast.error("Failed to initiate payment!");
		}

		const { data } = response;

		const { RAZORPAY_KEY_ID } = data;
		const { id, amount_due } = data.data;
		const { name, email, phone_number } = data.user;

		var options = razorpayGenerateOptions(
			RAZORPAY_KEY_ID,
			amount_due,
			id,
			name,
			email,
			phone_number,
			campaign_slug
		);
		const razorpay = window.Razorpay(options);

		razorpay.open();
	};

	return (
		<>
			<Nav />
			{isModal ? (
				<DonateAmount setIsModal={setIsModal} handlePayment={handlePayment} />
			) : null}
			{!campaignData ? (
				<ShimmerCampaignPage />
			) : (
				<>
					<div className="bg-[#181818] fixed bottom-0 grid grid-cols-3 w-full gap-4 px-4 py-4 border-t-2 border-gray-600 lg:hidden">
						<button className="col-span-1 rounded-full bg-accentOrange font-lg font-semibold py-3 text-gray-300">
							Share
						</button>
						<button
							onClick={() => setIsModal(true)}
							className="col-span-2 rounded-full bg-accentOrange font-lg font-semibold py-3 text-gray-300"
						>
							Donate
						</button>
					</div>
					<div className="flex mb-[100px] lg:mb-10 px-2 lg:px-20 gap-10">
						<div className="lg:w-2/3">
							<img
								className="w-full h-[300px] lg:h-[450px] object-cover rounded"
								src={
									campaignData?.banner ||
									`/categoryImages/${campaignData?.category}.jpg`
								}
								alt="campaign banner"
							/>
							<h2 className="mt-4 text-2xl lg:text-3xl font-semibold text-gray-300">
								{campaignData.title}
							</h2>
							<div className="w-full bg-lightGray rounded-full h-1.5 lg:h-2 mt-2 lg:hidden">
								<div
									className="bg-accentOrange h-1.5 lg:h-2 rounded-full"
									style={{
										width: `${campaignData?.goalPercentage}%`,
										maxWidth: "100%",
									}}
								></div>
							</div>
							<h4 className="mt-1.5 text-lg text-gray-500 lg:hidden">{`${formatMoneyINR(
								campaignData?.raised
							)} raised of ${formatMoneyINR(campaignData?.goal)} goal`}</h4>
							<hr className="bg-gray-300 rounded-full my-3" />
							<div className="flex items-center gap-2 font-sm text-gray-400">
								<img
									src="/assets/user.png"
									alt="user"
									className="w-5 h-[100%]"
								/>
								<p>
									{campaignData?.created_by_name} is organizing this fundraiser.
								</p>
							</div>
							<hr className="bg-gray-300 rounded-full my-3" />
							<div className="text-gray-300 flex items-center gap-4">
								<h3>{campaignData?.campaignAge} days ago</h3>
								<div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
								<Link to={`/c/${campaignData?.category}`}>
									{categories[campaignData?.category]}
								</Link>
							</div>
							<hr className="bg-gray-300 rounded-full my-3" />
							<span className="text-gray-300">
								{campaignData?.description.slice(0, 350)}
								{campaignData?.description.length < 350 || readMore ? (
									<span>{campaignData.description.slice(350)}</span>
								) : (
									<>
										<span>...</span>
										<span
											onClick={() => setReadMore(true)}
											className="cursor-pointer text-gray-300 mt-2 underline block"
										>
											Read more
										</span>
									</>
								)}
							</span>
							<hr className="bg-gray-300 rounded-full my-3" />
							<div className="text-gray-300 lg:hidden">
								<h2 className="text-gray-300 text-xl font-semibold mb-2">
									Donations
								</h2>
								<ul>
									{campaignData.donators.length
										? campaignData.donators
												.slice(0, 8)
												.map((donator, index) => (
													<li
														key={index}
														className="mb-1 flex gap-6 items-center"
													>
														<div className="text-lg bg-lightGray px-3 py-1 rounded-full">
															{donator.donator_name.slice(0, 1).toUpperCase()}
														</div>
														<div>
															<p>{donator.donator_name}</p>
															<p>{formatMoneyINR(donator.amount_donated)}</p>
														</div>
													</li>
												))
										: "Be the first to donate!"}
								</ul>
								<button className="mt-2 py-2 rounded-full w-full border-2 border-accentOrange hover:bg-accentOrange">
									See all
								</button>
							</div>
						</div>
						<div className="hidden lg:block p-4 w-1/3 h-[100%] border-2 rounded-xl border-gray-300">
							<div className="w-full bg-lightGray rounded-full h-1.5 lg:h-2 mt-2">
								<div
									className="bg-accentOrange h-1.5 lg:h-2 rounded-full"
									style={{
										width: `${campaignData?.goalPercentage}%`,
										maxWidth: "100%",
									}}
								></div>
							</div>
							<h4 className="mt-1.5 text-lg text-gray-500">{`${formatMoneyINR(
								campaignData?.raised
							)} raised of ${formatMoneyINR(campaignData.goal)} goal`}</h4>

							<div className="flex flex-col gap-2 mt-2">
								<button className="col-span-1 rounded-full bg-accentOrange font-lg font-semibold py-3 text-gray-300">
									Share
								</button>
								<button
									onClick={() => setIsModal(true)}
									className="col-span-2 rounded-full bg-accentOrange font-lg font-semibold py-3 text-gray-300"
								>
									Donate
								</button>
							</div>

							<div className="text-gray-300 mt-5">
								<h2 className="text-xl font-semibold mb-2">Donations</h2>
								<ul>
									{campaignData?.donators.length
										? campaignData?.donators?.slice(0, 5).map((donator) => (
												<li
													key={donator?.order_id}
													className="mb-1 flex gap-6 items-center"
												>
													<div className="text-lg bg-lightGray px-3 py-1 rounded-full">
														{donator.donator_name.slice(0, 1).toUpperCase()}
													</div>
													<div>
														<p>{donator.donator_name}</p>
														<p>{formatMoneyINR(donator.amount_donated)}</p>
													</div>
												</li>
										  ))
										: "Be the first to donate!"}
								</ul>
								<button className="mt-2 py-2 rounded-full w-full border-2 border-accentOrange hover:bg-accentOrange">
									See all
								</button>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default CampaignPage;
