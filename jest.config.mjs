/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
	// Automatically clear mock calls, instances, contexts and results
	// before every test:
	clearMocks: true,

	collectCoverage: true,
	collectCoverageFrom: ["./src/**"],
	coverageDirectory: "coverage",
};

export default config;
