(function () {
	module.exports = {
		root: true,
		extends: [
			"ftgp",
			"plugin:prettier/recommended",
			"plugin:import/recommended",
		],
		env: {
			es6: true,
		},
		plugins: ["ftgp", "jasmine", "sort-class-members"],
		parserOptions: {
			sourceType: "module",
			ecmaVersion: 9,
		},
		rules: {
			"prefer-object-spread": "error",
			"prefer-arrow-callback": "error",
			"max-params": "error",
			"no-unused-vars": [
				"error",
				{
					vars: "local",
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],
			"no-var": "error",
			"func-style": "off",
			"no-console": "error",
			"ftgp/indent": "off",
			"lines-between-class-members": ["error", "always"],
			"arrow-body-style": "error",
			"object-shorthand": ["error", "properties"],
			"no-sequences": ["error", { allowInParentheses: false }],
			"prefer-template": "error",
			"no-useless-concat": "error",
			"no-await-in-loop": "error",
			"no-return-await": "error",
			"prefer-promise-reject-errors": "error",
			"require-await": "error",
			"import/no-absolute-path": "error",
			"import/no-self-import": "error",
			"import/no-useless-path-segments": "error",
			"import/no-cycle": "error",
			"spaced-comment": [
				"error",
				"always",
				{
					block: {
						balanced: true,
					},
				},
			],
			"padding-line-between-statements": [
				"error",
				{ blankLine: "always", prev: "*", next: "export" },
				{
					blankLine: "always",
					prev: "multiline-expression",
					next: "*",
				},
				{
					blankLine: "always",
					prev: "*",
					next: "multiline-expression",
				},
			],
			"sort-class-members/sort-class-members": [
				2,
				{
					order: [
						"constructor",
						"[non-static-methods]",
						"[static-public-methods]",
						"[static-protected-methods]",
					],
					groups: {
						"non-static-methods": [
							{ static: false, type: "method" },
						],
						"static-public-methods": [
							{ name: "/^[^_].+/", static: true, type: "method" },
						],
						"static-protected-methods": [
							{ name: "/^_.+/", static: true, type: "method" },
						],
					},
				},
			],
		},
		settings: {
			"import/resolver": "webpack",
		},
	};
})();
