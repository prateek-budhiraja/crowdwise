import { Link, useParams } from "react-router-dom";
import Nav from "./Nav";
import { useEffect, useState } from "react";
import formatMoneyINR from "../utils/formatMoneyINR";
import { categories } from "../utils/categories";

function CampaignPage() {
	const { campaign_slug } = useParams();
	const [campaignData, setCampaignData] = useState({
		campaign_start_date:
			"Wed May 17 2023 17:23:07 GMT+0530 (India Standard Time)",
		title: "Help Us Get Dimitri DJ Chaos Back Home",
		banner:
			"https://images.gofundme.com/NLl3yTw0Y05KiXdTAyN9rm5M4us=/720x405/https://d2g8igdw686xgo.cloudfront.net/72939459_1684274314904402_r.jpeg",
		raised: 33287,
		goal: 100000,
		category: "medical",
		created_by: "Ronald Antoine",
		description: `Hi,
I am Ashley Antoine. I’m writing this post on behalf of my family. On May 2nd, 2023 a tragedy occurred to my brother Dimitri a/k/a DJ Chaos a/k/a DJ Chaos The Pitbull. Dimitri is a charismatic, upbeat soul with a personality that can light up any room and a music taste that can unite everyone regardless of genre or culture. He was unfortunately in a vehicular accident in Atlanta, Georgia which caused him to have a traumatic brain injury and other severe injuries.

Our world stopped when we learned our brother, nephew, son, and friend to some, was severely injured ONE day before being back home with us in New York City. We are now faced with challenges due to him being in another state as he is not accessible to us because of the long distance. To have him transported to us, would cost a minimum of $30,000. In addition to the medical bills to keep him stable, and rehabilitation services to get him back on track toward recovery.

We are asking for any support and prayers to help get Dimitri back home so that he can be fully supported and cared for. Every small contribution will have a great impact on helping us reach our goal.

This situation shows the fragility of life as anything can happen at any time to anyone. Be sure to hug your family members check on them and be there for them. We would have never fathomed this happening to us.

We appreciate everyone’s support and ask that you continue to pray for Dimitri’s full recovery.

Many thanks,
The Antoine Family

Dimitri's Music Mixes
                    Dimitir's Instagram`,
		donators: [{ Prateek: 10000 }, { Apple: 50000 }, { Anonymous: 1000 }],
	});
	const [readMore, setReadMore] = useState(false);
	const goalPercentage = (campaignData.raised / campaignData.goal) * 100;
	const campaignAge = Math.ceil(
		(new Date() - new Date(campaignData.campaign_start_date)) /
			(1000 * 60 * 60 * 24)
	);
	// function fetchData() {
	// 	setCampaignData();
	// }

	// fetchData();

	return (
		<>
			<Nav />
			<div className="bg-[#181818] fixed bottom-0 grid grid-cols-3 w-full gap-4 px-4 py-4 border-t-2 border-gray-600 lg:hidden">
				<button className="col-span-1 rounded-full bg-accentOrange font-lg font-semibold py-3 text-gray-300">
					Share
				</button>
				<button className="col-span-2 rounded-full bg-accentOrange font-lg font-semibold py-3 text-gray-300">
					Donate
				</button>
			</div>
			<div className="flex mb-[100px] lg:mb-10 px-2 lg:px-20 gap-10">
				<div className="lg:w-2/3">
					<img
						className="w-full h-[300px] lg:h-[450px] object-cover rounded"
						src={campaignData.banner}
						alt="campaign banner"
					/>
					<h2 className="mt-4 text-2xl lg:text-3xl font-semibold text-gray-300">
						{campaignData.title}
					</h2>
					<div className="w-full bg-lightGray rounded-full h-1.5 lg:h-2 mt-2 lg:hidden">
						<div
							className="bg-accentOrange h-1.5 lg:h-2 rounded-full"
							style={{ width: `${goalPercentage}%` }}
						></div>
					</div>
					<h4 className="mt-1.5 text-lg text-gray-500 lg:hidden">{`${formatMoneyINR(
						campaignData.raised
					)} raised of ${formatMoneyINR(campaignData.goal)} goal`}</h4>
					<hr className="bg-gray-300 rounded-full my-3" />
					<div className="flex items-center gap-2 font-sm text-gray-400">
						<img src="/assets/user.png" alt="user" className="w-5 h-[100%]" />
						<p>{campaignData.created_by} is organizing this fundraiser.</p>
					</div>
					<hr className="bg-gray-300 rounded-full my-3" />
					<div className="text-gray-300 flex items-center gap-4">
						<h3>{campaignAge} days ago</h3>
						<div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
						<Link to={`/c/${campaignData.category}`}>
							{categories[campaignData.category]}
						</Link>
					</div>
					<hr className="bg-gray-300 rounded-full my-3" />
					<span className="text-gray-300">
						{campaignData.description.slice(0, 350)}
						{readMore ? (
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
							{campaignData.donators.map((donator, index) => (
								<li key={index} className="mb-1 flex gap-6 items-center">
									<div className="text-lg bg-lightGray px-3 py-1 rounded-full">
										{Object.keys(donator)[0].slice(0, 1)}
									</div>
									<div>
										<p>{Object.keys(donator)[0]}</p>
										<p>{formatMoneyINR(Object.values(donator)[0])}</p>
									</div>
								</li>
							))}
						</ul>
						<button className="mt-2 py-2 rounded-full w-full border-2 border-accentOrange hover:bg-accentOrange">
							See all
						</button>
					</div>
				</div>
				<div className="hidden lg:block p-4 w-1/3 h-[450px] border-2 rounded-xl border-gray-300">
					<div className="w-full bg-lightGray rounded-full h-1.5 lg:h-2 mt-2">
						<div
							className="bg-accentOrange h-1.5 lg:h-2 rounded-full"
							style={{ width: `${goalPercentage}%` }}
						></div>
					</div>
					<h4 className="mt-1.5 text-lg text-gray-500">{`${formatMoneyINR(
						campaignData.raised
					)} raised of ${formatMoneyINR(campaignData.goal)} goal`}</h4>

					<div className="flex flex-col gap-2 mt-2">
						<button className="col-span-1 rounded-full bg-accentOrange font-lg font-semibold py-3 text-gray-300">
							Share
						</button>
						<button className="col-span-2 rounded-full bg-accentOrange font-lg font-semibold py-3 text-gray-300">
							Donate
						</button>
					</div>

					<ul className="mt-8 text-gray-300">
						{campaignData.donators.map((donator, index) => (
							<li key={index} className="mb-1 flex gap-6 items-center">
								<div className="text-lg bg-lightGray px-3 py-1 rounded-full">
									{Object.keys(donator)[0].slice(0, 1)}
								</div>
								<div>
									<p>{Object.keys(donator)[0]}</p>
									<p>{formatMoneyINR(Object.values(donator)[0])}</p>
								</div>
							</li>
						))}
					</ul>
					<button className="mt-2 py-2 rounded-full w-full border-2 text-gray-300 border-accentOrange hover:bg-accentOrange">
						See all
					</button>
				</div>
			</div>
		</>
	);
}

export default CampaignPage;
