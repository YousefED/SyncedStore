import { useSyncedStores } from "@syncedstore/react";
import { useState } from "react";
import { globalStore, Todo } from "./store";

export function TodoItem(props: { todo: Todo }) {
  const [todo, store] = useSyncedStores([props.todo, globalStore], [props.todo]);
  const [editing, setEditing] = useState(false);
  // const [todo, store] = useSyncedStores(globalStore], [props.todo]);

  function removeTodo() {
    const index = store.todos.indexOf(todo);
    if (index > -1) {
      store.todos.splice(index, 1);
    }
  }

  return (
    <li className={editing ? "editing" : todo.completed ? "completed" : "view"}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => (todo.completed = !todo.completed)}
        />
        <label
          onDoubleClick={() => {
            setEditing(true);
          }}
        >
          {todo.title}
        </label>
        <button className="destroy" onClick={removeTodo}></button>
      </div>
      {editing && (
        <input
          className="edit"
          defaultValue={todo.title}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              (event.target as HTMLInputElement).blur();
            }
          }}
          onBlur={(event) => {
            todo.title = event.target.value;
            setEditing(false);
          }}
        />
      )}
    </li>
  );
}
