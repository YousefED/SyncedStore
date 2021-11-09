---
sidebar_position: 2
sidebar_label: Boxed Javascript values
---

# Boxed Javascript values (advanced)

By default, all properties in the Synced store are made collaborative, _independently_.

This means that when you add an object to the store (e.g. `store.todos.push({ title: "groceries", completed: false}))`, both the `title` and `completed` property are seen as collaborative, and are synced independently.

This might not always be desirable, for two reasons:

1. Every collaborative object has some bookkeeping performance overhead.
2. Depending on your data model, it might not make sense. To determine this, ask yourself whether different properties should be allowed to be updated _independently_. In the "todo" example, is it ok for your app if user A sets a todo-item to completed, and user B changes the text at the same time?

## Boxed values

If you want to prevent subproperties from being made collaborative, you can use _boxed values_.

```typescript
import { crdt, Y, Box, boxed } from "@reactivedata/reactive-crdt";

export const store = crdt(doc, { todos: [] as Box<Todo>[] });

// ...

store.todos.push(boxed({ title: "groceries", completed: false }));

// Use `value` to get the contents of the box
const completed = store.todos[0].value.completed;
```

Now, the array will contain a single todo item that should be considered "frozen". To update it, you now need to replace the entire item:

```typescript
// GOOD:
store.todos.splice(0, 1, boxed({ title: "groceries", completed: true }));

// BAD, this won't sync as individual properties of a boxed item are not collaborative
store.todos[0].completed = true;
```

Try it out for yourself in this interactive playground:

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

      <div>
        <button
          onClick={() => {
            state.todos.push(boxed({ title: "This is a todo", completed: false }));
          }}
        >
          Add a boxed item
        </button>
        <button
          onClick={() => {
            state.todos[0].completed = !state.todos[0].completed;
          }}
        >
          Edit first item (mutate)
        </button>
        <button
          onClick={() => {
            state.todos.splice(
              0,
              1,
              boxed({
                title: state.todos[0].value.title,
                completed: !state.todos[0].value.completed,
              })
            );
          }}
        >
          Edit first item (replace)
        </button>
      </div>
    </div>
  );
}
```
