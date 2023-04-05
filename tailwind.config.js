/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#433F71",
				header: "#312F51",
				body: "#282841",
			},
			screens: {
				mobile: {
					max: "768px",
				},
			},
			transitionProperty: {
				margin: "margin",
				opacity: "opacity",
				transform: "transform"
			}
		},
	},
	plugins: [require("@tailwindcss/line-clamp"), require("tailwind-scrollbar")],
}
