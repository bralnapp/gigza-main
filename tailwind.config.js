/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./modules/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				primary: ["var(--font-plusJakartaSans)"]
			},
			colors: {
				black1: "#1B1C1E",
				black3: "#615C66",
				primary2: "#1C144C",
				primary: "#24947A",
				b1: "#1B1C1E",
				b2: "#323335",
				b3: "#494948",
				b4: "#5F6062",
				lightGreen: "#E4F5EE",
				stroke: "#E3E8EB"
			}
		}
	},
	plugins: []
};
