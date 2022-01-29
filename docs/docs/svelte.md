---
sidebar_position: 4
sidebar_label: Svelte
---

# Svelte integration

_SyncedStore_ works seamlessly together with [Svelte Stores](https://svelte.dev/docs#run-time-svelte-store).

```javascript
import { syncedStore, getYjsValue } from "@syncedstore/core";
import { svelteSyncedStore } from "@syncedstore/svelte";

// Create your SyncedStore store
const todoStore = syncedStore({ todos: [] });

// Create Svelte Store for use in your components.
// You can treat this like any other store, including `bind`.
export const store = svelteSyncedStore(todoStore);
```

See this example of creating a collaborative Todo application with Svelte and SyncedStore:

```javascript svelte
<script>
	import { store } from "./store.js";

	let newTodo = "";

	const addTodo = () => {
	  const value = newTodo && newTodo.trim();

	  if (!value) {
	    return;
	  }
	  $store.todos.push({
	    title: value,
	    completed: false
	  });
	  newTodo = "";
	};

	const removeTodo = todo => {
	  $store.todos.splice($store.todos.indexOf(todo), 1);
	};
</script>

<main id="app">
	<h1>Todo Svelte</h1>
	<form on:submit|preventDefault={addTodo}>
		<input
				class="new-todo"
				autocomplete="off"
				placeholder="What needs to be done?"
				bind:value={newTodo}
			/>
		</form>
	<ul class="todo-list">
		{#each $store.todos as todo}
				<li class="todo">
					<div>
						<label>
							<input class="toggle" type="checkbox" bind:checked={todo.completed} />
							{ todo.title }
						</label>
						<button class="destroy" on:click={() => removeTodo(todo)}>Delete</button>
					</div>
				</li>
			{/each}
		</ul>
</main>
```
