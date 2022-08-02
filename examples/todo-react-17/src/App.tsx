import React, { useState } from "react";
import { useSyncedStore } from "@syncedstore/react";
import { filterArray } from "@syncedstore/core";
// import "./App.css";
import { globalStore } from "./store";
import { TodoList } from "./TodoList";

function App() {
  const store = useSyncedStore(globalStore);
  const [view, setView] = useState<"all" | "active" | "completed">("all");
  function onKeyPress(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const target = event.target as HTMLInputElement;
      store.todos.push({ completed: false, title: target.value });
      target.value = "";
    }
  }

  const activeTodos = store.todos.filter((t) => !t.completed);
  const hasCompletedTodos = !!store.todos.find((t) => t.completed);

  return (
    <div className="todoRoot">
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What needs to be done?" autoFocus onKeyPress={onKeyPress} />
        </header>
        {/* This section should be hidden by default and shown when there are todos */}
        {!!store.todos.length && (
          <>
            <section className="main">
              <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onClick={(event) =>
                  store.todos.forEach((t) => {
                    t.completed = (event.target as HTMLInputElement).checked;
                  })
                }
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
              <TodoList view={view}></TodoList>
            </section>
            {/* This footer should be hidden by default and shown when there are todos  */}
            <footer className="footer">
              {/* This should be `0 items left` by default  */}
              <span className="todo-count">
                <strong>{activeTodos.length}</strong> {activeTodos.length === 1 ? "item" : "items"} left
              </span>
              {/* Remove this if you don't implement routing  */}
              <ul className="filters">
                <li>
                  <a
                    className={view === "all" ? "selected" : ""}
                    href="#"
                    onClick={(e) => {
                      setView("all");
                      e.preventDefault();
                    }}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    className={view === "active" ? "selected" : ""}
                    href="#"
                    onClick={(e) => {
                      setView("active");
                      e.preventDefault();
                    }}
                  >
                    Active
                  </a>
                </li>
                <li>
                  <a
                    className={view === "completed" ? "selected" : ""}
                    href="#"
                    onClick={(e) => {
                      setView("completed");
                      e.preventDefault();
                    }}
                  >
                    Completed
                  </a>
                </li>
              </ul>
              {/* Hidden if no completed items are left */}
              {hasCompletedTodos && (
                <button
                  className="clear-completed"
                  onClick={() => {
                    filterArray(store.todos, (t) => !t.completed);
                  }}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </section>
      <footer className="info">
        <p>Double-click to edit a todo</p>
        <p>
          Created by <a href="http://todomvc.com">YousefED</a>
        </p>
        <p>
          {" "}
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
