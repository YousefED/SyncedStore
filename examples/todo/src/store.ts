import { crdt, Y } from "@reactivedata/reactive-crdt";
import { WebrtcProvider } from "y-webrtc";

export type Todo = {
  title: string;
  completed: boolean;
};

// Setup Yjs
const doc = new Y.Doc();
new WebrtcProvider("id", doc); // sync via webrtc

// Define our store
type StoreType = {
  todos: Todo[];
  view: "all" | "active" | "completed";
};

export const globalStore = crdt<StoreType>(doc) as StoreType;

// initialize store
globalStore.todos = [];
globalStore.view = "all";
