module.exports = {
  roots: ["<rootDir>/src"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/**",
    "<rootDir>/src/main/decorators/**/*.ts"
  ],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: "@shelf/jest-mongodb",
  transform: {
    ".+\\.ts$": "ts-jest"
  }
};
