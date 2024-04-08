/* eslint-env node */

module.exports = {
	root: true,
	extends: ["plugin:@foretagsplatsen/main"],
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
				ignoreExports: [`${__dirname}/.eslintrc.cjs`, "index.js"],
			},
		],
	},
};
