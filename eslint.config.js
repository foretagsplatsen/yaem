import finsitPlugin from "@foretagsplatsen/eslint-plugin";

const config = [
	...finsitPlugin.configs.main,
	{ ignores: ["coverage/"] },
	{
		rules: {
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
			"sonarjs/no-duplicate-string": "off",
		},
	},
];

export default config;
