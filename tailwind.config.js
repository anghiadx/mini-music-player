module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundColor: {},
			backgroundImage: {
				"main-background": "url('./assets/images/bg-main.png')",
			},
			keyframes: {
				move: {
					"0% 100%": { backgroundPosition: "left" },
					"50%": { backgroundPosition: "right" },
				},
			},
			animation: {
				bgMove: "move 110s linear infinite",
			},
			transitionProperty: {
				"bg-image": "background-image",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
