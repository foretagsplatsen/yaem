module.exports = {
	env: {},
	overrides: [
		{
			include: (filename) => filename.indexOf("/node_modules/") !== -1,
			env: {
				test: {
					plugins: ["@babel/plugin-transform-modules-commonjs"],
				},
			},
		},
		{
			exclude: (filename) => filename.indexOf("/node_modules/") !== -1,
			env: {
				test: {
					plugins: [
						"rewire",
						"@babel/plugin-transform-modules-commonjs",
					],
				},
			},
		},
	],
};
