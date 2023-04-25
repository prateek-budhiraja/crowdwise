export const home = (_req, res) => {
	res.status(200).json({
		success: true,
		message: "Hare Krishna!",
	});
};
