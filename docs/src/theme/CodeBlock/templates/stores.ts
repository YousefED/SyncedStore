export const TODO_STORE_CODE = `import { crdt, Y } from "@reactivedata/reactive-crdt";
import { WebrtcProvider } from "y-webrtc";

// Create a document that syncs automatically using Y-WebRTC
const doc = new Y.Doc();
const webrtcProvider = new WebrtcProvider("my-document-ida", doc);

// (optional, define types for TypeScript)
type todo = { completed: boolean, text: string };

type StoreType = {
  todos: Todo[];
};

// Create your reactive-crdt store
export const store = crdt<StoreType>(doc);

// initialize vehicles as an empty array:
store.todos = [];

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
`;
