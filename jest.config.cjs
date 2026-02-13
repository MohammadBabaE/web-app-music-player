module.exports = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  moduleNameMapper: {
    "\\.(scss|css)$": "identity-obj-proxy",
  },
  transform: {
    "\\.[tj]s$": ["babel-jest", { configFile: "./babel.config.cjs" }],
  },
  moduleFileExtensions: ["js", "ts"],
  setupFiles: ["fake-indexeddb/auto"],
};
