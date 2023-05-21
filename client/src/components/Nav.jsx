import { useState } from "react";
import { Link } from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";

function Nav() {
	const [isNavOpen, setIsNavOpen] = useState(false);
	const ref = useOnclickOutside(() => {
		setIsNavOpen(false);
	});

	return (
		<nav className="relative bg-bgGray flex justify-between list-none py-4 lg:py-6 px-4 lg:px-10 items-center">
			<Link to="/">
				<img
					src="/assets/logo.png"
					alt="logo"
					className="h-[35px] lg:h-[45px]"
				/>
			</Link>
			<div className="hidden lg:flex flex-fol gap-10 text-gray-300">
				<Link to="start-a-campaign">
					<span className="hover:text-accentOrange">Start a Campaign</span>
				</Link>
				<Link to="browse">
					<span className="hover:text-accentOrange">Browse</span>
				</Link>
			</div>
			<Link to="/login" className="hidden lg:inline-block">
				<button className="py-1.5 px-5 bg-gray-300 font-medium text-accentOrange rounded-full hover:bg-accentOrange hover:text-gray-300">
					Login
				</button>
			</Link>
			<div ref={ref} className="lg:hidden">
				<div
					onClick={() => setIsNavOpen((prevState) => !prevState)}
					className="space-y-1 cursor-pointer"
				>
					<span className="block w-6 h-0.5 bg-gray-400 rounded"></span>
					<span className="block w-6 h-0.5 bg-gray-400 rounded"></span>
					<span className="block w-6 h-0.5 bg-gray-400 rounded"></span>
				</div>
				{isNavOpen ? (
					<>
						<div className="absolute bg-lightGray w-[20px] h-[20px] rotate-45 right-5 -bottom-[2px]"></div>
						<div className="w-[180px] p-4 absolute bg-lightGray flex gap-1 flex-col right-4 -bottom-[100px] text-gray-400">
							<Link to="/start-a-campaign">
								<span>Start a Campaign</span>
							</Link>
							<Link to="/browse">
								<span>Browse</span>
							</Link>
							<Link to="/login">
								<span className="text-accentOrange">Login</span>
							</Link>
						</div>
					</>
				) : (
					""
				)}
			</div>
		</nav>
	);
}

export default Nav;
