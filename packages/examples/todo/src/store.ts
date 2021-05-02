import { reactive } from "@reactivedata/reactive";

export type Todo = {
  title: string;
  completed: boolean;
};

export const globalStore = reactive({
  editingTodo: undefined as Todo | undefined,
  todos: [] as Todo[],
  view: "all" as "all" | "active" | "completed",
});
