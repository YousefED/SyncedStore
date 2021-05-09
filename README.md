# Reactive CRDT

[![npm version](https://badge.fury.io/js/%40reactivedata%2Freactive-crdt.svg)](https://badge.fury.io/js/%40reactivedata%2Freactive-crdt) [![Coverage Status](https://coveralls.io/repos/github/YousefED/reactive-crdt/badge.svg?branch=main)](https://coveralls.io/github/YousefED/reactive-crdt?branch=main)

Reactive CRDT is an easy-to-use library for building collaborative applications that sync automatically. It's built on top of [Yjs](https://github.com/yjs/yjs), a proven, high performance CRDT implementation.

# Example

Have a look at the collaborative Todo list examples ([React](https://github.com/yousefED/reactive-crdt/tree/main/examples/todo-react), [Vue](https://github.com/yousefED/reactive-crdt/tree/main/examples/todo-vue)) to get up to speed. Or, read along for a quick overview.

[![example app screencapture](https://raw.githubusercontent.com/YousefED/reactive-crdt/main/reactivecrdt.gif)](https://github.com/yousefED/reactive-crdt/tree/main/examples/)

View source and run: [React](https://github.com/yousefED/reactive-crdt/tree/main/examples/todo-react), [Vue](https://github.com/yousefED/reactive-crdt/tree/main/examples/todo-vue).

# Quick overview

Setup:

```typescript
import { crdt, Y } from "@reactivedata/reactive-crdt";
import { WebrtcProvider } from "y-webrtc";

// Create a document that syncs automatically using Y-WebRTC
const doc = new Y.Doc();
const webrtcProvider = new WebrtcProvider("my-document-id", doc);

// (optional, define types for TypeScript)
type Vehicle = { color: string; type: string };

type StoreType = {
  vehicles: Vehicle[];
};

// Create your reactive-crdt store
export const store = crdt<StoreType>(doc);

// initialize vehicles as an empty array:
store.vehicles = [];
```

From now on, the `store` object is synced automatically:

User 1:

```typescript
store.vehicles.push({ type: "car", color: "red" });
```

User 2 (on a different device):

```typescript
console.log(store.vehicles.length); // Outputs: 1
```

# Reacting to updates

Now that State can be modified by connected peers, you probably want to observe changes and automatically display updates. This is easy to do, because Reactive CRDT works closely with the [Reactive library](https://www.github.com/yousefed/reactive).

Let's look at some examples:

## Using React

```typescript
import { useReactive } from "@reactivedata/react";
import { store } from "."; // the store we defined above

export default function App() {
  const state = useReactive(store);

  return (
    <div>
      <p>Vehicles:</p>
      <ul>
        {state.vehicles
          .map((v) => {
            return <li>{v.type}</li>;
          })}
      </ul>
      <input type="text" onKeyPress=((event) => {
        if (event.key === "Enter") {
            const target = event.target as HTMLInputElement;
            // Add a yellow vehicle using the type added in the textfield
            state.vehicles.push({ color: "yellow", type: target.value });
            target.value = "";
        }
      })>
    </div>
  );
}
```

<sup>View on CodeSandbox (coming soon)</sup>

## Vue

Reactive CRDT works great with Vues reactive programming model. See the [Vue Todo example](https://github.com/yousefED/reactive-crdt/tree/main/examples/todo-vue) for an example application. In short, just put an object returned by the `crdt` function on a Vue `data()` object:

```typescript
import { useVueBindings } from "@reactivedata/reactive-crdt";
import * as Vue from "vue";
import { crdt, Y, useVueBindings } from "@reactivedata/reactive-crdt";
import { WebrtcProvider } from "y-webrtc";

// make reactive-crdt use Vuejs internally
useVueBindings(Vue);

// Setup Yjs
const doc = new Y.Doc();
new WebrtcProvider("id", doc); // sync via webrtc

export default Vue.defineComponent({
  data() {
    return {
      // synced with Reactive CRDT
      sharedData: crdt<{
        vehicles: Vehicle[];
      }>(doc),
      // untouched
      regularLocalString: "",
    }
  }
);
```

You can now use `sharedData.vehicles` in your Vue app and it will sync automatically.

## Without framework

You don't have to use React or Vue, you can also use `autorun` from the Reactive library to observe changes:

```typescript
import { reactive, autorun } from "@reactivedata/reactive";
import { store } from "."; // the store we defined above

const reactiveStore = reactive(store);

autorun(() => {
  reactiveStore.vehicles.forEach(v => {
    console.log(`A ${v.color} ${v.type}`);
  });
});

// This can be executed on a different connected device:
reactiveStore.vehicles.push({ type: "bike", color: "red" });
reactiveStore.vehicles.push({ type: "bus", color: "green" });
```

<sup>View on CodeSandbox (coming soon)</sup>

# Motivation

Yjs is a very powerful CRDT, but it's API is mostly targeted to create high-performant data bindings for (rich text) editors.

I wanted to explore whether we can abstract the existing Yjs API away, and make it _extremely easy_ to integrate it as a Collaborative Data Store into existing applications.

There were two major design decisions:

- Instead of data types like Y.Map, and Y.Array, can we just use plain Javascript objects and arrays?
  - e.g.: `store.outer.inner.property = value` instead of `doc.getMap("inner").getMap("outer").getMap("inner").get("value")`
- Instead of having to call `.observe` manually, can we integrate with a Reactive Functional Programming library to do this automatically?
  - e.g.: wrap your code in `autorun` or use `useReactive` (React), or Vue's reactive model and automatically observe all used values from the store.

Would love to hear your feedback!

### Credits ❤️

Reactive CRDT builds directly on [Yjs](https://github.com/yjs/yjs) and [Reactive](https://www.github.com/yousefed/reactive). It's also inspired by and builds upon the amazing work by [MobX](https://mobx.js.org/) and [NX Observe](https://github.com/nx-js/observer-util).
