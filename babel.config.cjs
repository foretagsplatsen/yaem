/* eslint-env node */

module.exports = {
	overrides: [
		{
			env: {
				test: {
					plugins: [
						// Transforms ECMAScript modules to CommonJS
						// because Jest doesn't support ES modules
						// natively for now
						// https://jestjs.io/docs/ecmascript-modules:
						"@babel/plugin-transform-modules-commonjs",
					],
				},
			},
		},
	],
};
