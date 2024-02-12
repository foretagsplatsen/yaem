const path = require("node:path");

let config = {
	entry: "./index.js",
	mode: "development",
	devtool: false,
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "yaem.js",
		library: "yaem",
	},
	resolve: {
		modules: [path.resolve(__dirname, "src"), "node_modules"],
	},
};

module.exports = config;
