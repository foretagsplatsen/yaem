/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
	restoreMocks: true,

	setupFilesAfterEnv: ["./test/setup.js"],

	collectCoverage: true,
	collectCoverageFrom: ["./src/**"],
	coverageDirectory: "coverage",
};

export default config;
