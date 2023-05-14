/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Lato"],
			},
			colors: {
				accentOrange: "#C37235",
				lightGray: "#222222",
			},
		},
	},
	plugins: [],
};
