import { Link } from "react-router-dom";
import { categories } from "../utils/categories";
import CampaignCard from "./CampaignCard";
import CategoryButton from "./CategoryButton";
import Nav from "./Nav";

const campaigns = [
	{
		slug: "austin_heart_transplant",
		banner:
			"https://img.freepik.com/free-photo/senior-woman-with-walking-frame-hospital-waiting-room-rehabilitation-treatment_482257-8586.jpg?w=740&t=st=1684258449~exp=1684259049~hmac=25d3d1f7bd41d161f076ed046daef70555bcc5fb7612574ed8317759cf2f206b",
		name: "Austin’s Life-Saving Heart Transplant Fund",
		location: "LOS ANGELES, CA",
		created_by: "Austin",
		goal: 100000,
		raised: 80000,
		category: "Medical",
	},
	{
		slug: "austin_heart_transplant_2",
		banner:
			"https://img.freepik.com/free-photo/senior-woman-with-walking-frame-hospital-waiting-room-rehabilitation-treatment_482257-8586.jpg?w=740&t=st=1684258449~exp=1684259049~hmac=25d3d1f7bd41d161f076ed046daef70555bcc5fb7612574ed8317759cf2f206b",
		name: "Austin’s Life-Saving Heart Transplant Fund",
		location: "LOS ANGELES, CA",
		created_by: "Austin",
		goal: 100000,
		raised: 80000,
		category: "Medical",
	},
	{
		slug: "austin_heart",
		banner:
			"https://img.freepik.com/free-photo/senior-woman-with-walking-frame-hospital-waiting-room-rehabilitation-treatment_482257-8586.jpg?w=740&t=st=1684258449~exp=1684259049~hmac=25d3d1f7bd41d161f076ed046daef70555bcc5fb7612574ed8317759cf2f206b",
		name: "Austin’s Life-Saving Heart Transplant Fund",
		location: "LOS ANGELES, CA",
		created_by: "Austin",
		goal: 100000,
		raised: 80000,
		category: "Medical",
	},
	{
		slug: "austin_heart_transplant_save",
		banner:
			"https://img.freepik.com/free-photo/senior-woman-with-walking-frame-hospital-waiting-room-rehabilitation-treatment_482257-8586.jpg?w=740&t=st=1684258449~exp=1684259049~hmac=25d3d1f7bd41d161f076ed046daef70555bcc5fb7612574ed8317759cf2f206b",
		name: "Austin’s Life-Saving Heart Transplant Fund",
		location: "LOS ANGELES, CA",
		created_by: "Austin",
		goal: 100000,
		raised: 80000,
		category: "Medical",
	},
	{
		slug: "austin_heart_transplant_life",
		banner:
			"https://img.freepik.com/free-photo/senior-woman-with-walking-frame-hospital-waiting-room-rehabilitation-treatment_482257-8586.jpg?w=740&t=st=1684258449~exp=1684259049~hmac=25d3d1f7bd41d161f076ed046daef70555bcc5fb7612574ed8317759cf2f206b",
		name: "Austin’s Life-Saving Heart Transplant Fund",
		location: "LOS ANGELES, CA",
		created_by: "Austin",
		goal: 100000,
		raised: 80000,
		category: "Medical",
	},
];

function Home() {
	return (
		<>
			<Nav />
			<div className="py-5 lg:py-10 px-4 bg-[url('/assets/world.svg')] text-center bg-no-repeat bg-cover bg-center">
				<h1 className="text-2xl lg:text-4xl font-bold text-gray-300">
					Raise funds for medical emergencies and social causes
				</h1>
				<Link to="start-a-campaign">
					<button className="mt-5 lg:mt-10 lg:text-xl py-2 px-4 lg:px-6 rounded-full bg-lightGray font-medium text-accentOrange hover:bg-accentOrange hover:text-lightGray">
						Create a Campaign 🚀
					</button>
				</Link>
			</div>
			<div className="mt-5 py-2 px-8 flex flex-row lg:justify-center overflow-x-scroll scrollbar-hide gap-2">
				{Object.keys(categories).map((key) => (
					<Link className="shrink-0" to={`/c/${key}`} key={key}>
						<CategoryButton category={categories[key]} />
					</Link>
				))}
			</div>
			<div>
				<h1 className="underline text-xl lg:text-3xl font-semibold text-center px-5 mt-8 text-accentOrange">
					Active Campaigns
				</h1>
				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ld:gap-8 justify-items-center md:justify-items-stretch px-6 md:px-10 my-8">
					{campaigns.map((campaign) => (
						<Link to={`/browse/${campaign.slug}`} key={campaign.slug}>
							<CampaignCard campaign={campaign} />
						</Link>
					))}
				</div>
				<Link to="browse">
					<h4 className="text-gray-300 mb-10 lg:text-xl hover:text-accentOrange text-center">
						Browse More
					</h4>
				</Link>
			</div>
		</>
	);
}

export default Home;
