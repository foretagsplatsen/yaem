const finsitPlugin = require("@foretagsplatsen/eslint-plugin");

module.exports = [
	...finsitPlugin.configs.main,
	{ ignores: ["coverage/"] },
	{
		rules: {
			"import/no-unused-modules": [
				"error",
				{
					unusedExports: true,
					missingExports: true,
					ignoreExports: [
						"eslint.config.cjs",
						"vitest.config.js",
						".eslintrc.cjs",
						"index.js",
					],
				},
			],
		},
	},
	{
		files: ["test/**/*.js"],
		rules: {
			"import/no-unused-modules": [
				"error",
				{
					unusedExports: true,
					missingExports: true,
					// List of files not exporting anything:
					ignoreExports: ["**/*.test.js"],
				},
			],
		},
	},
];
