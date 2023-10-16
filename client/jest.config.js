module.exports = {
  roots: ["<rootDir>/"],
  testRegex: "\\.test\\.tsx$",
  testTimeout: 10000,
  testPathIgnorePatterns: [
    '<rootDir>//node_modules',
  ],
  testEnvironment: "jsdom",
  transform: {
    '^.+\.tsx$': [
      'ts-jest', {
        tsconfig: 'tsconfig.json',
        isolatedModules: true
      },
    ],
  },
};