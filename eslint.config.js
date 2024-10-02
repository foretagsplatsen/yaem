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
			"import/no-anonymous-default-export": "off",
			"jsdoc/check-alignment": "off",
			"jsdoc/check-param-names": "off",
			"jsdoc/check-tag-names": "off",
			"jsdoc/check-types": "off",
			"jsdoc/match-description": "off",
			"jsdoc/no-undefined-types": "off",
			"jsdoc/require-hyphen-before-param-description": "off",
			"jsdoc/require-jsdoc": "off",
			"jsdoc/require-param": "off",
			"jsdoc/require-param-description": "off",
			"jsdoc/require-param-type": "off",
			"jsdoc/require-returns": "off",
			"jsdoc/tag-lines": "off",
			"no-magic-numbers": "off",
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
			"sonarjs/no-duplicate-string": "off",
		},
	},
];
