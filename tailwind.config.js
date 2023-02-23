module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "red",
				primary2: "blue",
			},

			backgroundColor: {
				primary: "yellow",
			},
			backgroundImage: {
				"main-background": "url('./assets/images/macos.jpg')",
			},
		},
	},
	plugins: [],
};
