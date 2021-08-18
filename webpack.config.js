const path = require("path");

let config = {
	entry: "./index.js",
	mode: "development",
	devtool: false,
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "hollywood.js",
		library: "hollywood",
	},
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"],
	},
};

module.exports = config;
