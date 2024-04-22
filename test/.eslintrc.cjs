/* eslint-env node */

module.exports = {
	// extends: ["plugin:@foretagsplatsen/jest"],
	rules: {
		"import/no-unused-modules": [
			"error",
			{
				unusedExports: true,
				missingExports: true,
				// List of files not exporting anything:
				ignoreExports: [`${__dirname}/.eslintrc.cjs`, "**/*.test.js"],
			},
		],
	},
};
