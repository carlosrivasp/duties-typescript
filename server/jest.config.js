module.exports = {
  roots: ["<rootDir>/"],
  testRegex: "\\.test\\.ts$",
  testTimeout: 10000,
  testPathIgnorePatterns: [
    '<rootDir>//node_modules',
  ],
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "test-results",
        outputName: "Duties-Server-unit.xml",
      },
    ],
  ],
  testEnvironment: "node",
  transform: {
    '^.+\.ts$': [
      'ts-jest', {
        tsconfig: 'tsconfig.json',
        isolatedModules: true
      },
    ],
  },
};