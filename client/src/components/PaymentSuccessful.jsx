import { Link, useSearchParams } from "react-router-dom";
import Nav from "./Nav";

const PaymentSuccessful = () => {
	const [searchParams] = useSearchParams();

	return (
		<>
			<Nav />
			<div className="h-[80vh] flex justify-center items-center">
				<div className="p-4 text-center text-gray-300">
					<h1 className="text-2xl md:text-4xl mb-10 font-semibold">
						Thankyou for you generous donation!
					</h1>
					<h3 className="text-xl md:text-2xl">
						Here's your reference ID:{" "}
						<span className="text-accentOrange">
							{searchParams.get("reference")}
						</span>
					</h3>
					<Link to="/">
						<button className="w-full mt-5 py-2 text-lg bg-accentOrange rounded-full text-gray-300 font-medium">
							HOME
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};

export default PaymentSuccessful;
