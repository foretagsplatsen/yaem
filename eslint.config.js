import finsitPlugin from "@foretagsplatsen/eslint-plugin";

export default [
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
						"eslint.config.js",
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
