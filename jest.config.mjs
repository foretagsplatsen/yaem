/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
	// Automatically clear mock calls, instances, contexts and results
	// before every test:
	clearMocks: true,

	// Indicates whether the coverage information should be collected
	// while executing the test:
	collectCoverage: true,

	// An array of glob patterns indicating a set of files for which
	// coverage information should be collected:
	collectCoverageFrom: ["./src/**"],

	// The directory where Jest should output its coverage files:
	coverageDirectory: "coverage",

	// Deactivate default transformers. This is useful to support ES
	// modules:
	transform: {},
};

export default config;
