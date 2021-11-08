import { crdt, Y } from "@reactivedata/reactive-crdt";
import { WebrtcProvider } from "y-webrtc";

export type Todo = {
  title: string;
  completed: boolean;
};

// Setup Yjs
const doc = new Y.Doc();
new WebrtcProvider("id", doc); // sync via webrtc

export const globalStore = crdt(doc, { todos: [] as Todo[] });
