const razorpayGenerateOptions = (
	RAZORPAY_KEY_ID,
	amount_due,
	order_id,
	name,
	email,
	phone_number,
	slug
) => {
	return {
		key: RAZORPAY_KEY_ID,
		amount: amount_due,
		currency: "INR",
		name: "CrowdWise",
		description: "Come ahead and donate for this Campaign!",
		image: "/assets/logo.png",
		order_id,
		callback_url: `http://localhost:4000/api/campaigns/${slug}/donate/verify`,
		prefill: {
			name,
			email,
			contact: phone_number || "",
		},
		theme: {
			color: "#181818",
		},
	};
};

export default razorpayGenerateOptions;
