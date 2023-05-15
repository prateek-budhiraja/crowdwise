import Nav from "./Nav";

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
		</>
	);
}

export default Home;
