import { categories } from "../utils/categories";
import CampaignCard from "./CampaignCard";
import CategoryButton from "./CategoryButton";
import Nav from "./Nav";

const campaign = {
	banner:
		"https://img.freepik.com/free-photo/senior-woman-with-walking-frame-hospital-waiting-room-rehabilitation-treatment_482257-8586.jpg?w=740&t=st=1684258449~exp=1684259049~hmac=25d3d1f7bd41d161f076ed046daef70555bcc5fb7612574ed8317759cf2f206b",
	name: "Austin’s Life-Saving Heart Transplant Fund",
	location: "LOS ANGELES, CA",
	created_by: "Austin",
	goal: 100000,
	raised: 80000,
};

function Home() {
	return (
		<>
			<Nav />
			<div className="py-5 lg:py-10 px-4 bg-[url('/assets/world.svg')] text-center object-contain bg-no-repeat bg-cover bg-center">
				<h1 className="text-2xl lg:text-4xl font-bold text-gray-300">
					Raise funds for medical emergencies and social causes
				</h1>
				<button className="mt-5 lg:mt-10 lg:text-xl py-2 px-4 lg:px-6 rounded-full bg-lightGray font-medium text-accentOrange hover:bg-accentOrange hover:text-lightGray">
					Create a Campaign 🚀
				</button>
			</div>
			<div className="mt-5 py-2 px-8 flex flex-row lg:justify-center overflow-x-scroll scrollbar-hide gap-2">
				{Object.keys(categories).map((key) => (
					<CategoryButton category={categories[key]} key={key} />
				))}
			</div>
			<div>
				<h1 className="underline text-xl font-semibold text-center px-5 mt-8 text-accentOrange">
					Active Campaigns
				</h1>
				<CampaignCard campaign={campaign} />
			</div>
		</>
	);
}

export default Home;
