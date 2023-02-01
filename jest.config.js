module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ["<rootDir>"],
  modulePaths: ["<rootDir>"],
  moduleNameMapper: {
    "@syncedstore/core": "<rootDir>/packages/core/src",
    "@syncedstore/yjs-reactive-bindings": "<rootDir>/packages/yjs-reactive-bindings/src",
    "solid-js/web": "<rootDir>/node_modules/solid-js/web/dist/web.cjs",
    "solid-js/store": "<rootDir>/node_modules/solid-js/store/dist/store.cjs",
    "solid-js": "<rootDir>/node_modules/solid-js/dist/solid.cjs",
  },
};
