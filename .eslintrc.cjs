module.exports = {
	root: true,
	extends: ["plugin:@foretagsplatsen/main"],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2022,
	},
	env: {
		es6: true,
	},
	rules: {
		"import/no-unused-modules": [
			"error",
			{
				unusedExports: true,
				missingExports: true,
				// List of files not exporting anything:
				ignoreExports: [
					"**/.eslintrc.cjs",
					"index.js",
					"webpack.config.js",
				],
			},
		],
	},
};
