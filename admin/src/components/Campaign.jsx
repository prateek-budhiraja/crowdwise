import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Campaign = () => {
	const [campaigns, setCampaigns] = useState([]);

	const fetchCampaigns = async () => {
		try {
			const { data } = await axios.get("/api/campaigns");
			if (data?.success) setCampaigns(data.data);
			else throw new Error("Error fetching campaigns");
			console.log(data);
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchCampaigns();
	}, []);

	const approve = async (slug) => {
		try {
			const { data } = await axios.put(`/api/admin/campaigns/${slug}/verify`);
			console.log(data);
			if (data?.success) toast.success("Campaign approved");
			else throw new Error("Unable to approve campaign");
			fetchCampaigns();
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const reject = async (slug) => {
		try {
			const { data } = await axios.delete(
				`/api/admin/campaigns/${slug}/reject`
			);
			if (data?.success) toast.success(data?.message);
			else throw new Error(data?.message);
			fetchCampaigns();
		} catch (error) {
			toast.error(error.message);
		}
	};

	const inactive = async (slug) => {
		try {
			const { data } = await axios.put(`/api/admin/campaigns/${slug}/inactive`);
			if (data?.success) toast.success(data?.message);
			else throw new Error(data?.message);
			fetchCampaigns();
		} catch (error) {
			toast.error(error.message);
		}
	};

	const active = async (slug) => {
		try {
			const { data } = await axios.put(`/api/admin/campaigns/${slug}/active`);
			if (data?.success) toast.success(data?.message);
			else throw new Error(data?.message);
			fetchCampaigns();
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<div>
			<h1 className="my-4 text-3xl font-semibold text-center">Campaign</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ld:gap-8 justify-items-center md:justify-items-stretch px-6 md:px-10 my-8">
				{campaigns.map((campaign) => (
					<div key={campaign._id}>
						<div className="bg-white rounded-lg shadow-lg overflow-hidden h-[600px] lg:h-[550px]">
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
									{!campaign?.verified ? (
										<>
											<button
												onClick={() => approve(campaign?.slug)}
												className="bg-gray-600 px-1 rounded"
											>
												Approve
											</button>
											<button
												onClick={() => reject(campaign?.slug)}
												className="bg-gray-600 px-1 rounded"
											>
												Reject
											</button>
										</>
									) : (
										""
									)}
									{campaign?.open ? (
										<button
											onClick={() => inactive(campaign?.slug)}
											className="bg-gray-600 px-1 rounded"
										>
											Inactive
										</button>
									) : (
										<button
											onClick={() => active(campaign?.slug)}
											className="bg-gray-600 px-1 rounded"
										>
											Active
										</button>
									)}
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
