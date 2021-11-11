---
sidebar_position: 2
sidebar_label: Example
---

# Vue integration

Reactive-CRDT works seamlessly together with [Vue3's Reactivity system](https://v3.vuejs.org/guide/reactivity-fundamentals.html). To enable this, call `useVueBindings` once, for example when setting up your store.

```typescript
import * as Vue from "vue";
import { useVueBindings } from "@syncedstore/core";

useVueBindings(Vue);
```

Then, place the Reactive-CRDT `store` on the Vue `data`. See the example below.

## Vue Example

See this example of creating a collaborative Todo application with Vue3 and Reactive-CRDT:

```javascript live vue
<template>
  <main id="app">
    <h1>Todo Vue</h1>
    <input
        class="new-todo"
        autofocus
        autocomplete="off"
        placeholder="What needs to be done?"
        v-model="newTodo"
        @keyup.enter="addTodo"
      />
    <ul class="todo-list">
        <li
          v-for="todo in store.todos"
          class="todo"
        >
          <div class="view">
            <label>
              <input class="toggle" type="checkbox" v-model="todo.completed" />
              {{ todo.title }}
            </label>
            <button class="destroy" @click="removeTodo(todo)">Delete</button>
          </div>
        </li>
      </ul>
  </main>
</template>

<script>
import { store } from "./store";
import { ref } from "vue";
import * as Vue from "vue";
import { useVueBindings } from "@syncedstore/core";

// make SyncedStore use Vuejs internally
useVueBindings(Vue);

export default {
  name: "App",
  data() {
    return {
      store, // Put the store on the data() of the component
      newTodo: ""
    };
  },
  methods: {
    addTodo() {
      const value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.store.todos.push({
        title: value,
        completed: false,
      });
      this.newTodo = "";
    },
    removeTodo(todo) {
      this.store.todos.splice(this.store.todos.indexOf(todo), 1);
    }
  }
};
</script>

<style>
#app {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #2c3e50;
}

ul {
  text-align:left;
}

li button {
  margin-left:1em;
}
</style>



```
