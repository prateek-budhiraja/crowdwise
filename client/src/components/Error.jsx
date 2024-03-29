import { Link } from "react-router-dom";
import Nav from "./Nav";

const Error = () => {
	return (
		<>
			<Nav />
			<div className="flex h-[80vh] justify-center items-center">
				<div className="p-4 text-center text-gray-300">
					<h1 className="text-2xl md:text-4xl mb-10 font-semibold">
						Something Went Wrong!
					</h1>
					<h3 className="text-xl md:text-2xl">Please try again later.</h3>
					<Link to="/">
						<button className="w-full max-w-[200px] mt-5 py-2 text-lg bg-accentOrange rounded-full text-gray-300 font-medium">
							HOME
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default Error;
