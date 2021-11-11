module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "@syncedstore/core": "<rootDir>/packages/core/src",
    "@syncedstore/yjs-reactive-bindings": "<rootDir>/packages/yjs-reactive-bindings/src",
  },
};
