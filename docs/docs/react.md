---
sidebar_position: 3
sidebar_label: React
---

# React integration

_SyncedStore_ is designed to work seamlessly with React. Below, you'll find a basic todo app.
You'll notice that the code is almost as simple as building a regular todo app.

Defining the store is done in _store.ts_. Then, we import this store with the `useSyncedStore` hook into our _App_ component. Now, adding a todo item is as simple as calling `state.todos.push({ completed: false, title: "Get groceries" });`.

```typescript live
import React from "react";
import { useSyncedStore } from "@syncedstore/react";
import { store } from "./store";

export default function App() {
  const state = useSyncedStore(store);

  return (
    <div>
      <p>Todo items:</p>
      <ul>
        {state.todos.map((todo, i) => {
          return (
            <li key={i} style={{ textDecoration: todo.completed ? "line-through" : "" }}>
              <label>
                <input type="checkbox" checked={todo.completed} onClick={() => (todo.completed = !todo.completed)} />
                {todo.title}
              </label>
            </li>
          );
        })}
      </ul>
      <input
        placeholder="Enter a todo item and hit enter"
        type="text"
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            const target = event.target as HTMLInputElement;
            // Add a todo item using the text added in the textfield
            state.todos.push({ completed: false, title: target.value });
            target.value = "";
          }
        }}
        style={{ width: "200px", maxWidth: "100%" }}
      />
    </div>
  );
}
```

## Mutable store

If you're an experienced React developer, and used to using the `useState` hook to manage state,
you'll notice a slight difference in how _SyncedStore_ stores work. Instead of _immutable_ state,
with _SyncedStore_ and the _useSyncedStore_ hook, you can mutate variables on the `store` directly.

_SyncedStore_ uses the concept of Functional Reactive Programming, and in that way is similar to
React state management libraries like MobX.

Fancy words, but this actually makes your life a lot easier.

### `useSyncedStore` Hook

The `useSyncedStore` hook takes one parameter, which should be the store returned from the `syncedStore` method.

```typescript
const state = useSyncedStore(store);
```

The `useSyncedStore` hook is pretty smart. It automatically detects which properties of `state` you use in your React component.

If you only read from `state.todos[0].title`, your component rerenders _if and only if_ the title of the first "todo" changes,
whether that's by you or by a remote user. So, when another property changes (e.g.: a different todo item), your component doesn't rerender. Preventing these unnecessary rerenders improves the performance of your app.

:::info Learning more (advanced)

You can also pass a nested object (`store.vehicles`) or a Yjs object (e.g.: `Y.Doc`, `Y.Array` or `Y.Map`) to the `useSyncedStore` method (for example, if you're already using Yjs in your app and just want to utilize SyncedStore's more idiomatic API).

To learn more, the `useSyncedStore` is actually a wrapper for `useReactive`, from the [reactive library](https://github.com/yousefED/reactive).
:::
