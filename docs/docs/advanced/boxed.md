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
      {JSON.stringify(store.todos, undefined, 2)}

      <button
        onClick={() => {
          store.todos.push(boxed({ title: "bla", completed: false }));
        }}
      >
        Add
      </button>
    </div>
  );
}
```
