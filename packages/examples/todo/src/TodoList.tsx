import { useReactive } from "@reactivedata/react";
import React from "react";
import { globalStore } from "./store";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const store = useReactive(globalStore);

  const activeTodos = store.todos.filter((t) => !t.completed);
  const completedTodos = store.todos.filter((t) => t.completed);
  const shownTodos = store.view === "all" ? store.todos : store.view === "active" ? activeTodos : completedTodos;

  return (
    <ul className="todo-list">
      {/* These are here just to show the structure of the list items 
        // List items should get the class `editing` when editing and `completed` when marked as completed  */}
      {shownTodos.map((todo, i) => (
        <TodoItem todo={todo} key={i} />
      ))}
    </ul>
  );
}
