import TodoMVC from "./TodoMVC.svelte";

window.todomvc = new TodoMVC({
  target: document.querySelector(".todoapp"),
});
