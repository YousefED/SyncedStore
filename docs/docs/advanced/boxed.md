---
sidebar_position: 2
sidebar_label: Boxed Javascript values
---

# Boxed Javascript values (advanced)

```typescript live
import React from "react";
import { useReactive } from "@reactivedata/react";
import { boxed } from "@reactivedata/reactive-crdt";
import { store } from "./store"; // the store we defined above

export default function App() {
  const state = useReactive(store);

  return (
    <div>
      <p>Todo items:</p>
      {JSON.stringify(state, undefined, 2)}

      <button
        onClick={() => {
          state.todos.push(boxed({ title: "bla", completed: false }));
        }}
      >
        Add
      </button>
      <button
        onClick={() => {
          state.todos[0].completed = !state.todos[0].completed;
        }}
      >
        Edit
      </button>
    </div>
  );
}
```
