# SyncedStore CRDT

<small>(This library was previously called "Reactive-CRDT")</small>

[![npm version](https://badge.fury.io/js/%40syncedstore%2Fcore.svg)](https://badge.fury.io/js/%40syncedstore%2Fcore) [![Coverage Status](https://coveralls.io/repos/github/YousefED/SyncedStore/badge.svg?branch=main)](https://coveralls.io/github/YousefED/SyncedStore?branch=main)

SyncedStore is an easy-to-use library for building collaborative applications that sync automatically. It's built on top of [Yjs](https://github.com/yjs/yjs), a proven, high performance CRDT implementation.

# Documentation

### [View the documentation with interactive code samples](https://yousefed.github.io/SyncedStore/docs/)

[https://yousefed.github.io/SyncedStore/](https://yousefed.github.io/SyncedStore/docs/)

- [Getting Started](https://yousefed.github.io/SyncedStore/docs/basics/installation)
- [Working with React](https://yousefed.github.io/SyncedStore/docs/react)
- [Working with Vue](https://yousefed.github.io/SyncedStore/docs/vue)
- [Collaborative text editing](https://yousefed.github.io/SyncedStore/docs/advanced/richtext)
- [Sync providers](https://yousefed.github.io/SyncedStore/docs/sync-providers)

## Example

Have a look at the collaborative Todo list examples ([React](https://github.com/YousefED/syncedstore/tree/main/examples/todo-react), [Vue](https://github.com/YousefED/syncedstore/tree/main/examples/todo-vue)) to get up to speed.

[![example app screencapture](https://raw.githubusercontent.com/YousefED/syncedstore/main/syncedstore.gif)](https://github.com/YousefED/syncedstore/tree/main/examples/)

- Open live demo: [React](https://ze3vo.csb.app/) or [Vue](https://uie1c.csb.app/) (Of course, open multiple times to test multiplayer)
- Edit / view on Codesandbox [React](https://codesandbox.io/s/todo-react-ze3vo) / [Vue](https://codesandbox.io/s/todo-vue-uie1c)

Source in: [examples/todo-react](https://github.com/YousefED/syncedstore/tree/main/examples/todo-react) and [examples/todo-vue](https://github.com/YousefED/syncedstore/tree/main/examples/todo-vue).

# Motivation

Yjs is a very powerful CRDT, but it's API is mostly targeted to create high-performant data bindings for (rich text) editors.

I wanted to explore whether we can abstract the existing Yjs API away, and make it _extremely easy_ to integrate it as a Collaborative Data Store into existing applications.

There were two major design decisions:

- Instead of data types like Y.Map, and Y.Array, can we just use plain Javascript objects and arrays?
  - e.g.: `store.outer.inner.property = value` instead of `doc.getMap("inner").getMap("outer").getMap("inner").get("value")`
- Instead of having to call `.observe` manually, can we integrate with a Reactive Functional Programming library to do this automatically?
  - e.g.: wrap your code in `autorun` or use `useSyncedStore` (React), or Vue's reactive model and automatically observe all used values from the store.

Would love to hear your feedback!

### Credits ❤️

SyncedStore builds directly on [Yjs](https://github.com/yjs/yjs) and [Reactive](https://www.github.com/yousefed/reactive). It's also inspired by and builds upon the amazing work by [MobX](https://mobx.js.org/) and [NX Observe](https://github.com/nx-js/observer-util).
