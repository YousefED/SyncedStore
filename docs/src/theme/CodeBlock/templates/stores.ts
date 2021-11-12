export const TODO_STORE_CODE = `import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

// (optional, define types for TypeScript)
type Todo = { completed: boolean, title: string };

// Create your SyncedStore store
export const store = syncedStore({ todos: [] as Todo[], fragment: "xml" });

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsValue(store);
export const webrtcProvider = new WebrtcProvider("syncedstore-todos", doc as any);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
`;

export const TODO_STORE_CODE_BOXED = `import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

// (optional, define types for TypeScript)
type Todo = { completed: boolean, title: string };

// Create your SyncedStore store
export const store = syncedStore({ todos: [] as Todo[], fragment: "xml" });

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsValue(store);
export const webrtcProvider = new WebrtcProvider("syncedstore-todos-boxed", doc as any);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
`;

export const TODO_STORE_CODE_PLAIN = `import { syncedStore, getYjsValue } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

// Create your SyncedStore store
// We create a store which contains an array (myArray) and an object (myObject)
export const store = syncedStore({ myArray: [], myObject: {} });

// Create a document that syncs automatically using Y-WebRTC
const doc = getYjsValue(store);
export const webrtcProvider = new WebrtcProvider("syncedstore-plain", doc as any);

export const disconnect = () => webrtcProvider.disconnect();
export const connect = () => webrtcProvider.connect();
`;
