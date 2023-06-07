const ShimmerCampaignPage = () => {
	return (
		<>
			<div className="bg-[#181818] fixed bottom-0 grid grid-cols-3 w-full gap-4 px-4 py-4 border-t-2 border-gray-600 lg:hidden">
				<button
					disabled
					className="col-span-1 rounded-full bg-lightGray py-3 text-lightGray"
				>
					.
				</button>
				<button disabled className="col-span-2 rounded-full bg-lightGray" />
			</div>
			<div className="lg:flex mb-[100px] lg:mb-10 px-2 lg:px-20 gap-10">
				<div className="lg:w-2/3">
					<div className="bg-lightGray w-full h-[300px] lg:h-[450px] rounded" />
					<h2 className="mt-4 text-2xl lg:text-3xl bg-lightGray rounded text-lightGray">
						.
					</h2>
					<div className="w-full bg-lightGray rounded-full h-1.5 lg:h-2 mt-2 lg:hidden">
						<div
							className="bg-accentOrange h-1.5 lg:h-2 rounded-full"
							style={{ width: "80%" }}
						></div>
					</div>
					<h4 className="mt-1.5 text-lg text-lightGray bg-lightGray rounded lg:hidden">
						.
					</h4>
					<hr className="bg-gray-300 rounded-full my-3" />
					<div className="flex items-center gap-2 font-sm">
						<img src="/assets/user.png" alt="user" className="w-5 h-[100%]" />
						<p className="text-lightGray bg-lightGray w-full rounded">.</p>
					</div>
					<hr className="bg-gray-300 rounded-full my-3" />
					<div className="text-lightGray bg-lightGray rounded">
						<h3>.</h3>
					</div>
					<hr className="bg-gray-300 rounded-full my-3" />
					<p className="text-lightGray bg-lightGray rounded h-[150px]">.</p>
					<hr className="bg-gray-300 rounded-full my-3" />
					<div className="text-gray-300 lg:hidden">
						<h2 className="text-gray-300 text-xl font-semibold mb-2">
							Donations
						</h2>
						<ul>
							<li className="text-lightGray bg-lightGray rounded mb-1">.</li>
							<li className="text-lightGray bg-lightGray rounded mb-1">.</li>
							<li className="text-lightGray bg-lightGray rounded mb-1">.</li>
							<li className="text-lightGray bg-lightGray rounded mb-1">.</li>
						</ul>
						<button
							disabled
							className="mt-2 py-2 rounded-full w-full bg-lightGray text-lightGray"
						>
							.
						</button>
					</div>
				</div>
				<div className="hidden lg:block p-4 w-1/3 h-[450px] border-2 rounded-xl border-gray-300">
					<div className="w-full bg-lightGray rounded-full h-1.5 lg:h-2 mt-2">
						<div
							className="bg-accentOrange h-1.5 lg:h-2 rounded-full"
							style={{ width: "80%" }}
						></div>
					</div>
					<h4 className="mt-1.5 text-lg text-lightGray bg-lightGray rounded">
						.
					</h4>

					<div className="flex flex-col gap-2 mt-2">
						<button
							disabled
							className="col-span-1 rounded-full bg-lightGray font-lg py-3 text-lightGray"
						>
							Share
						</button>
						<button
							disabled
							className="col-span-2 rounded-full bg-lightGray font-lg py-3 text-lightGray"
						>
							Donate
						</button>
					</div>

					<h2 className="mt-5 text-gray-300 text-xl font-semibold mb-2">
						Donations
					</h2>
					<ul>
						<li className="text-lightGray bg-lightGray rounded mb-1">.</li>
						<li className="text-lightGray bg-lightGray rounded mb-1">.</li>
						<li className="text-lightGray bg-lightGray rounded mb-1">.</li>
						<li className="text-lightGray bg-lightGray rounded mb-1">.</li>
						<li className="text-lightGray bg-lightGray rounded mb-1">.</li>
					</ul>
					<button
						disabled
						className="mt-2 py-2 rounded-full w-full text-lightGray bg-lightGray"
					>
						See all
					</button>
				</div>
			</div>
		</>
	);
};

export default ShimmerCampaignPage;
