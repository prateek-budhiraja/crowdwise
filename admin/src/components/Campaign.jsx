import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const Campaign = () => {
	const [campaigns, setCampaigns] = useState([]);

	useEffect(() => {
		const fetchCampaigns = async () => {
			try {
				const { data } = await axios.get("/api/campaigns");
				if (data?.success) setCampaigns(data.data);
				else throw new Error("Error fetching campaigns");
			} catch (error) {
				toast.error(error.message);
			}
		};
		fetchCampaigns();
	}, []);

	const approve = () => {
		console.log("Approve");
	};

	const inactive = () => {
		console.log("Inactive");
	};

	return (
		<div>
			<h1>Campaign</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ld:gap-8 justify-items-center md:justify-items-stretch px-6 md:px-10 my-8">
				{campaigns.map((campaign) => (
					<div key={campaign._id}>
						<div className="bg-white rounded-lg shadow-lg overflow-hidden h-[500px]">
							<img
								className="w-full h-56 object-cover object-center"
								src={
									campaign?.banner ||
									"https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png"
								}
								alt={campaign?.title}
							/>
							<div className="p-4">
								<h2 className="text-2xl font-bold text-gray-800">
									{campaign?.title}
								</h2>
								<p className="text-sm font-medium text-gray-500">
									{campaign?.description.substring(0, 400)}
								</p>
								<div className="flex mt-3 gap-2">
									<a
										href={`${import.meta.env.VITE_CLIENT_URL}/browse/${
											campaign?.slug
										}`}
										key={campaign?.slug}
									>
										<button className="bg-gray-600 px-1 rounded">View</button>
									</a>
									<button
										onClick={approve}
										className="bg-gray-600 px-1 rounded"
									>
										Approve
									</button>
									<button
										onClick={inactive}
										className="bg-gray-600 px-1 rounded"
									>
										Inactive
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Campaign;
