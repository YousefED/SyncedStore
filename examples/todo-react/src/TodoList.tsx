import { useSyncedStore } from "@syncedstore/react";
import React from "react";
import { globalStore } from "./store";
import { TodoItem } from "./TodoItem";

export function TodoList(props: { view: "all" | "active" | "completed" }) {
  const store = useSyncedStore(globalStore);

  const activeTodos = store.todos.filter((t) => !t.completed);
  const completedTodos = store.todos.filter((t) => t.completed);
  const shownTodos = props.view === "all" ? store.todos : props.view === "active" ? activeTodos : completedTodos;

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
