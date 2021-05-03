import { reactive } from "@reactivedata/reactive";
import { crdt, Y } from "@reactivedata/reactive-crdt";
import { WebrtcProvider } from "y-webrtc";

export type Todo = {
  title: string;
  completed: boolean;
};

// export const globalStore = reactive({
//   editingTodo: undefined as Todo | undefined,
//   todos: [] as Todo[],
//   view: "all" as "all" | "active" | "completed",
// });

const doc = new Y.Doc();
const webrtcProvider = new WebrtcProvider("id", doc);

type StoreType = {
  todos: Todo[];
  view: "all" | "active" | "completed";
};

export const globalStore = crdt<StoreType>(doc) as StoreType;

globalStore.todos = [];
globalStore.view = "all";
