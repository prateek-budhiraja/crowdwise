function Nav() {
	return (
		<nav className="bg-bgGray flex justify-between list-none py-4 px-4 items-center">
			<a href="#">
				<img src="/assets/logo.png" alt="logo" className="h-[35px]" />
			</a>
			<a
				href="#"
				className="px-5 py-2 bg-lightGray rounded-full font-medium text-accentOrange hover:bg-accentOrange hover:text-lightGray"
			>
				LOGIN
			</a>
		</nav>
	);
}

export default Nav;
