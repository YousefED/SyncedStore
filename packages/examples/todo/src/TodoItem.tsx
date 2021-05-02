import { useReactives } from "@reactivedata/react";
import { globalStore, Todo } from "./store";

export function TodoItem(props: { todo: Todo }) {
  const [todo, store] = useReactives([props.todo, globalStore], [props.todo]);
  // const [todo, store] = useReactives(globalStore], [props.todo]);

  function removeTodo() {
    const index = store.todos.indexOf(todo);
    if (index > -1) {
      store.todos.splice(index, 1);
    }
  }

  return (
    <li className={store.editingTodo === todo ? "editing" : todo.completed ? "completed" : "view"}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => (todo.completed = !todo.completed)}
        />
        <label
          onDoubleClick={() => {
            store.editingTodo = todo;
          }}
        >
          {todo.title}
        </label>
        <button className="destroy" onClick={removeTodo}></button>
      </div>
      {store.editingTodo === todo && (
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
            store.editingTodo = undefined;
          }}
        />
      )}
    </li>
  );
}
