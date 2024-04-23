import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		restoreMocks: true,

		coverage: {
			enabled: true,
			include: ["src/**"],
		},
	},
});
