---
sidebar_position: 3
sidebar_label: Yjs integration
---

# Yjs integration (advanced)

Reactive-CRDT uses (Yjs)[https://github.com/yjs/yjs] as underlying CRDT. Yjs is a CRDT implementation with a focus on performance and collaborative text editing. It does have a fairly steep learning curve, which is why Reactive-CRDT hides as many of the Yjs internals as possible.

However, should you want to access the underlying Yjs objects of your store, that's definitely possible.

## Accessing Yjs objects

#### `getYjsValue(object: any)`

`object` is a value from the Reactive-CRDT store. The return type of `getYjsValue` depends on the type passed in:

- If `object` is the store itself, the return value is a `Y.Doc`
- If `object` is an array, the return value is a `Y.Array`
- If `object` is an object, the return value is a `Y.Map`

Check out the demo of `getYjsValue` below:

```typescript live
import React from "react";
import { useReactive } from "@reactivedata/react";
import { boxed, getYjsValue } from "@reactivedata/reactive-crdt";
import { store } from "./store"; // the store we defined above
import { ObjectInspector } from "react-inspector";

export default function App() {
  const state = useReactive(store);

  const doc = getYjsValue(state);
  const array = getYjsValue(state.todos);
  const map = state.todos.length ? getYjsValue(state.todos[0]) : undefined;

  return (
    <div>
      <p>Todo items:</p>
      <p>{JSON.stringify(state)}</p>

      <ObjectInspector data={{ doc, array, map }} />
      <br />
      <div>
        <button
          onClick={() => {
            state.todos.push({ title: "This is a todo", completed: false });
          }}
        >
          Add a boxed item
        </button>
      </div>
    </div>
  );
}
```

## Understanding the Reactive-CRDT internals

If you're familiar with Yjs, you might be interested in how Reactive-CRDT works. There are two important abstractions Reactive-CRDT introduces on top of Yjs:

- Instead of data types like Y.Map, and Y.Array, use plain Javascript objects and array
  - e.g.: `store.outer.inner.property = value` instead of `doc.getMap("outer").get("inner").set("property", "value")`
- Instead of having to call `.observe` manually, we integrate with a Reactive Functional Programming library to react to changes automatically
  - e.g.: wrap your code in `autorun` or use `useReactive` (React), Mobx, or Vue's reactive model and automatically observe all used values from the store.
