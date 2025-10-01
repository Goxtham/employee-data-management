// jest.config.js
// tests/setup.ts
process.env.NODE_ENV = "test"; // ensures connection.ts picks test DB

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.test.ts", "**/?(*.)+(spec|test).ts"],
  verbose: true,
  // run tests in band to avoid sqlite locking issues
  // (we'll pass --runInBand in the npm script)
};
