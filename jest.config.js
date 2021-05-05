module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "reactive-crdt": "<rootDir>/packages/reactive-crdt/src",
    "yjs-reactive-bindings": "<rootDir>/packages/yjs-reactive-bindings/src",
  },
};
