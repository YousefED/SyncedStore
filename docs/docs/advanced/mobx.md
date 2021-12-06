---
sidebar_position: 3
sidebar_label: MobX integration
---

# MobX integration (advanced)

:::caution Only for MobX users
This section is intended for developers who are already using MobX in their application and don't want to use the built-in React, Vue or [Reactive](https://github.com/yousefED/reactive) bindings.
:::

_SyncedStore_ works seamlessly together with the [MobX FRP library](https://mobx.js.org). To enable this, call `enableMobxBindings` once, for example when setting up your store.

```typescript
import * as mobx from "mobx";
import { enableMobxBindings } from "@syncedstore/core";

enableMobxBindings(mobx);
```

## Example

You can now use mobx functionality such as reactions, autorun, etc. You can also use `mobx-react` to combine _SyncedStore_, _mobx_, and _React_.

Compared to the [default React example](/docs/react), we now wrap the component using `observer`, and we don't need the `useSyncedStore` hook anymore.

```typescript live
import React from "react";
import { store } from "./store";
import { observer } from "mobx-react-lite";
import * as mobx from "mobx";
import { enableMobxBindings } from "@syncedstore/core";

// enable mobx bindings
enableMobxBindings(mobx);

// use the observer pattern from mobx-react-lite.
export const App = observer(() => {
  return (
    <div>
      <p>Todo items:</p>
      <ul>
        {store.todos.map((todo, i) => {
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
            store.todos.push({ completed: false, title: target.value });
            target.value = "";
          }
        }}
        style={{ width: "200px", maxWidth: "100%" }}
      />
    </div>
  );
});

export default App;
```
