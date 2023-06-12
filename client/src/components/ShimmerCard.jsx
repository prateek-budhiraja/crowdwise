const ShimmerCard = () => {
	return (
		<div className="rounded-lg border-2 border-gray-300 w-[400px] md:w-[100%] max-w-[500px] hover:scale-105 ease-in duration-200">
			<div className="h-[180px] rounded-lg w-full bg-lightGray" />
			<div className="px-2 my-2">
				<h3 className="bg-lightGray text-lightGray rounded text-lg mt-2 leading-none">
					.
				</h3>
				<h4 className="bg-lightGray text-lightGray rounded  mt-1 text-xs">.</h4>
				<div className="w-full bg-lightGray rounded-full h-2 mt-2">
					<div
						className="bg-accentOrange h-2 rounded-full"
						style={{
							width: "100%",
						}}
					></div>
				</div>
				<h4 className="bg-lightGray text-lightGray rounded  mt-1.5">.</h4>
			</div>
		</div>
	);
};

export default ShimmerCard;
