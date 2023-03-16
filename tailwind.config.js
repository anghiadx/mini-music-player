module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			backgroundColor: {},
			backgroundImage: {
				"main-background": "url('./assets/images/backgrounds/dem-yen-lanh/background.png')",
			},
			keyframes: {
				bgMove: {
					"0% 100%": { backgroundPosition: "left" },
					"50%": { backgroundPosition: "right" },
				},
				"fade-in": {
					"0%": { opacity: 0 },
					"100%": { opacity: 1 },
				},
				"fade-out": {
					"0%": { opacity: 1 },
					"100%": { opacity: 0 },
				},
				"slide-in": {
					"0%": { transform: "translateY(-110%)" },
					"100%": { transform: "translateY(0)" },
				},
				"slide-out": {
					"0%": { transform: "translateY(0)" },
					"100%": { transform: "translateY(-110%)" },
				},
				"scale-in": {
					"0%": {
						transform: "scale(0.3)",
						opacity: 0,
					},
					"100%": {
						transform: "scale(1)",
						opacity: 1,
					},
				},
			},
			animation: {
				bgMove: "bgMove 110s linear infinite",
				"fade-in": "fade-in 0.6s ease-in-out",
				"fade-out": "fade-out 0.3s forwards",
				"slide-in": "slide-in 0.5s",
				"slide-out": "slide-out 0.8s forwards",
				"scale-in": "scale-in 0.3s",
			},
			transitionProperty: {
				"bg-image": "background-image",
			},
			boxShadow: {
				"style-1": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
				"style-2": "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
