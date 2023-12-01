module.exports = {
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
  },
};
