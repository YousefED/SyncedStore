---
sidebar_position: 2
sidebar_label: Example
---

# Vue Example

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
import { useVueBindings } from "@reactivedata/reactive-crdt";

// make reactive-crdt use Vuejs internally
useVueBindings(Vue);

export default {
  name: "App",
  data() {
    return {
      store,
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
