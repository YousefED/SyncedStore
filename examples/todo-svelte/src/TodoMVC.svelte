<script>
  import { crdt, Y, useSvelteBindings, filterArray } from "@reactivedata/reactive-crdt";
  import { WebrtcProvider } from "y-webrtc";
  import { writable } from "svelte/store";
  import { createEventDispatcher, onMount } from "svelte";

  const refresh = () => {
    store = store;
  };
  useSvelteBindings({
    writable,
    refresh,
  });

  // Setup Yjs
  const doc = new Y.Doc();
  new WebrtcProvider("id", doc); // sync via webrtc

  const store = crdt(doc);
  if (!store.todos) store.todos = [];

  const ENTER_KEY = 13;
  const ESCAPE_KEY = 27;

  let currentFilter = "all";
  let editing = null;

  try {
    const stored = JSON.parse(localStorage.getItem("todos-svelte"));
    console.log(stored);
    store.todos = stored;
  } catch (err) {
    store.todos = [];
  }

  const updateView = () => {
    currentFilter = "all";
    if (window.location.hash === "#/active") {
      currentFilter = "active";
    } else if (window.location.hash === "#/completed") {
      currentFilter = "completed";
    }
  };

  window.addEventListener("hashchange", updateView);
  updateView();

  function clearCompleted() {
    filterArray(store.todos, (val) => !val.completed);
  }

  function remove(index) {
    store.todos.splice(index, 1);
  }

  function toggleAll(event) {
    store.todos = store.todos.map((item) => ({
      id: item.id,
      description: item.description,
      completed: event.target.checked,
    }));
  }

  function createNew(event) {
    if (event.which === ENTER_KEY) {
      store.todos.push({
        id: uuid(),
        description: event.target.value,
        completed: false,
      });
      refresh();
      event.target.value = "";
    }
  }

  function handleEdit(event) {
    if (event.which === ENTER_KEY) event.target.blur();
    else if (event.which === ESCAPE_KEY) editing = null;
  }

  function submit(event) {
    store.todos[editing].description = event.target.value;
    editing = null;
  }

  function uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function toggleCompleted(id) {
    const index = store.todos.find((val) => val.id === id);
    console.log(index);
    store.todos[index].completed = store.todos[index].completed;
  }

  $: filtered =
    currentFilter === "all"
      ? store.todos
      : currentFilter === "completed"
      ? store.todos.filter((item) => item.completed)
      : store.todos.filter((item) => !item.completed);

  $: numActive = store.todos.filter((item) => !item.completed).length;

  $: numCompleted = store.todos.filter((item) => item.completed).length;

  $: console.log(store.todos.toJSON());

  $: try {
    localStorage.setItem("todos-svelte", JSON.stringify(store.todos));
  } catch (err) {
    // noop
  }
</script>

<header class="header">
  <h1>todos</h1>
  <input class="new-todo" on:keydown={createNew} placeholder="What needs to be done?" autofocus />
</header>

{#if store.todos.length > 0}
  <section
    class="main"
    on:yjs={(event) => {
      console.log(event);
    }}
  >
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      on:change={toggleAll}
      checked={numCompleted === store.todos.length}
    />
    <label for="toggle-all">Mark all as complete</label>

    <ul class="todo-list">
      {#each filtered as item, index (item.id)}
        <li class="{item.completed ? 'completed' : ''} {editing === index ? 'editing' : ''}">
          <div class="view">
            <input class="toggle" type="checkbox" bind:checked={item.completed} />
            <label on:dblclick={() => (editing = index)}>{item.description}</label>
            <button on:click={() => remove(index)} class="destroy" />
          </div>

          {#if editing === index}
            <input value={item.description} id="edit" class="edit" on:keydown={handleEdit} on:blur={submit} autofocus />
          {/if}
        </li>
      {/each}
    </ul>

    <footer class="footer">
      <span class="todo-count">
        <strong>{numActive}</strong>
        {numActive === 1 ? "item" : "items"} left
      </span>

      <ul class="filters">
        <li><a class={currentFilter === "all" ? "selected" : ""} href="#/">All</a></li>
        <li><a class={currentFilter === "active" ? "selected" : ""} href="#/active">Active</a></li>
        <li><a class={currentFilter === "completed" ? "selected" : ""} href="#/completed">Completed</a></li>
      </ul>

      {#if numCompleted}
        <button class="clear-completed" on:click={clearCompleted}> Clear completed </button>
      {/if}
    </footer>
  </section>
{/if}
